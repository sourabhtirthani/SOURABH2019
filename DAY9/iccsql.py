"""Code Challenge 4

Scrap the data from the URL below and store in sqlite database

https://www.icc-cricket.com/rankings/mens/team-rankings/odi
"""




import sqlite3
from pandas import DataFrame

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

 
conn = sqlite3.connect ( 'icc.db' )


A=[]
B=[]
C=[]


for row in right_table.find_all('tr'):
    cells = row.findAll('td')
    if len(cells) == 4:
        A.append(cells[0].text.strip())
        B.append(cells[1].text.strip())
        C.append(cells[2].text.strip())



c = conn.cursor()
#c.execute("DROP TABLE students ")



#c.execute("DROP TABLE players ")

c.execute ("""CREATE TABLE players(
          players_name:TEXT
          players_rank:INTEGER
          players_
          )""")


for i in range(1,10):
    c.execute("INSERT INTO students VALUES ('str(A[i]),+B[i]+',' +C[i] )")



# STEP 3
c.execute("SELECT * FROM players")
# "SELECT * FROM employees WHERE last = 'Fernandes' "



# STEP 4
# returns one or otherwise None as a tuple
print ( c.fetchone()) 

# returns one or otherwise None as a tuple
print ( c.fetchmany(2)) 

# returns a list of tuples
print ( c.fetchall() )


# Since now the cursor has read all the rows and we are at End
# So again fetching the records from the database
c.execute("SELECT * FROM players")


# STEP 5
df = DataFrame(c.fetchall())  # putting the result into Dataframe
df.columns = ["Student_name","Student_Age","Student_id","Student_branch"]


# STEP 6
# commits the current transaction 
conn.commit()

# STEP 7
# closing the connection 
conn.close()


