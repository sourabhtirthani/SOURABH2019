"""

Code Challenge
  Name: 
    Regular Expression 4
  Filename: 
    regex4.py
  Problem Statement:
    You are given email addresses. 
    Your task is to print a list containing only valid email addresses in lexicographical order .
    (Take input from User)

    Valid email addresses must follow these rules:

    It must have the username@websitename.extension format type.
    The username can only contain letters, digits, dashes and underscores. 
    The website name can only have letters and digits. 
    The maximum length of the extension is  
 
  Hint: 
    Using Regular Expression 
  Input:
    ajeet@forsk.com
    kunal-23@forsk.com
    yogendra_54@forsk.com
  Output:
    ['ajeet@forsk.com', 'kunal-23@forsk.com', 'yogendra_54@forsk.com’]

"""
 
import re

list1=input("Enter the emails").split()
list2 = []

for str1 in list1:
    if re.findall(r'[a-zA-Z]*[-_]*[0-9]*@[a-zA-Z0-9]+\.[a-z]{2,4}',str1):
        list2.append(str1)
        
    
list2.sort()
for i in list2:
    print(i)