n = int(input("Enter a number(MAx 100)"))

while (n<101):
    print(n)
    if n%3==0:
        print(" Fizz")
        break
    elif n%5==0:
         print(" buzz")
         break
    elif n%5==0 or n%3==0:
         print(" FizzBuzz")
         break
    n=n+1
    

        