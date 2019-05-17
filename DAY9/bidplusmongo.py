"""Code Challenge 3
In the Bid plus Code Challenege 

          1. BID NO
          2. items
          3. Quantity Required
          4. Department Name And Address
          5. Start Date/Time(Enter date and time in different columns)
          6. End Date/Time(Enter date and time in different columns)

Store the information into a database mySQL Database
"""



from  selenium import webdriver
from time import sleep
from bs4 import BeautifulSoup as BS
import pymongo

client = pymongo.MongoClient("mongodb://sourabhtirthani:kyahuayrr123@cluster0-shard-00-00-zdgqt.mongodb.net:27017,cluster0-shard-00-01-zdgqt.mongodb.net:27017,cluster0-shard-00-02-zdgqt.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true")


mydb = client.Employee



#url = "http://keralaresults.nic.in/sslc2018rgr8364/swr_sslc.htm"
url = "https://bidplus.gem.gov.in/bidlists"
"""//*[@id="pagi_content"]/div[1]/div[1]/p[1]/a
//*[@id="pagi_content"]/div[2]/div[1]/p[1]/a
//*[@id="pagi_content"]/div[1]/div[2]/p[1]/strong
//*[@id="pagi_content"]/div[2]/div[2]/p[1]/strong
//*[@id="pagi_content"]/div[2]/div[2]/p[2]/strong
//*[@id="pagi_content"]/div[3]/div[2]/p[2]/strong
//*[@id="pagi_content"]/div[1]/div[3]/p[1]/strong
//*[@id="pagi_content"]/div[2]/div[3]/p[1]/strong
"""

browser = webdriver.Chrome("F:\FORSk\chromedriver_win32\chromedriver.exe")
browser.get(url)


sleep(2)

A=[]
B=[]
C=[]
D=[]

for i in range(1,11):
    A.append(browser.find_element_by_xpath("//*[@id='pagi_content']/div["+str(i)+"]/div[1]/p[1]/a").text)    
    B.append(browser.find_element_by_xpath("//*[@id='pagi_content']/div["+str(i)+"]/div[2]/p[1]/span").text)
    C.append(browser.find_element_by_xpath("//*[@id='pagi_content']/div["+str(i)+"]/div[2]/p[2]/span").text)
    D.append(browser.find_element_by_xpath("//*[@id='pagi_content']/div["+str(i)+"]/div[3]/p[2]").text)


sleep(5)
def add_item(A, B ,C ,D):
    for i in range(1,10):
        mydb.Employees.insert_one(
            {
            "Bid_no" : A[i],
            "Items" : B[i],
            "Quakity" : C[i],
            "DEpt" : D[i]
            })
    return "Employee added successfully"


def fetch_all_item():
    user = mydb.Employees.find()
    for i in user:
        print (i)


add_item(A,B,C,D)
fetch_all_item()
html_page = browser.page_source

soup = BS(html_page)


sleep(3)


browser.quit()

