from config import *

# Classe de Repositorio para interacao com o banco de dados
class Repo:
  # Inicializa a classe Repo, atribuindo uma conexao com o Postgres a variavel de instancia
  def __init__(self, db_connection) -> None:
    self.connection: PostgresConnection = db_connection
  
  # Metodo que recebe como parametros Longitude e Latitude de um ponto espacial
  # Faz uma consulta a Tabela de Poligonos do BD, retornando os dados mais relevantes dos poligonos
  # Calcula a distancia entre o ponto e os poligonos usando as funcoes abaixo:
  # ST_Point(%s, %s): Cria um ponto geométrico no espaço a partir de dois valores: longitude e latitude
  # ST_SetSRID(Ponto, 4326): Define o SRID (Spatial Reference System Identifier) para o ponto criado
  # SRID 4326 refere-se ao sistema de coordenadas WGS 84 (latitude/longitude em graus decimais)
  # ST_Transform(PontoSRID, 3857): Transforma o ponto de um sistema de coordenadas (neste caso, 4326) para outro (3857)
  # ST_Distance(Objeto1, Objeto2): Calcula a distância mais curta entre dois objetos geométricos (ou geográficos) no mesmo SRID
  # A consulta é ordenada com base na distancia, e apenas os 5 poligonos mais proximos (que contem vagas mapeadas) sao retornados
  def find_parking(self, lng: float, lat: float):
    query = """
    SELECT 
      p.osm_id,
      p.way_area,
      p.tags,
      p.way,
      p.tags->'capacity' as capacity,
      ST_Distance(
          p.way, 
          ST_Transform(ST_SetSRID(ST_Point(%s, %s), 4326), 3857)
      ) AS distancy,
      ST_AsGeoJSON(ST_Transform(p.way, 4326)) as way_geojson
    FROM planet_osm_polygon p
    WHERE tags->'capacity' IS NOT NULL
    ORDER BY distancy ASC
    LIMIT 5;
    """
    params = (lng, lat)
    result = self.__execute(query, params)
    return result if result else []

  # Metodo para execucao/processamento das consultas ao BD
  def __execute(self, query: str, params: dict|list = None) -> list|int|None :
    return self.connection.execute_query(query, params)