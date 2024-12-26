from database import *

class ParkingTimelineRepo:
    def __init__(self, db_connection):
      self.connection: PostgresConnection = db_connection
    
    # Create a new parking record
    def create(self, osm_id, parking_type, way_area, capacity, occupied, update_time, is_holiday = 0):
      query = """
      INSERT INTO parking_timeline (osm_id, parking_type, way_area, capacity, occupied, update_time, is_holiday)
      VALUES (%(osm_id)s, %(parking_type)s, %(way_area)s, %(capacity)s, %(occupied)s, %(update_time)s, %(is_holiday)s);
      """
      params = {
        'osm_id': osm_id, 
        'parking_type': parking_type,
        'way_area': way_area,
        'capacity': capacity,
        'occupied': occupied,
        'update_time': update_time,
        'is_holiday': is_holiday
      }
      self.__execute(query, params)

    # Read parking records
    def find_by_osm_id(self, osm_id: int) -> list|int|None:
      query = "SELECT * FROM parking_timeline WHERE osm_id = %(osm_id)s;"
      params = {'osm_id': osm_id}
      return self.__execute(query, params)
          
    def find_by_id(self, id: int) -> list|int|None:
      query = "SELECT * FROM parking_timeline WHERE id = %(id)s;"
      params = {'id': id}
      return self.__execute(query, params)
    
    # Update a parking record
    def update(self, id, parking_type, capacity, occupied, update_time):
      query = """
      UPDATE parking_timeline
      SET parking_type = %(parking_type)s, 
          capacity = %(capacity)s, 
          occupied = %(occupied)s, 
          update_time = %(update_time)s
      WHERE id = %(id)s;
      """
      params = {
        'id': id, 
        'parking_type': parking_type,
        'capacity': capacity,
        'occupied': occupied,
        'update_time': update_time
      }
      self.__execute(query, params)

    # Delete a parking record
    def delete(self, id):
      query = "DELETE FROM parking_timeline WHERE id = %(id)s;"
      params = {'id': id}
      return self.__execute(query,params)
    
    # Delete all parking_timeline
    def delete_all(self):
      query = "DELETE FROM parking_timeline;"
      return self.__execute(query)

    # Special method to update 'occupied' field and 'update_time'
    def update_status(self, id, occupied, update_time):
      query = """
      UPDATE parking_timeline
      SET occupied = %(occupied)s, 
          update_time = %(update_time)s
      WHERE id = %(id)s;
      """
      params = {
        'id': id, 
        'occupied': occupied,
        'update_time': update_time
      }
      self.__execute(query, params)

    def __execute(self, query: str, params: dict|list = None) -> list|int|None :
      return self.connection.execute_query(query, params)
