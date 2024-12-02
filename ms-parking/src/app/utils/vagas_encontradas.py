# Script para consultar os poligonos/vagas retornados pela aplicação com suas probabilidades (%) de ocupação
from repository import * # Importacao das classes para conexao com o banco de dados
import folium # Importacao da biblioteca folium para criação de mapas interativos
import json # Importacao de biblioteca JSON
from shapely.geometry import shape

def plotar_poligonos_encontrados(polygon_info):
    """
    Exibe os polígonos/vagas retornados em um mapa interativo
    
    :param polygon_info: Lista de dicionários com o GeoJSON dos polígonos
    """
    centro_coords = [0, 0]
    if polygon_info:
        prim_polygon = shape(polygon_info[0]['way_geojson'])
        centro_coords = [prim_polygon.centroid.y, prim_polygon.centroid.x]
    map_ = folium.Map(location=centro_coords, zoom_start=16.8)

    for polygon in polygon_info:
        try:
            geojson = polygon['way_geojson']
            capacity = polygon['capacity']
            probability_occupancy = polygon['probability_occupancy']

            folium.GeoJson(
                geojson,
                style_function=lambda x: {
                    'fillColor': 'lime',
                    'color': 'green',
                    'weight': 2,
                    'fillOpacity': 0.5
                },
                tooltip=folium.Tooltip(f"Capacidade: {capacity} | Probabilidade Ocupação: {probability_occupancy*100:.2f}%")
            ).add_to(map_)
        except Exception as e:
            print(f"Erro ao processar o polígono: {e}")

    map_.save("./src/app/utils/mapa_parking_polygons.html")
    print("Mapa salvo em './mapa_parking_polygons.html'. Abra no navegador para visualizar.")
