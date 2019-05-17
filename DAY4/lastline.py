"""
Code Challenge
  Name: 
    Last Line
  Filename: 
    lastline.py
  Problem Statement:
    Ask the user for the name of a text file. 
    Display the final line of that file.
    Think of ways in which you can solve this problem, 
    and how it might relate to your daily work with Python.
"""

str1 = input("Enter the name of file ")

with open(str1) as fp1:
    fp1.seek(0,0)
    com=fp1.readlines()
    print(com[-1])
        
        
