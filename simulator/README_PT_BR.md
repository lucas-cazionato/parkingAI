# 🚀 Iniciando a Configuração

## Passo 1: Iniciar a Instância do PostGIS e a Imagem `osm2pgsql`
Para começar, inicie os serviços necessários executando o seguinte comando:

```bash
docker compose up -d
```

Os dados que usaremos estão localizados no arquivo `map.osm`, que contém informações sobre uma pequena região de Curitiba.

---

## Passo 2: Importar os Dados

Navegue até a pasta `/data` e torne o script `run_import.sh` executável:

```bash
chmod +x run_import.sh
```

Agora você pode executar o script de importação:

```bash
./run_import.sh <nome_do_arquivo>
```

- **Nota:** O argumento `<nome_do_arquivo>` é opcional. Se você especificá-lo, o script importará os dados daquele arquivo no diretório `/map-data`. Se omitido, ele irá importar o `map.osm` por padrão.

Alternativamente, você pode executar o seguinte comando diretamente do seu terminal (enquanto estiver dentro do diretório `/data`):

```bash
docker compose run -v $(pwd)/map-data:/data osm2pgsql \
  -d osm \    
  -U osmuser \
  -H postgis \
  -P 5432 \             
  -c -k /data/map.osm
```

---

## Saída Esperada

Se tudo funcionar corretamente, você deverá ver uma saída semelhante a esta:

```
2024-10-07 07:07:08  Todos os pós-processamentos na tabela 'planet_osm_point' concluídos em 0s.
2024-10-07 07:07:08  Todos os pós-processamentos na tabela 'planet_osm_line' concluídos em 0s.
2024-10-07 07:07:08  Todos os pós-processamentos na tabela 'planet_osm_polygon' concluídos em 0s.
2024-10-07 07:07:08  Todos os pós-processamentos na tabela 'planet_osm_roads' concluídos em 0s.
2024-10-07 07:07:08  Armazenando propriedades na tabela '"public"."osm2pgsql_properties"'.
2024-10-07 07:07:08  osm2pgsql levou 0s no total.
```

---

## Passo 3: Acessar o Banco de Dados PostgreSQL

Uma vez que a importação esteja concluída, você pode acessar o banco de dados PostgreSQL em execução no Docker usando o nome de usuário e a senha que você configurou. Fique à vontade para usar seu método preferido para se conectar.

---

## Exemplo de Consulta para Testar

Aqui está uma consulta SQL que você pode executar para testar os dados importados:

```sql
-- Substitua 'NomeDaRua' pelo nome da rua que você está interessado
SELECT p.*
FROM planet_osm_polygon p
JOIN planet_osm_roads r
  ON r.name = 'Rua Conselheiro Laurindo' -- Substitua pelo nome real da rua
WHERE ST_DWithin(r.way, p.way, 120)      -- zona de 120 metros ao redor da estrada
AND p.amenity = 'parking'                -- apenas polígonos de estacionamento
AND p.tags->'parking' = 'street_side';   -- apenas estacionamento na rua
```

Fique à vontade para baixar novos conjuntos de dados para testar ainda mais a configuração.

---

# 🐍 Ambiente de Desenvolvimento Python com Docker

Esta configuração permite que você desenvolva e teste código Python dentro de um contêiner Docker. Você pode executar scripts específicos, instalar novos módulos Python e garantir consistência entre os ambientes.

## 🚀 Começando

### Pré-requisitos 📋
- 🐳 [Docker](https://docs.docker.com/get-docker/)
- 🛠️ [Docker Compose](https://docs.docker.com/compose/install/)

### Configuração 🔧

1. **Clone este repositório** (ou crie seu diretório de projeto).
2. **Construa o contêiner Docker:**

   ```bash
   docker-compose build
   ```

3. **Inicie o contêiner Docker:**

   ```bash
   docker-compose up -d
   ```

### 🏃 Executando Scripts Python

Para executar um script Python dentro do contêiner, use o script `runpy.sh` fornecido. Isso permite que você execute qualquer script Python sem se conectar manualmente ao contêiner.

```bash
./runpy.sh caminho/para/seu_script.py
```

Por exemplo:

```bash
./runpy.sh scripts/meu_script.py
```

### 🧪 Instalando Módulos Python

Você tem duas opções para instalar pacotes Python: temporária (para teste) e permanente (adicionada ao projeto).

#### Instalação de Módulo Temporário ⏳

Para instalar um novo módulo dentro do contêiner para testes, primeiro conecte-se ao contêiner em execução:

```bash
docker exec -it app-python-1 bash
```

Em seguida, dentro do contêiner, use `pip` para instalar o módulo necessário:

```bash
pip install <nome_do_módulo>
```

Ou você pode executar diretamente com isso:

```bash
docker exec -it app-python-1 pip install <nome-do-módulo>
```

#### Instalação de Módulo Permanente 📦

Para adicionar permanentemente um módulo Python ao seu projeto:

1. Abra o arquivo `requirements.txt`.
2. Adicione o módulo desejado e a versão ao arquivo. Por exemplo:

   ```text
   numpy==1.23.4
   scipy==1.10.1
   ```

3. Reconstrua o contêiner para instalar os novos pacotes:

   ```bash
   docker-compose build
   ```

4. Reinicie o contêiner:

   ```bash
   docker-compose up -d
   ```

5. **DICA**: Você pode verificar os módulos que tem instalados executando 
    ```bash
    pip list
    ```

    Depois disso, você pode copiar e colar a linha do novo módulo que deseja e colocá-la no `requirements.txt`.


### 🛑 Parando o Contêiner

Para parar o contêiner quando você terminar:

```bash
docker-compose down
```

### 📝 Resumo dos Comandos

- **🛠️ Construir e iniciar o contêiner:**

  ```bash
  docker-compose build
  docker-compose up -d
  ```

- **🏃 Executar um script Python:**

  ```bash
  ./runpy.sh caminho/para/seu_script.py
  ```

- **🔧 Instalar um novo módulo Python temporariamente (para teste):**

  ```bash
  docker exec -it app-python-1 bash
  pip install <nome_do_módulo>
  ```

- **📦 Instalar um novo módulo Python permanentemente (adicionado ao `requirements.txt`):**

  1. Adicione o módulo ao `requirements.txt`.
  2. Reconstrua o contêiner:

     ```bash
     docker-compose build
     ```

  3. Reinicie o contêiner:

     ```bash
     docker-compose up -d
     ```

- **🛑 Parar o contêiner:**

  ```bash
  docker-compose down
  ```

--- 
