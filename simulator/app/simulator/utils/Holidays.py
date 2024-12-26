
import datetime as dt
from pandas.tseries.offsets import CustomBusinessDay
from .Feriados_Brasil import Feriados_Brasil

class Holidays:
    def __init__(self) -> None:
        self.br_feriados = CustomBusinessDay(calendar=Feriados_Brasil())    
        self.feriados = Feriados_Brasil()
        self.list_feriados =  self.feriados.holidays(dt.datetime(2000, 12, 31), dt.datetime(2079, 12, 31))
    
    def is_holiday(self, time: dt.datetime) -> bool:
        """
        Check if the given date is a holiday.
        
        :param time: The datetime to check
        :return: True if the date is a holiday, False otherwise
        """
        # Extract date part from the datetime object
        date = time.date()
        # Check if the date is in the list of holidays
        return date in self.list_feriados.date
