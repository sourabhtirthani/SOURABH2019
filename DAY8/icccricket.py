

"""
Code Challenge
  Name: 
    Webscrapping ICC Cricket Page
  Filename: 
    icccricket.py
  Problem Statement:
    Write a Python code to Scrap data from ICC Ranking's 
    page and get the ranking table for ODI's (Men). 
    Create a DataFrame using pandas to store the information.
  Hint: 
    https://www.icc-cricket.com/rankings/mens/team-rankings/odi 
    
    
    #https://www.icc-cricket.com/rankings/mens/team-rankings/t20i
    #https://www.icc-cricket.com/rankings/mens/team-rankings/test
"""
from bs4 import BeautifulSoup
import requests
wiki = "https://www.icc-cricket.com/rankings/mens/player-rankings/odi/batting"
source = requests.get(wiki).text
#or
#source = urllib.request.urlopen(wiki)

soup = BeautifulSoup(source,"lxml")

print (soup.prettify())

all_tables=soup.find_all('table')

print (all_tables)

right_table=soup.find( 'table' , class_='table rankings-table')


print (right_table)



#Generate lists
A=[]
B=[]
C=[]


for row in right_table.find_all('tr'):
    cells = row.findAll('td')
    if len(cells) == 4:
        A.append(cells[0].text.strip())
        B.append(cells[1].text.strip())
        C.append(cells[2].text.strip())
        

import pandas as pd
from collections import OrderedDict

col_name = ["State or UN","Admin Cap","Legis Cap","Judi Cap","Year","Capital"]
col_data = OrderedDict(zip(col_name,[A,B,C]))
df = pd.DataFrame(col_data) 
df.to_csv("former.csv")

