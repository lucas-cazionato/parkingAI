# Script para consultar os poligonos/vagas mapeados e plota-los em mapa
# Para rodar este script:
# Ative o ambiente virtual Python, se não estiver ativado
# Navegue até o diretório `ms-parking/src/app`
# Execute o comando python3 -m utils.vagas_mapeadas
from repository import * # Importacao das classes para conexao com o banco de dados
import folium # Importacao da biblioteca folium para criação de mapas interativos
import json # Importacao de biblioteca JSON
from shapely.geometry import shape

def plotar_poligonos(polygon_info):
    """
    Exibe os polígonos em um mapa interativo.
    
    :param polygon_info: Lista de dicionários com o GeoJSON dos polígonos
    """
    centro_coords = [0, 0]
    if polygon_info:
        prim_polygon = shape(json.loads(polygon_info[0]['way_geojson']))
        centro_coords = [prim_polygon.centroid.y, prim_polygon.centroid.x]
    map_ = folium.Map(location=centro_coords, zoom_start=16.8)

    for polygon in polygon_info:
        try:
            geojson = json.loads(polygon['way_geojson'])
            capacity = json.loads(polygon['capacity'])

            folium.GeoJson(
                geojson,
                style_function=lambda x: {
                    'fillColor': 'lime',
                    'color': 'green',
                    'weight': 2,
                    'fillOpacity': 0.5
                },
                tooltip=folium.Tooltip(f"Capacidade: {capacity}")
            ).add_to(map_)
        except Exception as e:
            print(f"Erro ao processar o polígono: {e}")

    map_.save("utils/mapa_polygons.html")
    print("Mapa salvo em 'utils/mapa_polygons.html'. Abra no navegador para visualizar.")

# Script principal
if __name__ == "__main__":
    # Estabelecendo conexao com o Banco de Dados
    repo = MappedRepoResolver().get()

    # Executa o método para buscar os polígonos
    polygons = repo.find_mapped_polygons()

    if polygons:
        print(f"Encontrados {len(polygons)} polígonos.")
        plotar_poligonos(polygons)
    else:
        print("Nenhum polígono encontrado.")