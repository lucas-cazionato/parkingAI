# Script Python para treinamento de modelo DecisionTreeRegressor a partir dos dados simulados
# Para executar o script, basta rodar o comando 'python3 treinamento_reg_dec-tree.py' ou conforme preferencia

import pandas as pd # Importacao da biblioteca pandas para manipulação de dados
from sklearn.model_selection import train_test_split # Importacao da biblioteca de divisao do conjunto de dados em treinamento e teste
from sklearn.tree import DecisionTreeRegressor
# Importacao do DecisionTreeRegressor, um modelo de arvore de decisao para tarefas de regressão
# Link 1 (Definicao): https://scikit-learn.org/stable/modules/tree.html
# Link 2 (Implementacao): https://scikit-learn.org/stable/modules/generated/sklearn.tree.DecisionTreeRegressor.html
from sklearn.metrics import mean_squared_error, r2_score
# Importacao de biblioteca de metricas para avaliacao do modelo
import joblib # Importacao de biblioteca para armazenamento do modelo
import time # Importacao de biblioteca para medicao de tempo

# Carregamento do arquivo de dados simulados em um DataFrame
df = pd.read_csv('./dados/parking_data.csv')

# Selecao das colunas do DataFrame que servirao como atributos ou caracteristicas (x)
# Coluna 'id' nao eh incluida por nao representar parametro
x = df[['osm_id', 'day_of_week', 'period_of_month', 'month', 'is_holiday', 'time_hour', 'impact_period_of_day', 'way_area', 'capacity']]

# Selecao da coluna de supervisao do DataFrame ou variavel alvo (y)
y = df['occupancy_rate']

# Divisao dos dados em treinamento e teste
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)
# Tamanho do Conjunto de Teste = 20%, Tamanho do Conjunto de Treinamento = 80%
# random_state eh para fixar a semente do gerador de numeros aleatorios para que o resultado do codigo seja sempre o mesmo, ou seja,
# em toda execucao do script, os dados de teste e treinamento serão os mesmos e os resultados serão reproduziveis

# Inicializacao do modelo DecisionTreeRegressor
model = DecisionTreeRegressor(random_state=42)

# Medir o tempo de treinamento
start_time = time.time()

# Treinamento do modelo com os dados de treinamento: x_train, y_train
model.fit(x_train, y_train)

# Calcular o tempo de treinamento
training_time = time.time() - start_time

# Teste do modelo
y_pred = model.predict(x_test)
# y_pred representa a previsao do modelo para os dados de teste - x_test

# Calculo das metricas de avaliacao do modelo
# mean_squared_error: erro quadrado medio das previsoes (quanto menor, melhor o desempenho do modelo)
# Link: https://scikit-learn.org/stable/modules/generated/sklearn.metrics.mean_squared_error.html
mse = mean_squared_error(y_test, y_pred)
# r2_score: coeficiente de determinacao R², que mede a qualidade do ajuste (quanto mais proximo de 1, melhor)
# Link: https://scikit-learn.org/stable/modules/generated/sklearn.metrics.r2_score.html
r2 = r2_score(y_test, y_pred)

# Impressao das metricas de avaliacao
print(f"Erro Quadrático Médio (MSE): {mse}")
print(f"Coeficiente de Determinação (R²): {r2}")

# Salvar o modelo em um arquivo .joblib
joblib.dump(model, 'modelo_treinado.joblib')