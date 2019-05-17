
"""
Code Challenge:
  Name: 
    Bid Plus
  Filename: 
    bid_plus.py
  Problem Statement:
      USE SELENIUM
      Write a Python code to Scrap data and download data from given url.
      url = "https://bidplus.gem.gov.in/bidlists"
      Make list and append given data:
          1. BID NO
          2. items
          3. Quantity Required
          4. Department Name And Address
          5. Start Date/Time(Enter date and time in different columns)
          6. End Date/Time(Enter date and time in different columns)
     Make a csv file add all data in it.
      csv Name: bid_plus.csv
"""



from  selenium import webdriver
from time import sleep
from bs4 import BeautifulSoup as BS

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
    B.append(browser.find_element_by_xpath("//*[@id='pagi_content']/div["+str(i)+"]/div[2]/p[1]/strong").text)
    C.append(browser.find_element_by_xpath("//*[@id='pagi_content']/div["+str(i)+"]/div[2]/p[2]/strong").text)
    D.append(browser.find_element_by_xpath("//*[@id='pagi_content']/div["+str(i)+"]/div[3]/p[1]/strong").text)


sleep(5)
 
html_page = browser.page_source

soup = BS(html_page)


sleep(3)


browser.quit()



 




