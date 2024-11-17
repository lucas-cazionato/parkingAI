# parkingAI
DS960 - Trabalho de Conclusão de Curso II

Aplicativo de Estacionamento:
Aplicativo para dispositivos móveis acoplado a um serviço de Inteligência Artificial, que será treinado para identificar e sugerir regiões urbanas com maior probabilidade de possuir vagas livres de estacionamento em vias públicas, a partir de um endereço de destino informado pelo usuário.

# Padrões de Commits:
Seguir os padrões do repositório: https://github.com/iuricode/padroes-de-commits
* 1 Commit por Pull Request, para facilitar eventuais reverts que se façam necessários

# Padrões de nomeação:
* Classes/Componentes: PascalCase (Ex: UsuarioRepositorio)
* Métodos, Funções e Variáveis: camelCase (Ex: criarUsuario, usuarioAtualizado)
* Constantes: UPPER_SNAKE (Ex: API_URL, VALOR_MAXIMO)
* Tabelas e Colunas de Bancos de Dados: snake_case (Não é necessário colocar "t_" para indicar que é uma tabela) - (Ex: usuarios, enderecos_entrega)

# Idioma:
Português, exceto para termos específicos como Get, Set, Service, Model, Dto, Controller (Termos relacionados à programação e nomenclatura técnica, reconhecidamente com origem na língua inglesa)

# Roadmap (O que cada um deve fazer até quando):
https://docs.google.com/spreadsheets/d/1Z51pzLjw92eJ6kyFrIGz5zpwXeowaTRM/edit?gid=178778627#gid=178778627

# Configuração:
1. Instalar dependencias

   ```bash
   npm install
   ```
2. Adicionar chave da google em config.ts

3. Iniciar o APP

   ```bash
    npm start
   ```
4. Caso faça update, ajustar alguns pacotes para versões mais antigas:
    ```bash
    npm install react-native-google-places-autocomplete@2.5.6 --save
    ```