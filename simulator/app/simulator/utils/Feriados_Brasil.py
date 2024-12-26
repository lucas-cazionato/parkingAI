
import datetime as dt
from pandas.tseries.holiday import AbstractHolidayCalendar, GoodFriday, Holiday, Easter, Day
from pandas.tseries.offsets import CustomBusinessDay

class Feriados_Brasil(AbstractHolidayCalendar):
    rules = [
        Holiday('Confraternização Universal', month=1, day=1),
        # Terça feira de carnaval (47 dias antes da Páscoa)
        Holiday('Segunda Feira de Carnaval', month=1, day=1, offset=[Easter(), Day(-48)]),
        Holiday('Terça Feira de Carnaval', month=1, day=1, offset=[Easter(), Day(-47)]),
        # Sexta feira Santa(GoodFriday)
        GoodFriday,        
        Holiday('Tiradentes', month = 4, day = 21),
        Holiday('Dia do Trabalho', month = 5, day = 1),
        # Corpus Christi (60 dias após a Páscoa, ou 62 dias após a Sexta Feira Santa)
        Holiday('Corpus Christi', month=1, day=1, offset=[Easter(), Day(60)]),        
        Holiday('Independência do Brasil', month = 9, day = 7),
        Holiday('Nossa Senhora Aparecida - Padroeira do Brasil', month = 10, day = 12),
        Holiday('Finados', month = 11, day = 2),
        Holiday('Proclamação da República', month = 11, day = 15),
        Holiday('Natal', month = 12, day = 25)]
