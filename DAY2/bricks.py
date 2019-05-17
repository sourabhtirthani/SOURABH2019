"""
Code Challenge
  Name: 
    Bricks
  Filename: 
    bricks.py
  Problem Statement:
    We want to make a row of bricks that is target inches long. 
    We have a number of small bricks (1 inch each) and big bricks (5 inches each). 
    Make a function that prints True if it is possible to make the exact target 
    by choosing from the given bricks or False otherwise. 
    Take list as input from user where its 1st element represents number of small bricks, 
    middle element represents number of big bricks and 3rd element represents the target.
  Input: 
    2, 2, 11
  Output:
    True
"""

def bricks(small,big,total):
    if small+big*5>=total:
        if total%5<=small:
            return True
        else:
            return False
    else:
        return False
    
    
small=int(input("enter total number of one intch of brick"))
large=int(input("enter the number of 5 intch of brick"))
total=int(input("enter the total length of brick to be built"))
print(bricks(small,large,total))