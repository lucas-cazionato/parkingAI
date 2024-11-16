# Serviço de Estacionamento (MS-PARKING)
Tecnologias empregadas: Flask + Postgres + Scikit-learn

# API REST:
Trata-se de uma aplicação web Flask com API REST:
- Informando um ponto de destino (longitude, latitude), é retornado uma lista de polígonos/vagas de estacionamento com suas informações;
- Entre as informações, encontra-se a probabilidade de ocupação, que é calculada a partir de um modelo de IA treinado.

# Passos para execução:

## Passo 1:
* Instalação do Banco de Dados, SGBD Postgres, Extensão Postgis e importação dos dados:
- Seguir as orientações do projeto https://github.com/Oluccaro/cwb_parking_data
- Necessário executar os comandos referentes apenas ao diretório `cwb_parking_data/data`

## Passo 2:
* Ativar o ambiente virtual Python do projeto:
- Navegar até o diretório `ms-parking/.venv`
- Executar o comando abaixo
```bash
source bin/activate
```

## Passo 3:
* Executar a aplicação web flask:
- Navegar até o diretório `ms-parking/src/app`
- Executar o comando abaixo
```bash
flask --app app run
```

## Passo 4:
* Enviar uma requisição Http [POST], com um JSON no body, apresentando, no mínimo, o atributo exemplificado abaixo:
```bash
{
    "location": {
        "lng": -49.25998674411819,
        "lat": -25.423427468369646
    }
}
```