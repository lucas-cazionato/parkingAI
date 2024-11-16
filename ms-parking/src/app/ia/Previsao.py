import numpy as np # Importação da biblioteca NumPy para manipulação de arrays e operações numéricas
import pandas as pd # Importacao da biblioteca pandas para manipulação de dados
import joblib # Importacao da biblioteca joblib para carregamento do modelo de aprendizado de maquina
import os # Importação da biblioteca os para interações com o sistema operacional, como manipulação de arquivos e diretórios

class Previsao:
    def __init__(self):
        """
        Inicializa a classe Previsao carregando o modelo treinado da pasta atual
        """
        # Caminho fixo para o modelo treinado na mesma pasta
        modelo_path = os.path.join(os.path.dirname(__file__), 'modelo_treinado.joblib')
        
        # Carregar o modelo treinado
        self.model = joblib.load(modelo_path)

    def previsao_taxa_ocupacao(self, vagas):
        """
        Prever a taxa de ocupação para poligonos que contem vagas de estacionamento

        :param vagas: Lista de dicionarios de vagas (aa verdade, dos poligonos que contem essas vagas)
        :return: Lista com as probabilidades de ocupação para cada poligono (conjunto de vagas)
        """
        # Convertendo a lista de vagas para um DataFrame
        df_vagas = pd.DataFrame(vagas)
        
        # Verificar se as colunas estão corretas
        expected_columns = ['osm_id', 'day_of_week', 'period_of_month', 'month', 'is_holiday', 'time_hour', 'impact_period_of_day', 'way_area', 'capacity']
        if not all(col in df_vagas.columns for col in expected_columns):
            raise ValueError(f"As colunas devem ser: {expected_columns}")
        
        # Obter as probabilidades das previsões
        probabilidades = self.model.predict(df_vagas)

        return probabilidades