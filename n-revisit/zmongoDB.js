/*
-> Show all databases
# show dbs
#
-> create or use(switch to) db
# use test-db
# 
-> view all collections
#  show collections
# 
-> Clear shell
#  cls
# 
-> quit mongo shell
#  ctrl C or quit()
# 
-> view all collections
#  show collections
# 
-> view all collections
#  show collections
# 
-> 
#  
#

################################################
>> CRUD OPERATIONS 
-> CREATE 
-> READ
-> UPDATE
-> DELETE

########################
####### CREATE #########
-> insert One document
# db.tours.insertOne({name:"The Forest Hiker", price: 297, rating: 4.7})
# 
-> insert many documents
#  db.tours.insertMany([{ name:"The Sea Explorer", price: 497, rating: 4.8 },{ name:"The Snow Adventurer", price:997, rating: 4.9, difficulty:"easy" }])
#
#

########################
####### READ #########
-> fetch all documents from collection
#  db.tours.find()
# 
>> using SEARCH FILTER
-> fetch document from collection
#  db.tours.find({name:"The Sea Explorer"})
# 
>> using SEARCH FILTER with SEARCH CRITERIA
_ Less than 
-> fetch documents from collection
#  db.tours.find({price: {$lt: 500}})
# 
_ Less than or equal to 
-> fetch documents from collection
#  db.tours.find({price: {$lte: 500}})
# 
_ Greater than
-> fetch documents from collection
#  db.tours.find({price: {$gt: 500}})
# 
_ Greater than or equal to
-> fetch documents from collection
#  db.tours.find({price: {$gte: 500}})
# 
_ Greater than or equal to
-> fetch documents from collection
#  db.tours.find({price: {$gte: 500}})
# 
>> using SEARCH FILTER with MULTIPLE SEARCH CRITERIA
_ Price <= 500 AND rating >= 4.8
-> fetch documents from collection
#  db.tours.find({price:{$lte: 500}, rating:{$gte:4.8}} )
# 
_ Price <= 500 OR rating >= 4.8
-> fetch documents from collection
# db.tours.find({$or:[{price:{$lte:500}},{rating: {$gte:4.8}}]})
# 
_ Price <= 500 OR rating >= 4.8 (only display name and price in output)
-> fetch documents from collection only show specified fields
#  db.tours.find({$or:[{price:{$gt:500}},{rating: {$gte:4.8}}]}, {name:1, price:1} )
# 

########################
####### UPDATE #########
_ UPDATE (PATCH) (Updates the part of the document)
-> update single document (Only the first document matching the query will get updated)
#  db.tours.updateOne({name:"The Snow Adventurer"}, {$set: {price:597}})
# 
-> update multiple documents 
# db.tours.updateMany({ price: {$gt: 500}, rating: {$gt:4.8} }, {$set: {premium: true}})
# 

_REPLACE (PUT) (Completely replace the contents of the document)
-> replace single document
# db.tours.replaceOne({ name: "The Beach Castles" },  {name: "The Cotton Picker", price: 550, rating:4.9 })

########################
####### DELETE #########
-> delete one document
#  db.tours.deleteOne({name:"The Sea Explorer X"})
# 
-> delete multiple documents
#   db.tours.deleteMany({rating:lt: {4.9}})
# 
-> Delete all documents
#  db.tours.deleteMany({})
# 


*/
