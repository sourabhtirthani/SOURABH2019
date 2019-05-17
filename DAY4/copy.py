

"""
Code Challenge
  Name: 
    copy command
  Filename: 
    copy.py
  Problem Statement:
    Make a program that create a copy of a file    
"""
file1= open("words.txt",  "rt" )
file2 = open("words1.txt",  "wt" )
line2=file1.read()

for i in line2:
    file2.write(i)
    
file1.close()
file2.close()


   
   



