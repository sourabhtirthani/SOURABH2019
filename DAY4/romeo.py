
"""
Code Challenge
  Name: 
    Romeo and Juliet
  Filename: 
    romeo.py
  Problem Statement:
    Let’s start with a very simple file of words taken from the text of 
    Romeo and Juliet. (romeo.txt)
    We will write a Python program to read through the lines of the file
    break each line into a list of words
    and then loop through each of the words in the line,
    and count each word using a dictionary.    
"""


dict1={}

with open ("romeo2.txt") as fp1:
    for line in fp1.readlines():
        list1=line.split(" ")
        for word in list1:
            if word not in dict1:
                dict1[word]=1
                
            else:
                dict1[word]=dict1[word] + 1
                
    print(dict1)            
