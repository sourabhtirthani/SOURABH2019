
"""
Code Challenge
  Name: 
    Digit Letter Counter
  Filename: 
    digit_letter_counter.py
  Problem Statement:
    Write a Python program that accepts a string from User and calculate the number of digits and letters.
  Hint:
    Store the letters and Digits as keys in the dictionary  
  Input: 
    Python 3.2
  Output:
    Digits 2
    Letters 6 
"""

str1=input("Enter the string")
a=len(str1)
counter=0
count=0

for i in str1:
    if i.isalpha():
        counter=counter+1
        
        
    elif i.isdigit():
        count=count+1
        
        
    else:
        continue
    
print("letters:",counter )
print("digit:",count)
        