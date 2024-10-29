# API Gateway
Tecnologias empregadas: Node.js

Trata-se de um ponto de entrada unificado para os microsserviços da aplicação. 
Entre suas principais funções, temos:
* Roteamento de requisições: o API Gateway recebe as requisições em única porta e encaminha para as portas e endpoints adequados dos microsserviços, de acordo com a URL e parâmetros dos serviços.
* Autenticação: o API Gateway consulta o microsserviço de Autenticação para verificação de usuário/senha.
Se as credenciais forem válidas, há a geração de um Token JWT que será necessário para acessar os serviços que exigem autenticação.

# Passos para execução:

## Passo 1:
* Navegar até à pasta `parkingai/api-gateway`
* Digitar o comando:
```bash
npm install
```
## Passo 2:
* Atualizar/Criar o arquivo `.env` de acordo com o formato do arquivo `.env.example`

## Passo 3:
* Digitar o comando:
```bash
node server.js
```
