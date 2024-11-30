from config import *

# Classe de Repositorio para consultar os poligonos/vagas mapeados no BD
class MappedRepo:
  # Inicializa a classe MappedRepo, atribuindo uma conexao com o Postgres a variavel de instancia
  def __init__(self, db_connection) -> None:
    self.connection: PostgresConnection = db_connection
  
  def find_mapped_polygons(self):
    query = """
    SELECT 
      p.osm_id,
      p.amenity,
      p.tags->'parking' as parking_type,
      p.tags->'orientation' as orientation,
		  p.tags->'capacity' as capacity,
		  p.way_area,
      p.way,
      ST_AsGeoJSON(ST_Transform(p.way, 4326)) as way_geojson
    FROM planet_osm_polygon p
    WHERE p.amenity='parking' AND p.tags->'parking'='street_side';
    """
    result = self.__execute(query)
    return result if result else []

  # Metodo para execucao/processamento das consultas ao BD
  def __execute(self, query: str, params: dict|list = None) -> list|int|None :
    return self.connection.execute_query(query, params)