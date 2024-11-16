# Modelo 3 (Desempenho) - LinearRegression, modelo de regressão linear
# Link 1 (Definicao): https://scikit-learn.org/stable/modules/linear_model.html
# Link 2 (Implementacao): https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html#sklearn.linear_model.LinearRegression
# Tempo de Treinamento: 0.20866012573242188 segundos
# Erro Quadrático Médio (MSE): 0.16943738552208107
# Coeficiente de Determinação (R²): 0.3147649844817839
import pandas as pd  # Importação da biblioteca pandas para manipulação de dados
from sklearn.model_selection import train_test_split  # Divisão do conjunto de dados em treinamento e teste
from sklearn.linear_model import LinearRegression  # Importação do modelo de regressão linear
from sklearn.metrics import mean_squared_error, r2_score  # Importação das métricas de avaliação
import joblib  # Para salvar o modelo treinado
import time  # Para medir o tempo de treinamento

# Carregamento dos dados
df = pd.read_csv('dados/parking_data.csv')

# Seleção das colunas que servirão como características (X)
X = df[['osm_id', 'day_of_week', 'period_of_month', 'month', 'is_holiday', 'time_hour', 'impact_period_of_day', 'way_area', 'capacity']]

# Seleção da coluna alvo (Y), que é a taxa de ocupação
y = df['occupancy_rate']

# Divisão dos dados em conjuntos de treino e teste
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Inicialização do modelo de regressão linear
model = LinearRegression()

# Medindo o tempo de treinamento
start_time = time.time()

# Treinamento do modelo com os dados de treinamento
model.fit(X_train, y_train)

# Calculando o tempo de treinamento
training_time = time.time() - start_time

# Realizando previsões no conjunto de teste
y_pred = model.predict(X_test)

# Calculando as métricas de avaliação
mse = mean_squared_error(y_test, y_pred)  # Erro quadrático médio
r2 = r2_score(y_test, y_pred)  # Coeficiente de determinação R²

# Impressão das métricas
print(f"Tempo de Treinamento: {training_time} segundos")
print(f"Erro Quadrático Médio (MSE): {mse}")
print(f"Coeficiente de Determinação (R²): {r2}")

# Salvando o modelo treinado
joblib.dump(model, 'modelo_treinado.joblib')