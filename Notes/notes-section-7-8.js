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

#   73. Creating a Local Database
>> Switch to a db or create it if it does'nt exist -> 
* use natours-test

>> Creating Collection and inserting docs(tables in RD terms)
* db.tours.insertOne({name:"The Forest Hiker", price: 297, rating:4.7})

>> Inserting multiple docs
* db.tours.insertMany([{name:"The Sea Explorer", price: 497, rating: 4.8},{name:"The Snow Adventurer", price: 997, rating: 4.9, difficulty: "easy"}])

>> List dbs
* show dbs

>> Switch db
* use admin

>> List Collections in db 
* show collections

>> Quit mongo
* quit()
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

#   74. CRUD: Creating Documents
>> Create multiple documents
* db.tours.insertMany([{name:"The Sea Explorer", price: 497, rating: 4.8},{name:"The Snow Adventurer", price: 997, rating: 4.9, difficulty: "easy"}])

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
#   75. CRUD: Querying (Reading) Documents
>> get all docs in collection
* db.tours.find()

>> Search by name
* db.tours.find({name:"The Forest Hiker"})
* db.tours.find({difficulty:"easy"})

>> Tours with price below 500
-> $ is used for mongo db operators 
-> lte stands for less than or equal to
* db.tours.find({price: {$lte: 500}})

>> Price less than 500 AND rating greater than or equal to 4.8
-> lt: less than
-> gte: greater than or equal to
* db.tours.find({price: {$lt: 500}, rating: {$gte: 4.8}})

>> Price less than 500 OR rating greater than or equal to 4.8
* db.tours.find({$or: [{price: {$lt: 500}},{rating: {$gte: 4.8}} ] })

>> Price greater than 500 OR rating greater than or equal to 4.8
* db.tours.find({$or: [ {price:{$gt:500}}, {rating:{$gte:4.8}} ] })

>> Besides our filter object in find, we can also add projection object. 
>> Projection means we simply want to select some of the fields in output. 
* db.tours.find({$or: [ {price:{$gt:500}}, {rating:{$gte:4.8}} ] }, {name:1})
-> OUTPUTS only name and no other property
?   { "_id" : ObjectId("61fb8ed0999544e8adb99142"), "name" : "The Sea Explorer" }
?   { "_id" : ObjectId("61fb8ed0999544e8adb99143"), "name" : "The Snow Adventurer" }

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
#   76. CRUD: Updating Documents
>> Update a document 
* db.tours.updateOne({name: "The Snow Adventurer"}, {$set: {price: 597}})
? If this query would have matched multiple documents, then only the first one would have been updated. So if our query is matching multiple documents, then we should use updateMany instead of updateOne

>> Creating a new property for a document if price > 500 and rating >= 4.8
* db.tours.updateMany({price: {$gt:500}, rating:{$gte:4.8}} , { $set: {premium: true}})

>> Completely replace part of document - 
? SIMILAR TO ABOVE i.e. updateOne and updateMany
* db.tours.replaceOne()
* db.tours.replaceMany()
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
#   77. CRUD: Deleting Documents
>> Delete all tours which have ratings less than 4.8
* db.tours.deleteMany({rating: {$lt:4.8}})

>> Deleting all the documents 
* db.tours.deleteMany({})
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
#   78. Using Compass App for CRUD Operations
#   79. Creating a Hosted Database with Atlas
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

#   80. Connecting to Our Hosted Database
-> MONGO SHELL CONNECTION LINK
// mongo "mongodb+srv://cluster0.nawvt.mongodb.net/myFirstDatabase" --username pranav

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////

# SECTION 8 - USING MONGO DB WITH MONGOOSE
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////

#   81. Section Intro
#   82. Connecting Our Database with the Express App
#   83. What Is Mongoose?
#   84. Creating a Simple Tour Model
#   85. Creating Documents and Testing the Model
#   86. Intro to Back-End Architecture: MVC, Types of Logic, and More
#   87. Refactoring for MVC
#   88. Another Way of Creating Documents
#   89. Reading Documents
#   90. Updating Documents
#   91. Deleting Documents
#   92. Modelling the Tours
#   93. Importing Development Data
#   94. Making the API Better: Filtering
#   95. Making the API Better: Advanced Filtering
#   96. Making the API Better: Sorting
#   97. Making the API Better: Limiting Fields
#   98. Making the API Better: Pagination
#   99. Making the API Better: Aliasing
#   100. Refactoring API Features
#   101. Aggregation Pipeline: Matching and Grouping
#   102. Aggregation Pipeline: Unwinding and Projecting
#   103. Virtual Properties
#   104. Document Middleware
#   105. Query Middleware
#   106. Aggregation Middleware
#   107. Data Validation: Built-In Validators
#   108. Data Validation: Custom Validators
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

#   82. Connecting Our Database with the Express App

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// Connecting to db on aws 
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`DB connection successful!`));

//Connecting on db in local machine 
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`DB connection successful!`));
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

#   83. What Is Mongoose?
-> Mongoose is an Object Data Modeling(ODM) library for mongoDB and Node.js, a higher level of abstraction

>> Object Data Modeling library is just a way for us to write javascript code that will then interact with the database

-> Mongoose allows for rapid and simple development of mongoDB database interactions 

-> Features 
>> schemas to model data and relationships
>> easy data validation
>> simple query API
>> middleware, etc.

>> Mongoose Schema - where we model our data, by describing the structure of the data, default values and validation

>> Mongoose Model - A wrapper for the schema, providing an interface to the database for CRUD operations

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
#   84. Creating a Simple Tour Model
#   85. Creating Documents and Testing the Model

>> So, Mongoose is all about models, and a model is like a blueprint that we use to create documents. So it's a bit like classes in JavaScript, which we also kind of use as blueprints in order to create objects
-> Naming  Convention
>> The name of the model must be capital

//Creating Schema 

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

// CREATING MODEL 
const Tour = mongoose.model('Tour', tourSchema);

// Creating a Document from model 
const testTour = new Tour({
  name: 'The Park Camper',
  price: 997,
});

// Save document to tours collection
testTour
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.error(`ERROR:💥💥💥 ${err}`));

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

#   86. Intro to Back-End Architecture: MVC, Types of Logic, and More
#   87. Refactoring for MVC

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

#   88. Another Way of Creating Documents
-> Ways to create documents 

//Solution 1 
* const newTour = new Tour({})
* newTour.save()

//Solution 2 
* Tour.create({})

#   89. Reading Documents
* Tour.find()
* Tour.findById(req.params.id)
// findById is just a helper function for  
* Tour.findOne({ _id: req.params.id })

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

IMPORTANT
IMPORTANT
IMPORTANT
#   93. Importing Development Data
-> Creating a script that will automatically import all the data from a json file to our db
>> Not part of app. 
IMPORTANT -> PRESENT IN DATA FOLDER
-> RUN importData() IF --import
>> IN Script 
*   console.log(process.argv);
>>In TERMINAL
* node .\dev-data\data\import-dev-data.js --import
>> OUTPUTS 
*   [  'C:\\Program Files\\nodejs\\node.exe',
*   'D:\\Projects\\Udemy\\complete-node-bootcamp\\4-natours\\natours\\dev-data\\data\\import-dev-data.js',
*  '--import'
*   ]


// RUN deleteData() IF --import
//node .\dev-data\data\import-dev-data.js --delete


/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////


#   94. Making the API Better: Filtering
>>in Mongoose, there are actually two ways of writing database queries. 
? The first one is to just use filter object
*  const tours = await Tour.find({
*      duration: 5,
*     difficulty: 'easy',
*    });

? The second way is to use some special Mongoose methods.
* const query = Tour.find()
*   .where('duration')
*   .equals(5)
*   .where('difficulty')
*   .equals('easy');

* const tours = await query;
*   
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

#   95. Making the API Better: Advanced Filtering
>> Implementing queries for the greater than, the greater or equal than, the less than, and the less or equal than operators. So instead of just having equal, we want to actually be able to, for example, say duration greater or equal than five.
-> In Postman 
* 127.0.0.1:3000/api/v1/tours?duration[gte]=5&difficulty=easy&page=3&limit=10&sort=1
? gte is greater than or equal to
? logging the req.body to the console gives 
*   {
*     duration: { gte: '5' },
*     difficulty: 'easy',
*     page: '3',
*     limit: '10',
*     sort: '1'
*   }

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

#   96. Making the API Better: Sorting
>> API call
// Ascending Order 
127.0.0.1:3000/api/v1/tours?sort=price

//Descending Order (add minus)
127.0.0.1:3000/api/v1/tours?sort=-price

// second criteria 
127.0.0.1:3000/api/v1/tours?sort=-price,-ratings
-> in mongoose 
* sort('price ratingsAverage')

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
#   97. Making the API Better: Limiting Fields
>> API Call  
127.0.0.1:3000/api/v1/tours?fields=name,duration,difficulty,price

// DISPLAY ONLY SELECTED FIELDS
 if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
// DONT DISPLAY A PARTICULAR FIELD (adding -)
    } else {
      query = query.select('-__v');
    }


/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
#   98. Making the API Better: Pagination
>>API Call
* 127.0.0.1:3000/api/v1/tours?page=2&limit=25

>>in controller
>>>so lets say if user wants 10 results on page 1 and 10 on page 2. so on page2 we skip the first 10 results while displaying the next 10 
-> page=2&limit=10, 1-10 page 1, 11-20 page 2 ...
* query = query.skip(10).limit(10);
? here limit is the amount of results.
? skip is the amount of results that should be skipped before querying data


/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
#   100. Refactoring API Features
IMPORTANT Explanation of code in APIFeatures Class created
-> the APIFeatures class expects a mongoose query object as an input. The way we create a query object is by creating a query with Tour.find(), but not executing the query right away, so not using await on it (in case we're using async/await like we do in the course).
>>Again, by doing this, we end up with a query object onto which we can then chain other methods, such as sort, or another find, as you posted in your example:
* this.query.find(JSON.parse(queryStr))
-> Keep in mind that here, inside the class, this.query is the query object we created in the beginning, so it's like having:
* Tour.find().find(JSON.parse(queryStr))
>>And yes, that is totally acceptable. Again, because the query has not yet executed, it didn't return the actual results yet. That's what we do in the end, which is the reason why in the end we have to use
* const tours = await features.query;

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
#   101. Aggregation Pipeline: Matching and Grouping
#   102. Aggregation Pipeline: Unwinding and Projecting
#   103. Virtual Properties
#   104. Document Middleware
#   105. Query Middleware
#   106. Aggregation Middleware
#   107. Data Validation: Built-In Validators
#   108. Data Validation: Custom Validators
*/
