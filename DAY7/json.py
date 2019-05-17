
"""
Code Challenge
  Name: 
    JSON Parser
  Filename: 
    json.py
  Problem Statement:
    Get me the other details about the city
        Latitude and Longitude
        Weather Condition
        Wind Speed
        Sunset Rise and Set timing
"""


import requests
srt1 = input("Enter the name of city: ")
url1 = "http://api.openweathermap.org/data/2.5/weather"
url2 = "?q="+srt1
url3 = "&appid=4549dd0d4a140d05e3d1a5bca97fea8e"

url = url1 + url2 + url3
#print (url)


response = requests.get(url)
# requests.get(url,params={"q":"Jaipur", "appid"="e9185b28e9969fb7a300801eb026de9c"})
response.content

# Content in binary form
#print (type(response.content))
my_data = response.json()
print("Latitude",my_data['coord']['lon'])
print("Longitude",my_data['coord']['lat'])
print("Weather  condition ",my_data['weather'][0]['main'])
print("Wind speed ",my_data['wind']['speed'])
print("Sunset",my_data['sys']['sunrise'])
print("Sunset",my_data['sys']['sunset'])
