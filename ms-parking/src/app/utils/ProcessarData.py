import datetime as dt # Importacao de modulo para manipulação de datas e horas
from pandas.tseries.offsets import CustomBusinessDay # Modulo que permite a criação de um calendário personalizado para dias úteis
from .Feriados_Brasil import Feriados_Brasil # Importa a lista de Feriados do Brasil e suas datas

class ProcessarData:
    def __init__(self) -> None:
        self.br_feriados = CustomBusinessDay(calendar=Feriados_Brasil())    
        self.feriados = Feriados_Brasil()
        self.list_feriados = self.feriados.holidays(dt.datetime(2000, 12, 31), dt.datetime(2079, 12, 31))
    
    def processDate(self, time: dt.datetime):
        """
        Metodo que recebe como parametro uma Data/Hora e retorna uma lista de atributos dessa Data/Hora
        
        :param time: A Data/Hora a ser processada
        :return: Dicionario contendo os atributos   'day_of_week[1]', 'period_of_month[2]', 'month[3]', 
                                                    'is_holiday[4]', 'time_hour[5]', 'impact_period_of_day[6]'
        """
        
        # Extracao dos componentes de data e hora
        date = time.date() # Extracao da data
        day_of_month = time.day # Extracao do dia do mes

        # 1 - Extracao do dia da semana - 0 para Domingo, 6 para Sabado
        day_of_week = (time.weekday() + 1) % 7  

        # 2 - Calculo do periodo do mes (1: 1-10, 2: 11-20, 3: >=21)
        if day_of_month <= 10:
            period_of_month = 1
        elif day_of_month <= 20:
            period_of_month = 2
        else:
            period_of_month = 3

        # 3 - Extracao do mes
        month = time.month 

        # 4 - Verificar se é um feriado ou não
        is_holiday = 1 if date in self.list_feriados.date else 0

        # 5 - Extracao da hora do dia
        hour = time.hour 
        
        # 6 - Determinando o impacto do periodo do dia com base na hora
        if hour >= 0 and hour < 6:
            impact_period_of_day = 1
        elif hour >= 6 and hour < 7:
            impact_period_of_day = 2
        elif hour >= 7 and hour < 10:
            impact_period_of_day = 4
        elif hour >= 10 and hour < 14:
            impact_period_of_day = 3
        elif hour >= 14 and hour < 17:
            impact_period_of_day = 2
        elif hour >= 17 and hour < 20:
            impact_period_of_day = 4
        elif hour >= 20 and hour < 22:
            impact_period_of_day = 2
        else:
            impact_period_of_day = 1

        # Retorna as informações como um dicionário de dados
        return {
            'day_of_week': day_of_week,
            'period_of_month': period_of_month,
            'month': month,
            'is_holiday': is_holiday,
            'time_hour': hour,
            'impact_period_of_day': impact_period_of_day
        }