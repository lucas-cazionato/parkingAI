import psycopg2
from psycopg2 import sql
from psycopg2.extras import DictCursor

class PostgresConnection:
    def __init__(self, host, database, user, password, port=5432):
        self.host = host
        self.database = database
        self.user = user
        self.password = password
        self.port = port
        self.connection = None

    def connect(self):
        """Establish a connection to the PostgreSQL database."""
        try:
            self.connection = psycopg2.connect(
                host=self.host,
                database=self.database,
                user=self.user,
                password=self.password,
                port=self.port
            )
            print("Connection to the PostgreSQL database established successfully!")
        except psycopg2.Error as e:
            print(f"Error while connecting to PostgreSQL: {e}")
            self.connection = None

    def execute_query(self, query, params=None):
        """Execute a SQL query."""
        if self.connection is None:
            print("No active connection.")
            return None
        
        try:
            with self.connection.cursor(cursor_factory=DictCursor) as cursor:
                cursor.execute(query, params)
                if cursor.description:  # check if it's a SELECT statement
                    return cursor.fetchall()
                else:
                    self.connection.commit()
                    return cursor.rowcount
        except psycopg2.Error as e:
            print(f"Error executing query: {e}")
            return None

    def close(self):
        """Close the database connection."""
        if self.connection:
            self.connection.close()
            print("Connection closed.")

    def __enter__(self):
        """Enable 'with' statement usage."""
        self.connect()
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        """Ensure the connection is closed after usage."""
        self.close()
