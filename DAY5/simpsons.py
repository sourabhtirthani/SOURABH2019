"""Code Challenge
  Name: 
    Simpsons Phone Book
  Filename: 
    simpsons.py
  Problem Statement: (simpsons_phone_book.txt)
    There are some people with the surname Neu. 
    We are looking for a Neu, but we don't know the first name, 
    we just know that it starts with a J. 
    Let's write a Python script, which finds all the lines of the phone book, 
    which contain a person with the described surname and a first name starting with J. 
 Hint: 
     Use Regular Expressions 
"""

import re

with open('simpsons_phone_book.txt') as fp1:
    for contact in fp1.readlines():
        if re.findall(r'^[jJ]{1}\w*\s+Neu',contact):
            print(contact)

