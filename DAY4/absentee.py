"""
Code Challenge
  Name: 
    Create a list of absentee
  Filename: 
    absentee.py
  Problem Statement:
    Make a program that create a file absentee.txt
    The program should take max 25 students name one by one
    When the user enter a blank line, it should terminate the input
    Store all the name of students in the file    
    Once all the students names have been entered, it should display the list
    
"""
with open('words3.txt', mode='w') as file :
    count=0
    for str1 in range(0,25):
        if count<25:
            str1=input("Enter the name of student ")
            file.write(str1+"\n")
            count=count+1
            
            if str1=="":
                break
            
        else:
            print("max limit")
            break

      
        
file1 = open("words3.txt",  "rt" )
file1.seek(0,0)
print(file1.readline)