import numpy as np

# 2D list where rows represent time slots (0-23), and columns represent days of the week (1-7)
# All times are rounded to the nearest integer and represented as integers (minutes that it takes to moving 10km in Curitiba)
# source: https://www.tomtom.com/traffic-index/curitiba-traffic/

class Traffic:
  
  curitiba_central_traffic = [
    # 0: 12:00 AM
    [17, 15, 16, 16, 16, 16, 17], # Sun, Mon, Tue, Wed, Thu, Fri, Sat
    # 1: 01:00 AM
    [17, 15, 15, 16, 16, 16, 17],
    # 2: 02:00 AM
    [16, 15, 15, 15, 16, 16, 16],
    # 3: 03:00 AM
    [16, 14, 15, 15, 15, 15, 16],
    # 4: 04:00 AM
    [16, 14, 14, 14, 14, 14, 16],
    # 5: 05:00 AM
    [16, 14, 14, 14, 15, 15, 15],
    # 6: 06:00 AM
    [16, 18, 18, 18, 18, 18, 16],
    # 7: 07:00 AM
    [16, 25, 26, 25, 25, 24, 18],
    # 8: 08:00 AM
    [16, 25, 26, 26, 26, 25, 19],
    # 9: 09:00 AM
    [17, 23, 24, 24, 24, 23, 19],
    # 10: 10:00 AM
    [18, 21, 22, 22, 22, 22, 20],
    # 11: 11:00 AM
    [19, 22, 22, 22, 22, 22, 21],
    # 12: 12:00 PM
    [19, 23, 23, 23, 23, 23, 22],
    # 13: 01:00 PM
    [19, 23, 24, 24, 23, 24, 21],
    # 14: 02:00 PM
    [18, 22, 23, 23, 23, 23, 21],
    # 15: 03:00 PM
    [19, 23, 23, 23, 23, 23, 21],
    # 16: 04:00 PM
    [19, 28, 29, 29, 29, 29, 21],
    # 17: 05:00 PM
    [19, 28, 29, 30, 30, 29, 21],
    # 18: 06:00 PM
    [20, 22, 23, 24, 24, 23, 20],
    # 19: 07:00 PM
    [19, 19, 20, 20, 20, 20, 21],
    # 20: 08:00 PM
    [18, 19, 19, 20, 20, 19, 20],
    # 21: 09:00 PM
    [17, 18, 18, 19, 19, 19, 19],
    # 22: 10:00 PM
    [16, 17, 18, 18, 18, 19, 18],
    # 23: 11:00 PM
    [16, 17, 17, 18, 18, 18, 18]
  ]
  
  curitiba_periferical_traffic = [
    # 0: 12:00 AM
    [14, 11, 11, 12, 12, 12, 13],  # Sun, Mon, Tue, Wed, Thu, Fri, Sat
    # 1: 01:00 AM
    [13, 11, 11, 11, 11, 12, 13],
    # 2: 02:00 AM
    [13, 10, 10, 10, 11, 12, 13],
    # 3: 03:00 AM
    [13, 10, 10, 10, 10, 12, 12],
    # 4: 04:00 AM
    [13, 10, 10, 10, 10, 12, 12],
    # 5: 05:00 AM
    [12, 11, 11, 11, 11, 12, 12],
    # 6: 06:00 AM
    [12, 14, 15, 15, 14, 14, 13],
    # 7: 07:00 AM
    [12, 19, 20, 20, 19, 13, 13],
    # 8: 08:00 AM
    [12, 18, 18, 19, 19, 15, 13],
    # 9: 09:00 AM
    [13, 17, 17, 18, 17, 15, 15],
    # 10: 10:00 AM
    [13, 16, 17, 17, 17, 15, 15],
    # 11: 11:00 AM
    [14, 16, 17, 17, 18, 15, 15],
    # 12: 12:00 PM
    [14, 17, 18, 18, 18, 15, 15],
    # 13: 01:00 PM
    [14, 17, 17, 17, 18, 16, 15],
    # 14: 02:00 PM
    [14, 17, 17, 18, 18, 17, 15],
    # 15: 03:00 PM
    [14, 17, 18, 18, 18, 17, 15],
    # 16: 04:00 PM
    [15, 14, 14, 15, 15, 17, 16],
    # 17: 05:00 PM
    [14, 14, 14, 14, 15, 17, 16],
    # 18: 06:00 PM
    [14, 13, 14, 14, 14, 16, 16],
    # 19: 07:00 PM
    [14, 13, 14, 14, 14, 15, 16],
    # 20: 08:00 PM
    [14, 12, 13, 14, 14, 14, 16],
    # 21: 09:00 PM
    [13, 12, 12, 13, 14, 14, 16],
    # 22: 10:00 PM
    [13, 13, 12, 12, 13, 14, 16],
    # 23: 11:00 PM
    [13, 13, 13, 13, 14, 14, 16]
  ]
  def __init__(self) -> None:
    # Flatten the matrix to calculate min and max
    flat_matrix_central = [value for row in self.curitiba_central_traffic for value in row]
    flat_matrix_periferical = [value for row in self.curitiba_periferical_traffic for value in row]
    
    # Calculate min and max
    min_val_central = min(flat_matrix_central)
    max_val_central = max(flat_matrix_central)
    min_val_periferical = min(flat_matrix_periferical)
    max_val_periferical = max(flat_matrix_periferical)
    self.min_val = min_val_central if min_val_central < min_val_periferical else min_val_periferical
    self.max_val = max_val_central if max_val_central > max_val_periferical else max_val_periferical

    # Normalize the matrix
    self.normalized_curitiba_central_traffic = [
        [(value - self.min_val) / (self.max_val - self.min_val) for value in row]
        for row in self.curitiba_central_traffic
    ]
    
    self.normalized_curitiba_periferical_traffic = [
        [(value - self.min_val) / (self.max_val - self.min_val) for value in row]
        for row in self.curitiba_periferical_traffic
    ]

  def get_normalized_curitiba_cetral_traffic(self):
      for row in self.normalized_curitiba_central_traffic:
        yield row

  def get_normalized_curitiba_periferical_traffic(self):
      for row in self.normalized_curitiba_periferical_traffic:
        yield row
