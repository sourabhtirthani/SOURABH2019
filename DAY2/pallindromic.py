
"""
Code Challenge
  Name: 
    Pallindromic Integer
  Filename: 
    pallindromic.py
  Problem Statement:
    You are given a space separated list of integers. 
    If all the integers are positive and if any integer is a palindromic integer, 
    then you need to print True else print False.
    (Take Input from User)  
  Hint: 
      A palindromic number or numeral palindrome is a number that remains the same
      when its digits are reversed. 
      Like 16461, for example, it is "symmetrical"
      Shorter logic can be developed using any and all and List comprehension
  Input: 
    12 9 61 5 14
  Output:
    True
"""


def pallindrom(string):
    if string==string[::-1]:
        return True
    else:
        return False
    
    



list1 = ["12", "9", "61", "5" ,"14"]

for i in list1:
    if int(i)>0:
        a=pallindrom(str(i))
        if a== True:
           ans="True"
           break
        else:
           ans="False"
            
    else:
         print("not a integer ")
        
    
print(ans)
    
        
        
            
 
        
        
            
        


