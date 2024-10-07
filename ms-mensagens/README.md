# Serviço de Avaliação
Tecnologias empregadas: Spring Boot + MySQL

# API REST:
Trata-se de uma aplicação Spring Boot com métodos acessíveis através de uma API REST para Registro, Busca e Atualização de Avaliações do Aplicativo

# Passos para execução:

## Passo 1:
* Instalação MySQL (https://www.mysql.com/).
* Após instalação, acessar o MySQL como privilégios de administrador.
* Exemplo no Ubuntu:
```bash
sudo mysql
```

## Passo 2:
* Atualizar USUÁRIO, SENHA e BANCO DE DADOS, parâmetros presentes no arquivo `ms-mensagens/src/main/resources/application.properties`.

* Exemplo para criação de USUÁRIO e BANCO DE DADOS no MySQL (Ubuntu):
```bash
-- Criar usuário
CREATE USER 'novo_usuario'@'localhost' IDENTIFIED BY 'senha_nova';

-- Conceder permissões
GRANT ALL PRIVILEGES ON *.* TO 'novo_usuario'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

```bash
-- Criar Banco de Dados
CREATE DATABASE bd_novobanco;
```

## Passo 3:
* Executar aplicação Spring Boot `ms-mensagens` utilizando as opções disponíveis na IDE de sua preferência.
* Ex (VSCode): Acessar Spring Boot Dashboard, localizar a aplicação desejada e clicar no botão com a seta para a direita - comando `RUN`

## Passo 4:
* Acionar os métodos disponíveis na API REST, através de requisições HTTP, conforme vídeo no link abaixo:
* https://www.youtube.com/watch?v=hatqSZBso5U