from database import *
from .OsmParkingRepo import OsmParkingRepo

class OsmParkingRepoResolver:
    _instance: OsmParkingRepo = None

    def get(self) -> OsmParkingRepo:
        if self._instance == None:
            db = ConnectionResolver().get()
            self._instance = OsmParkingRepo(db)
        return self._instance
