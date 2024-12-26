import math
import random
from scipy.stats import norm
from typing import List

class Probability:
    
    def __init__(self, mean: float, std_dev: float) -> None:
        """_summary_

        Args:
            mean (float): mean of a distribution
            std_dev (float): standard deviation of a normal distribution
        """
        self.mean = mean
        self.std_dev = std_dev
        
    @staticmethod
    def probability_true(percentage: int) -> bool:
        """
        Returns True with the given percentage of likelihood, else False.
        """
        return random.randint(0, 100) <= percentage
    
    @staticmethod
    def probability_false(percentage: int) -> bool:
        """
        Returns False with the given percentage of likelihood, else True.
        """
        return not __class__.probability_true(percentage)
    
    def normal_distribution(self,  x: float) -> float:
        """
        Generates the value of the normal distribution for a given point.
        Uses the probability density function (PDF) for the normal distribution.
        """
        exponent = math.exp(-((x - self.mean) ** 2) / (2 * (self.std_dev ** 2)))
        denominator = self.std_dev * math.sqrt(2 * math.pi)
        return exponent / denominator
    
    def percentage_below_value(self, x: float) -> float:
        """
        Calculates the cumulative probability (CDF) for a normal distribution,
        i.e., the percentage of the curve below the given value.
        """
        return norm.cdf(x, self.mean, self.std_dev) 
    
    def percentage_above_value(self, x: float) -> float:
        """
        Calculates the percentage of the normal distribution curve above the given value.
        """
        return (1 - norm.cdf(x, self.mean, self.std_dev)) 

    def percentage_around_value(self, x: float, window: float) -> float:
        """_summary_

        Args:
            mean (float): mean of a normal distribution
            std_dev (float): standard deviation of a normal distribution
            x (float): target value in a given distribution
            window: windown around the target value. Gets the following interval [x-windown, x+windown]
        Returns:
            float: Calculates the percentagem of the normal distribution around a target value for a given windown
        """
        percentage_above = self.percentage_above_value(x-window)
        percentage_below = self.percentage_below_value(x+window)
        return (percentage_above + percentage_below - 1)/2

    @staticmethod
    def random_between(initial:int, final: int)->int:
        return random.randint(initial, final)

