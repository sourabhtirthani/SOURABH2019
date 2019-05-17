
"""
Code Challenge
  Name: 
    Pangram
  Filename: 
    pangram.py
  Problem Statement:
    Write a Python function to check whether a string is PANGRAM or not
    Take input from User and give the output as PANGRAM or NOT PANGRAM.
  Hint:
    Pangrams are words or sentences containing every letter of the alphabet at least once.
    For example: "The quick brown fox jumps over the lazy dog"  is a PANGRAM.
  Input: 
    The five boxing wizards jumps.
  Output:
    NOT PANGRAM
"""


str1=input("enter the string ").lower()
str2="abcdefghijklmnopqrstuvwxyz"
count=0
if len(str1)>=26:
    
    for i in range(0,26):
        if str2[i] in str1:
            count=count+1
            continue
        else:
            break


if count==26:
    print(" PANGRAM")
    print(count)
else:
    print("NOT PANGRAM")     