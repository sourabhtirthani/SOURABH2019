"""
Code Challenge
  Name: 
    weeks
  Filename: 
    weeks.py
  Problem Statement:
    Write a program that adds missing days to existing tuple of days
  Input: 'Monday', 'Wednesday', 'Thursday', 'Saturday'
    ()
  Output:
    ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
"""

list1=input("Enter the days").split(",")

list2 = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

for item in list2:
    if item not in  list1:
        list1.append(item)

        
     
s1 = set(list1)    
print(s1)