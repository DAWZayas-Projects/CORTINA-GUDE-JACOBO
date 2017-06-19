from pymongo import MongoClient


try:
    client = MongoClient()
    db = client.AIPowerDB
    print ("Connected successfully!!!")
except Exception as ex:
    print ("Could not connect to MongoDB: %s" % ex)
client
