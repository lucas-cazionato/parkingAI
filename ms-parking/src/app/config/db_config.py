import os
from dotenv import load_dotenv

load_dotenv()

host = os.getenv("POSTGIS_HOST", 'localhost')

# Database connection settings
db_config = {
    'host': host,
    'database': 'osm',
    'user': 'osmuser',
    'password': 'osmpass',
    'port': 5432  # default port for Postgres
}