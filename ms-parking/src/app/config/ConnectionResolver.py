from .PostgresConnection import PostgresConnection
from .db_config import db_config

class ConnectionResolver():
    _instance: PostgresConnection = None

    def get(self) -> PostgresConnection:
        if self._instance == None:
            self._instance = PostgresConnection(**db_config)
            self._instance.connect()
        return self._instance