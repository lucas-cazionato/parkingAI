from Simulation import Simulation
from repository import *

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

simulation.start()

