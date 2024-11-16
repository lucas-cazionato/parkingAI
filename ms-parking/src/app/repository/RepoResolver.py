from config import *
from .Repo import Repo

class RepoResolver:
    _instance: Repo = None

    def get(self) -> Repo:
        if self._instance == None:
            db = ConnectionResolver().get()
            self._instance = Repo(db)
        return self._instance