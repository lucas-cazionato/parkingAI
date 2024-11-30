from config import *
from .MappedRepo import MappedRepo

class MappedRepoResolver:
    _instance: MappedRepo = None

    def get(self) -> MappedRepo:
        if self._instance == None:
            db = ConnectionResolver().get()
            self._instance = MappedRepo(db)
        return self._instance