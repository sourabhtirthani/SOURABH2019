import random as rd


secret_number = rd.randint(1,10)

guess_number = int(input("Enter the number"))

ab = abs(secret_number-guess_number)
 
if secret_number== guess_number:
    print(" player wins and computer lose.")
    
else :
     print("player lose and computer wins")
     print("secret_number {} , guess_number {}".format(secret_number,guess_number))

    
if(ab>6):
    print("too high")
    print("secret_number {} , guess_number {}".format(secret_number,guess_number))
    
    
elif(ab<3):
    print("too low")
    print("secret_number {} , guess_number {}".format(secret_number,guess_number))


    



