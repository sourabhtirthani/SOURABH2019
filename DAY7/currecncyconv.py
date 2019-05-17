"""
Code Challenge
  Name: 
    Currency Converter Convert  from USD to INR
  Filename: 
    currecncyconv.py
  Problem Statement:
    You need to fetch the current conversion prices from the JSON  
    using REST API
  Hint:
    http://free.currencyconverterapi.com/api/v5/convert?q=USD_INR&compact=y
    Check with http://api.fixer.io/latest?base=USD&symbol=EUR
    
"""
import  requests

amount = float(input("Enter the amonut: "))

url = "https://free.currconv.com/api/v7/convert?q=USD_INR&compact=ultra&apiKey=d654544c9c4431b7e83c"

response = requests.get(url)
my_inr = response.json()



print("Total INR", my_inr["USD_INR"]*amount)





