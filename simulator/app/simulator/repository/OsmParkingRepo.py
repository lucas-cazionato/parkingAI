from database import *

class OsmParkingRepo:
  def __init__(self, db_connection) -> None:
    self.connection: PostgresConnection = db_connection
    
  def find_all_stret_parking(self):
    query = """
      SELECT 
        p.osm_id,
        p.amenity,
        p.way_area,
        p.tags->'parking' as parking_type,
        p.tags->'capacity' as capacity,
        p.tags->'orientation' as orientation
      FROM planet_osm_polygon p
      WHERE p.amenity = 'parking'
      AND p.tags->'parking' = 'street_side'; 
    """
    return self.__execute(query)
    
  def __execute(self, query: str, params: dict|list = None) -> list|int|None :
      return self.connection.execute_query(query, params)

