# Serviço de Avaliação e Favoritos
Tecnologias empregadas: Spring Boot + MySQL

# API REST:
Trata-se de uma aplicação Spring Boot com métodos acessíveis através de uma API REST:
- Registro, Busca e Atualização de Avaliações do Aplicativo.
- Salvar, Consultar, Atualizar e Excluir Endereços Favoritos do Usuário do aplicativo.

# Passos para execução:

## Passo 1:
* Instalação MySQL (https://www.mysql.com/).
* Após instalação, acessar o MySQL como privilégios de administrador.
* Exemplo no Ubuntu:
```bash
sudo mysql
```

## Passo 2:
* Criar um arquivo denominado `.env` no diretorio raiz `ms-mensagens/` do projeto.
Nele, devem ser inseridas as configurações do Banco de Dados, conforme formato do arquivo `.env.example`

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