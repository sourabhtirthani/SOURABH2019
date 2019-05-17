



import pymongo
#import dns # required for connecting with SRV


client = pymongo.MongoClient("mongodb://sourabhtirthani:kyahuayrr123@cluster0-shard-00-00-zdgqt.mongodb.net:27017,cluster0-shard-00-01-zdgqt.mongodb.net:27017,cluster0-shard-00-02-zdgqt.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true")


mydb = client.Employee

def add_employee(idd, name ,age ,branch):
    #unique_employee = mydb.employees.find_one({"id":idd})
    #if unique_employee:
    #    return "Employee already exists"
    #else:
    mydb.Employees.insert_one(
            {
            "id" : idd,
            "name" : name,
            "age" : age,
            "branch" : branch
            })
    return "Employee added successfully"


def fetch_all_employee():
    user = mydb.Employees.find()
    for i in user:
        print (i)




add_employee(1,'Sylvester', 23, 'cs')
add_employee(2,'Yogendra', 43, 'me')
add_employee(3,'Rohit', 12, 'cd')
add_employee(4,'Kunal', 21, 'nm')
add_employee(5,'Devendra', 65, '54')

fetch_all_employee()

