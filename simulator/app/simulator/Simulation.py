from utils import *
from repository import * 
from database import *
from tqdm import tqdm
import math
import time

class Simulation:
    def __init__(self, start_time: str, end_time: str = None) -> None:
        """
        Initializes the Simulation with a start and end time. Sets up related components,
        including the clock, holiday checker, traffic model, and database connection.

        :param start_time: The start time for the simulation as a string.
        :param end_time: The end time for the simulation as a string (defaults to current time).
        """
        self.start_time = start_time
        self.end_time = end_time or Clock.now()
        self.clock = Clock(start_time)
        self.holidays = Holidays()
        self.traffic = Traffic()
        self.bad_outliers = None
        self.good_outliers = None
        self.step_in_seconds = 3600

        # Connection to the database repository for parking timeline data.
        self.timeline_repo = ParkingTimelineRepoResolver().get()

    def set_list_of_bad_outliers(self, bad_outliers: list) -> None:
        """
        Sets a list of parking IDs to treat as 'bad outliers' with adjusted occupancy probabilities.
        
        :param bad_outliers: List of parking IDs that are considered bad outliers.
        """
        self.bad_outliers = bad_outliers
    
    def set_list_of_good_outliers(self, good_outliers: list) -> None:
        """
        Sets a list of parking IDs to treat as 'good outliers' with adjusted occupancy probabilities.
        
        :param good_outliers: List of parking IDs that are considered good outliers.
        """
        self.good_outliers = good_outliers
    
    def set_parking_list(self, parking_list: list) -> None:
        """
        Sets the list of parking spaces to simulate in this run.
        
        :param parking_list: List of dictionaries, each representing a parking space with necessary attributes.
        """
        self.parking_list = parking_list
    
    def set_steps_in_seconds(self, step_in_seconds: int) -> None:
        """
        Sets the time interval between simulation steps in seconds.
        
        :param step_in_seconds: Number of seconds for each simulation step.
        """
        self.step_in_seconds = step_in_seconds
    
    def start(self) -> None:
        """
        Runs the simulation over the specified time range. For each simulation step, updates
        the occupancy of each parking space based on probability and inserts data into the database.
        """
        print("Starting the simulation...")
        print(f"Start time: {self.start_time}")
        print(f"End time: {self.end_time}")
        print(f"Number of parking spots in simulation: {len(self.parking_list)}")
        start_exe_time = time.time()
        print(f"Running...")

        # Iterate through each time step in the simulation
        total_steps = len(list(self.clock.simulate(self.step_in_seconds, self.end_time)))  # Conta o total de passos

        for current in tqdm(self.clock.simulate(self.step_in_seconds, self.end_time), total=total_steps, desc="Simulação em andamento"):
            for parking_space in self.parking_list:
                # Check if the current day is a holiday
                is_holiday = int(self.holidays.is_holiday(self.clock.time))
                # Calculate occupancy probability
                percentage = self.calculate_probability_of_occupied(is_holiday)
                # Adjust for any outliers
                percentage = self.resolve_outliers(parking_space['osm_id'], percentage)
                # Calculate occupied spaces based on the percentage
                occupied = math.ceil(percentage * int(parking_space['capacity']) / 100)
                
                # Insert the occupancy data into the database
                self.timeline_repo.create(
                    parking_space['osm_id'],
                    parking_space['parking_type'],
                    parking_space['way_area'],
                    parking_space['capacity'],
                    occupied,
                    current,
                    is_holiday
                )

        print("Simulation finished.")
        print(f"Total execution time: {(time.time() - start_exe_time)} seconds")
    
    def calculate_probability_of_occupied(self, is_holiday: int) -> int:
        """
        Calculates the probability that a parking space is occupied based on day type (holiday/weekday)
        and current traffic levels.

        :param is_holiday: Integer indicator if the day is a holiday (1 for holiday, 0 otherwise).
        :return: The percentage chance that a parking space is occupied.
        """
        weekday = 0 if bool(is_holiday) else self.clock.get_iso_weekday()  # Holiday considered Sunday
        hour = self.clock.get_hour()
        traffic_at_time = self.traffic.normalized_curitiba_central_traffic[hour][weekday]

        # Increase traffic if weekday work hours (9 AM to 5 PM)
        if not bool(is_holiday) and 8 < hour < 17:
            traffic_at_time += 0.3

        return self.adjusted_percentage(traffic_at_time)

    def resolve_outliers(self, id: int, percentage: int) -> int:
        """
        Adjusts the occupancy percentage based on the parking space ID if it is considered an outlier.

        :param id: The ID of the parking space.
        :param percentage: The original occupancy percentage.
        :return: Adjusted occupancy percentage.
        """
        if self.bad_outliers is not None and id in self.bad_outliers and percentage > 50:
            return percentage - 30
        if self.good_outliers is not None and id in self.good_outliers and percentage < 50:
            return percentage + 40
        return percentage

    def adjusted_percentage(self, normalized_traffic: float) -> int:
        """
        Calibrates the traffic-based occupancy percentage based on specific thresholds, adding variability.
        
        :param normalized_traffic: Normalized traffic level (0 to 1).
        :return: Adjusted occupancy percentage.
        """
        if normalized_traffic >= 0.9:
            return 100
        if normalized_traffic >= 0.85:
            return Probability.random_between(90, 100)
        if normalized_traffic >= 0.8:
            return Probability.random_between(85, 100)
        if normalized_traffic >= 0.7:
            return Probability.random_between(80, 100)
        if normalized_traffic >= 0.6:
            return Probability.random_between(60, 80)
        if normalized_traffic >= 0.5:
            return Probability.random_between(55, 70)
        if normalized_traffic > 0.25:
            center = int(normalized_traffic * 100)
            deviation = Probability.random_between(0, 25)
            return Probability.random_between(center - deviation, center)
        return Probability.random_between(0, 20)
