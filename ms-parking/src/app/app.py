from flask import Flask, request, jsonify # Importacao das bibliotecas para criacao de aplicacao web em Python
from ia import * # Importacao da classe de previsao de vagas de estacionamento, com base no modelo treinado de IA
from repository import * # Importacao das classes para conexao com o banco de dados
from utils import * # Importacao de classe para processamento de data/hora
from datetime import datetime # Importacao de modulo para manipulação de datas e horas
from collections import OrderedDict # Biblioteca para ordenar os atributos do JSON de retorno
import json # Importacao de biblioteca JSON

# Estabelecendo conexao com o Banco de Dados
repo = RepoResolver().get()

# Criacao de uma instância da aplicação Flask
# '__name__' é utilizado para indicar o nome do módulo atual
app = Flask(__name__)

# Definicao de uma rota na aplicação Flask, associando o endpoint '/parking' ao método Http POST
# Quando for feita uma requisicao POST para '/parking', a função 'parking()' será executada
@app.route('/parking', methods=['POST'])
def parking():
    # Obter o JSON enviado na requisicao
    data = request.get_json()
    
    # Validacao dos dados recebidos
    # Exemplo de requisicao valida
    """
    {
        "location": {
            "lng": -49.25998674411819,
            "lat": -25.423427468369646
        }
    }
    """
    if not data or 'location' not in data:
        return jsonify({"error": "Entrada invalida. Por gentileza, fornecer um 'location(lng, lat)'"}), 400

    # Obtendo a longitude e a latitude da requisição recebida
    lng = data['location']['lng']
    lat = data['location']['lat']

    # Acionando a funcao Repo.find_parking() para retornar os 5 poligonos mais proximos do destino que contenham vagas mapeadas
    vagas = repo.find_parking(lng, lat)
    
    # Criando uma instancia da classe ProcessarData para processar a data
    processar_data = ProcessarData()

    # Definindo o current_time como o horário atual
    current_time = datetime.now()

    # Declaracao do array com as informacoes dos poligonos/vagas a serem processados pelo modelo de IA
    # A partir do processamento, serao retornadas as probabilidades de ocupacao dos poligonos/vagas
    vagas_info = []
    # Declaracao do array de retorno da API, com as informacoes relevantes
    result = []

    # Iterando sobre as vagas retornadas
    for vaga in vagas:
        # Extraindo as informações do banco de dados
        # Atributos gerais (Necessarios para Previsao da IA e Retorno da API)
        osm_id = vaga[0]
        way_area = vaga[1]
        capacity = vaga[4]

        # Atributos necessarios apenas para o Retorno da API
        tags = vaga[2]
        way = vaga[3]
        distancy = vaga[5]

        # Verifica se o atributo tags é uma string e tenta convertê-la para dicionário
        if isinstance(tags, str):
            try:
                # Ajusta a string para uma forma válida de JSON
                tags_dict = {}
                # Remove as aspas extras e substitui o '=>' por ':'
                tags = tags.replace('"', '')  # Remove as aspas extras
                tags_pairs = tags.split(",")  # Divide por vírgula
            
                for pair in tags_pairs:
                    # Divide cada par chave-valor
                    key, value = pair.split("=>")
                    tags_dict[key.strip()] = value.strip()

                # Agora 'tags_dict' é um objeto JSON válido
                tags = tags_dict
            except Exception as e:
                # Se ocorrer um erro, apenas atribui um dicionário vazio (fallback)
                tags = {}    
            
        # Processando a data para obter os parametros necessarios ao modelo
        date_info = processar_data.processDate(current_time)

        # Montando o array com as informações a serem passadas para a IA
        vaga_info = {
            'osm_id': osm_id,
            'day_of_week': date_info['day_of_week'],
            'period_of_month': date_info['period_of_month'],
            'month': date_info['month'],
            'is_holiday': date_info['is_holiday'],
            'time_hour': date_info['time_hour'],
            'impact_period_of_day': date_info['impact_period_of_day'],
            'way_area': way_area,
            'capacity': capacity
        }

        # Montando o array de retorno da API
        result_info = {
            "osm_id": osm_id,
            "capacity": capacity,
            "distancy": distancy,
            "tags": tags,
            "way_area": way_area,
            "way": way
        }

        # Adicionando as informacoes de cada poligono/vaga ao array de vagas
        vagas_info.append(vaga_info)
        # Adicionando as informacoes de cada poligono/vaga ao array de retorno da API
        result.append(result_info)
        
    # Criacao de uma instância da classe Previsao, para retornar as probabilidades de ocupacao dos poligonos/vagas
    previsao = Previsao()

    # Passar os poligonos/vagas para o método previsao_taxa_ocupacao
    probabilidades = previsao.previsao_taxa_ocupacao(vagas_info)

    # Adicionando as probabilidades ao array de retorno da API
    for i, result_info in enumerate(result):
        result_info['probability_occupancy'] = probabilidades[i]

    # Declaracao do array de retorno da API, ordenado conforme preferencia
    final_results = []

    # Definindo a ordem dos atributos JSON de retorno da API
    for item in result:
        # Criando um OrderedDict para garantir a ordem dos atributos
        final_result = OrderedDict([
            ('osm_id', item['osm_id']),
            ('capacity', item['capacity']),
            ('distancy', item['distancy']),
            ('probability_occupancy', item['probability_occupancy']),
            ('tags', item['tags']),
            ('way_area', item['way_area']),
            ('way', item['way'])
        ])    
        # Adicionando o final_result ao array de resultados finais
        final_results.append(final_result)

    # Retorno com as probabilidades de ocupacao para os poligonos/vagas mais proximos
    return app.response_class(
        response=json.dumps(final_results),
        status=200,
        mimetype='application/json'
    )

# Verifica se o script está sendo executado diretamente
# Se for o caso, inicia o servidor Flask com o modo de depuração ativado
if __name__ == '__main__':
    app.run(debug=True)