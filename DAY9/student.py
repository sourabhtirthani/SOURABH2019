
"""

Code Challenge 1
Write a python code to insert records to a mongo/sqlite/MySQL database 
named db_University for 10 students with fields like 
Student_Name, Student_Age, Student_Roll_no, Student_Branch.
"""
import sqlite3
from pandas import DataFrame

 
conn = sqlite3.connect ( 'student.db' )



c = conn.cursor()
#c.execute("DROP TABLE students ")





c.execute ("""CREATE TABLE students(
          Student_Name TEXT,
          Student_Age  INTEGER,
          Student_Roll_no INTEGER,
          Student_Branch TEXT
          )""")


# STEP 2
c.execute("INSERT INTO students VALUES ('Sylvester',34, '01', 'CS')")
c.execute("INSERT INTO students VALUES ('sourabh',20, '02', 'CS')")
c.execute("INSERT INTO students VALUES ('AAKash',21, '03', 'ME')")
c.execute("INSERT INTO students VALUES ('CHHopa',21, '04', 'CDE')")
c.execute("INSERT INTO students VALUES ('jai',32, '05', 'EE')")


# STEP 3
c.execute("SELECT * FROM students")
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
c.execute("SELECT * FROM students")


# STEP 5
df = DataFrame(c.fetchall())  # putting the result into Dataframe
df.columns = ["Student_name","Student_Age","Student_id","Student_branch"]


# STEP 6
# commits the current transaction 
conn.commit()

# STEP 7
# closing the connection 
conn.close()
