from datetime import datetime, timedelta

class Clock:
    def __init__(self, initial_time="2024-01-01 00:00:00", time_format="%Y-%m-%d %H:%M:%S"):
        """
        Initializes the clock with an initial formatted date and time.
        
        :param initial_time: A string representing the initial date and time.
        :param time_format: The format of the date and time string (default is "%Y-%m-%d %H:%M:%S").
        """
        self.time_format = time_format
        self.initial_time = initial_time
        self.time = datetime.strptime(initial_time, self.time_format)

    def simulate(self, step_seconds=1, final_time=None):
        """
        Simulates the passage of time and returns an iterable.
        
        :param step_seconds: The number of seconds to advance in each step (default is 1 second).
        :param final_time: the final datatime of the simulatin, where it is supposed to end (default is now).
        :return: A generator that yields the current time at each step.
        """
        self.final_time = final_time or Clock.now()
        self.step_seconds = step_seconds
        
        duration_steps = self.calculate_steps()
        step = timedelta(seconds=step_seconds)
        for _ in range(duration_steps):
            self.time += step
            yield self.time.strftime(self.time_format)
    
    def reset(self, new_time="2024-01-01 00:00:00"):
        """
        Resets the clock to a new time.
        
        :param new_time: A string representing the new date and time.
        """
        self.time = datetime.strptime(new_time, self.time_format)

    def get_time(self):
        """
        Returns the current time as a string in the specified format.
        """
        return self.time.strftime(self.time_format)
    
    def get_day_of_week(self):
        """
        Returns the current day of the week as a string.
        
        Example: 'Monday', 'Tuesday', etc.
        """
        return self.time.strftime("%A")
    
    def get_iso_weekday(self):
        """
        Return the day of the week as integer
        
        Example: 'Sunday' => 0, 'Monday' => 1, etc.
        """
        return self.time.isoweekday() % 7
        
    
    def get_hour(self):
        """
        Returns the current hour of the day (0-23).
        """
        return self.time.hour
    
    @staticmethod
    def now(time_format="%Y-%m-%d %H:%M:%S"):
        """
        Retrieves the current date and time.
        
        :param time_format: The format of the date and time string (default is "%Y-%m-%d %H:%M:%S").
        :return: A string representing the current date and time.
        """
        return datetime.now().strftime(time_format)
    
    def calculate_steps(self) -> int:
        """
        Calculates the number of steps between two times based on a given step interval.
        
        :param initial_time: The start time as a string.
        :param final_time: The end time as a string.
        :param step_seconds: Number of seconds for each step.
        :param time_format: Format of the date and time strings (default is "%Y-%m-%d %H:%M:%S").
        :return: Number of steps between the initial and final times.
        """
        start = datetime.strptime(self.initial_time, self.time_format)
        end = datetime.strptime(self.final_time, self.time_format)
        interval = end - start
        total_seconds = interval.total_seconds()
        
        # Calculate steps as integer division
        steps = total_seconds // self.step_seconds
        return int(steps)
