# parkingAI
DS960 - Trabalho de Conclusão de Curso II

Aplicativo de Estacionamento:
Aplicativo para dispositivos móveis acoplado a um serviço de Inteligência Artificial, que será treinado para identificar e sugerir regiões urbanas com maior probabilidade de possuir vagas livres de estacionamento em vias públicas, a partir de um endereço de destino informado pelo usuário.


# Como rodar a aplicação em Docker 🐳
(Utilize sistema operacional Linux, pois os scripts de inicialização não são compatíveis com windows.)
- Importar o repositório do github
- Para rodar o backend:
  - No diretório principal /parkingAI executar o seguinte comando (ou rodar o docker na sua GUI):
```bash
docker compose up
```

Se tudo deu certo, ao usar o comando `docker ps` você verá os contêiners da aplicação todos executando.

Caso seja a primeira imagem que você está rodando você precisará rodar a importação dos dados dos mapas.

Vá para o diretório `ms-parking/map-data/` e execute o script em bash
```bash
./run_import.sh best_map.osm
```

Por convenção vamos deixar o arquivo mais atual sempre no `best_map.osm`.

Para os desenvolvedores:
- Utilizar a collection do postman que foi disponibilizada para testes.
- Para testes unitários é possível rodar individualmente cada serviço:
  - Configurar os bancos de dados
  - Inserir as informações de configuração no .env a partir do .env.example (read.me do serviço)

---

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

# Configuração do frontend:
1. Realizar as configurações e instalações necessárias para uso do React Native:
   https://reactnative.dev/docs/set-up-your-environment?os=linux

2. Ir para o diretório do frontend `parkingAI/front-end`

3. Instalar dependencias com a opção --legacy-peer-deps

   ```bash
   npm install --legacy-peer-deps
   ```
4. Adicionar chave da google para uso das APIs "Places API" e "Directions API" em config.ts na variável `GOOGLE_MAPS_API_KEY`
   A chave pode ser conferida no console da google: https://console.cloud.google.com/google/maps-apis

5. Iniciar o APP

   ```bash
    npm start
   ```
   ou
   ```bash
    npx expo start
   ```

6. Caso utilize o aplicativo expo para executar o front no celular (› Metro waiting on exp://XXX.XXX.XX.XXX:PPPP), adicionar o IP exibido em config.ts na variável `URL_APIGATEWAY` e apontar a porta do gateway:
   Exemplo: export const URL_APIGATEWAY = "http://192.168.15.112:3000";
   Caso utilize o emulador ou uma conexão direta com seu aparelho, utilize o localhost: "http://localhost:3000"

7. OBS.: Caso faça update, cuidar com alguns pacotes que exigem versões mais antigas, exemplo:
    ```bash
    npm install react-native-google-places-autocomplete@2.5.6 --save
    ```