# Serviço de Autenticação + Usuário
Tecnologias empregadas: Spring Boot + Mongo DB

# API REST:
Trata-se de uma aplicação Spring Boot com métodos acessíveis através de uma API REST para CRUD de Usuário e Autenticação

# Passos para execução:

## Passo 0: Docker 🐳

Para rodar o backend no docker basta executar o seguinte comando (ou rodar o docker na sua GUI)
```bash
docker compose up
```

Se tudo deu certo ao usar o comando `docker ps` você verá os contêiners da aplicação todos executando.

Caso seja a primeira imagem que você está rodando você precisará rodar a importação dos dados dos mapas.

Vá para o diretório `ms-parking/map-data/` e execute o script em bash
```bash
./run_import.sh best_map.osm
```

Por convenção vamos deixar o arquivo mais atual sempre no `best_map.osm`.


## Passo 1:
* Instalação Mongo DB (Link: https://www.mongodb.com/pt-br).
* Após instalação, iniciar o Mongo no sistema operacional
* Exemplo no Ubuntu:
```bash
sudo systemctl start mongod
```

## Passo 2:
Dentro da pasta raiz da aplicação (`ms-usuario`), navegar até a pasta `ms-usuario/src/main/resources` e alterar o arquivo `application.properties`, conforme configurações da sua instalação do Mongo DB (Ex: alterar Porta ou Host).

Além disso, é necessário criar um arquivo denominado `.env` no diretorio raiz `ms-usuario/` do projeto.
Nele, devem ser inseridas as configurações do MongoDB e de E-mail, conforme formato do arquivo `.env.example`.

## Passo 3:
* Executar aplicação Spring Boot `ms-usuario` utilizando as opções disponíveis na IDE de sua preferência.
* Ex (VSCode): Acessar Spring Boot Dashboard, localizar a aplicação desejada e clicar no botão com a seta para a direita - comando `RUN`

## Passo 4:
* Acionar os métodos disponíveis na API REST, através de requisições HTTP, conforme vídeo no link abaixo:
* https://www.youtube.com/watch?v=zRw9Q6a9ANc

