#THIS CODE CALCULATE THE  WEIGHTED SCORE 

A1 = float(input("Enter the marks of first assnigment (Max 100)"))
A2 = float(input("Enter the marks of second assnigment (Max 100)"))
A3 = float(input("Enter the marks of third assnigment (Max 100)"))
E1 = float(input("Enter the marks of first exam (Max 100)"))
E2 = float(input("Enter the marks of second exam (Max 100)"))

 weighted_score = ( A1 + A2 + A3 ) *0.1 + (E1 + E2 ) * 0.35
print( weighted_score)