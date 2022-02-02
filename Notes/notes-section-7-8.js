/*
# SECTION 7 - INTRODUCTION TO MONGO DB
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////

#   70. What is MongoDB?
#   71. Installing MongoDB on macOS
#   72. Installing MongoDB on Windows
#   73. Creating a Local Database
#   74. CRUD: Creating Documents
#   75. CRUD: Querying (Reading) Documents
#   76. CRUD: Updating Documents
#   77. CRUD: Deleting Documents
#   78. Using Compass App for CRUD Operations
#   79. Creating a Hosted Database with Atlas
#   80. Connecting to Our Hosted Database

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
#   70. What is MongoDB?
-> MongoDB is a so called NoSQL Database

->> Mongo DB is a document database with the scalability and flexibility that you want, with the querying and indexing that you need.

->> Mongo DB uses BSON data format for data storage. It is similar to JSON, but typed.

->> KEY MONGO DB FEATURES _ 
>> Document based 
? Mongo DB stores data in documents(field-value pair data structures)

>> Scalable
? Very easy to distribute data across multiple machines as your users and amount of data grows.

>> Flexibility
? No document data schema required, so each document can have different number and type of fields.

>> Performant
? Embedded data models, indexing, sharding, flexible documents, native duplication, etc.

>> Free and open source
? published under SSPL license


/////////////////////////////////////////////
>> In Mongo, each database can contain one or more collections. 
? Comparing it to the traditional relational database systems, you can think of a collection as a table of data.
>> Then each collection can contain one or more data structures called documents.
? In relational database, a document would be a row in a table. 
>> So each document contains the data about one single entity, for example, one blog post or one user or one review. 
>> The collection is like the parent structure that contains all these entities. For example, a blog collection for all posts, a users collection or a reviews collection.
>> The document has a data format that looks a lot like JSON, which will make our work a lot easier when we start dealing with these documents.

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
*/
