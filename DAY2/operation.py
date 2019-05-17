"""
Code Challenge
  Name: 
    Operations Function
  Filename: 
    operation.py
  Problem Statement:
    Write following functions for list operations. Take list as input from the User
    Add(), Multiply(), Largest(), Smallest(), Sorting(), Remove_Duplicates(), Print()
    Only call Print() function to display the results in the below displayed 
    format (i.e all the functions must be called inside the print() function 
    and only the Print() is to be called in the main script)

  Input: 
    5,2,6,2,3
  Output:
    Sum = 18
    Multiply = 360
    Largest = 6
    Smallest = 2
    Sorted = [2, 2, 3, 5, 6]
    Without Duplicates = [2, 3, 5, 6]  
"""
def ADD(list1):
    
    b  = sum(list1)
    return b

def Mul(list2):
    b=0
    
    for i in list2:
        b += i * (i+1)
        print(b)
    
        
    return b

list1=[ 5,2,6,2,3]
a=ADD(list1)
print("sum is " ,a)

c=Mul(list1)
print("mul is " ,c)

list1.sort()
print("largest is ",list1[-1])
print("smallest is ",list1[0])



