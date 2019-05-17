"""
Code Challenge
  Name: 
    Duplicate
  Filename: 
    duplicate.py
  Problem Statement:
    With a given list [12,24,35,24,88,120,155,88,120,155]
    Write a program to print this list after removing all duplicate values 
    with original order reserved  
"""
list1=[12,24,35,24,88,120,155,88,120,155]

s1=set(list1)
l2=list(s1)

l2.reverse()
print(l2)

