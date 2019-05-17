
"""
Code Challenge
  Name: 
    Zoo Management
  Filename: 
    zoo.py
  Problem Statement:
    Create different functions to :
    read the zoo.csv file using readlines and print them
    Print in list of animals in groups (elephant / tiger / lion / zebra / kangaroo)
    print the total number of water need by elephant / tiger / lion / zebra / kangaroo
    print the total number of water needed by all the animals    
"""

import csv
with open('zoo.csv', mode='r') as f1 :
    print(f1.readlines())
    
dict1 = {}
with open("zoo.csv") as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=",")
    next(csv_reader)
    for row in csv_reader:
        if row[0] in dict1:
            dict1[row[0]]= dict1[row[0]]+1
            
        else:
             dict1[row[0]]=1
             
print(dict1)             


dict1 = {}
with open("zoo.csv") as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=",")
    next(csv_reader)
    for row in csv_reader:
        if row[0] in dict1:
            dict1[row[0]]= int(dict1[row[0]])+dict1[row[0]]
            
        else:
             dict1[row[0]]=int(row[2])
        
    
print(dict1)    