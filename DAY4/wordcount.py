"""
Code Challenge
  Name: 
    Word count
  Filename: 
    wordcount.py
  Problem Statement:
    Unix systems contain many utility functions. 
    One of the most useful to me is wc, the "word count" program. 
    If you run wc against a text file, it'll count the characters, words, 
    and lines that the file contains.
     
    The challenge for this exercise is to write a version of wc in Python. 
    However, your version of wc will return four different types of information 
    about the files:
 
        Number of characters (including whitespace)
        Number of words (separated by whitespace)
        Number of lines
        Number of unique words
    
    The program should ask the user for the name of an input file, 
    and then produce output for that file. 
    
"""
str1=input("Enter the name of file ")
dict1= {}


with open(str1) as fp1:
    for line in fp1.readlines():
        
        list1=list(line)
        for word in list1:
            if word not in dict1:
                dict1[word]=1
              
            else:
                dict1[word]=dict1[word] + 1
        
        
    print(dict1)