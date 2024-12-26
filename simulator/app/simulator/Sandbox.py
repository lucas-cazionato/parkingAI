#This is a place to put tests ans example of usage of code

from utils import *
from database import *
import datetime as dt
from repository import * 

clock = Clock(initial_time="2012-10-01 12:00:00")  # Set initial time to October 1st, 2024 at noon

for current_time in clock.simulate(step_seconds=3600):  # Simulate 5 hours
    print(f"Simulated time: {current_time}")
    print(f"Day of the week: {clock.get_day_of_week()}")
    print(f"Hour of the day: {clock.get_hour()}")
    

traffic = Traffic()

central_traffic = traffic.get_normalized_curitiba_cetral_traffic()
periferical_traffic = traffic.get_normalized_curitiba_periferical_traffic()

for row in central_traffic:
  print(row)
  
for row in periferical_traffic:
  print(row)
  

    
# Example usage:

# Example for boolean probability
print(f"Probability True: {Probability.probability_true(50) * 100:.2f}%")
print(f"Probability False: {Probability.probability_false(10) * 100:.2f}%")

# Example for normal distribution
mean = 100
std_dev = 20
x_value = 100

prob = Probability(mean, std_dev)

print(f"Normal distribution value at {x_value}: {prob.normal_distribution(x_value):.4f}")
print(f"Percentage below {x_value}: {prob.percentage_below_value(x_value)*100:.2f}%")
print(f"Percentage above {x_value}: {prob.percentage_above_value(x_value)*100:.2f}%")
print(f"Percentage between (with 5% window) {x_value}: {prob.percentage_around_value(x_value, 5)*100:.2f}%")


# Example usage Holidays
holidays = Holidays()
print(holidays.list_feriados)

feriado = dt.datetime.strptime("2024-11-15", "%Y-%m-%d")
nao_feriado = dt.datetime.strptime("2024-10-15", "%Y-%m-%d")
print(holidays.is_holiday(feriado))
print(holidays.is_holiday(nao_feriado))

##Example of use

db = ConnectionResolver().get()
query = """
SELECT p.*
FROM planet_osm_polygon p
JOIN planet_osm_roads r
  ON r.name = 'Rua Conselheiro Laurindo' -- Replace 'StreetName' with the actual name of the street
WHERE ST_DWithin(r.way, p.way, 120)      -- 10 meters buffer zone around the road
and p.amenity = 'parking'                -- only parking polygons
and p.tags->'parking' = 'street_side'    -- only on street parking
"""
result = db.execute_query(query)
print(result)

timelineRepo = ParkingTimelineRepo(db)

timelineRepo.create(1, 'street_side', 10, 5, 75, "2012-10-01 12:00:00")
print(timelineRepo.find_by_id(1))
timelineRepo.update(1, 'street_ally', 20, 0, "2012-10-02 13:00:00")
print(timelineRepo.find_by_id(1))
timelineRepo.update_status(1, 5, "2012-10-03 13:00:00")
print(timelineRepo.find_by_id(1))
timelineRepo.delete(1)
print(timelineRepo.find_by_id(1))

## Example of use OsmParkingRepo

osmRepo = OsmParkingRepo(db)
parking_spaces = osmRepo.find_all_stret_parking()
print(parking_spaces)

print(parking_spaces[0]['orientation'])



