from Simulation import Simulation
from repository import *
from tqdm import tqdm  # Importa a biblioteca tqdm

# Start Simulation
simulation = Simulation("2023-01-01 00:00:00")

# Reseting timeline 
timelineRepo = ParkingTimelineRepoResolver().get()
print(f"Deleting previous data from parking_timeline")
timelineRepo.delete_all()

# Find parking spots
osmRepo = OsmParkingRepoResolver().get()
parking_spots = osmRepo.find_all_stret_parking()

# setup
simulation.parking_list = parking_spots

# Configuring the Simulation - Customization Example
# simulation.set_list_of_bad_outliers([1001, 1002])   # IDs for bad outliers
# simulation.set_list_of_good_outliers([2001, 2002])  # IDs for good outliers
# simulation.set_steps_in_seconds(7200)  # Advance simulation by 2 hours each step

simulation.start()