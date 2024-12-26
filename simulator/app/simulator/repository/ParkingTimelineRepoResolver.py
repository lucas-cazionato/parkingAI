from database import *
from .ParkingTimelineRepo import ParkingTimelineRepo

class ParkingTimelineRepoResolver:
    _instance: ParkingTimelineRepo = None

    def get(self) -> ParkingTimelineRepo:
        if self._instance == None:
            db = ConnectionResolver().get()
            self._instance = ParkingTimelineRepo(db)
        return self._instance
