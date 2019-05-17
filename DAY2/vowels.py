"""code Challenge
  Name: 
    Vowels Finder
  Filename: 
    vowels.py
  Problem Statement:
    Remove all the vowels from the list of states  
  Hint: 
    Use nested for loops and while
  Input:
    state_name = [ 'Alabama', 'California', 'Oklahoma', 'Florida']
  Output:
    ['lbm', 'clfrn', 'klhm', 'flrd']"""

list1 =  [ 'Alabama', 'California', 'Oklahoma', 'Florida']

list2=['a','i','o','u','e','A','I','E','O','U']
output = []

for char in list1:
    new=''
    for item in char:
        if item not in list2:
            new=new+item
       
       
    output.append(new)
print(output)    
    
    
    
        
        
        
    





