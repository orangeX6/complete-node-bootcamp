/*
# SECTION 6 - EXPRESS: LET'S START BUILDING THE NATOURS API!
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

#   48. What is Express?
#   49. Installing Postman
#   50. Setting up Express and Basic Routing
#   51. APIs and RESTful API Design
#   52. Starting Our API: Handling GET Requests
#   53. Handling POST Requests
#   54. Responding to URL Parameters
#   55. Handling PATCH Requests
#   56. Handling DELETE Requests
#   57. Refactoring Our Routes
#   58. Middleware and the Request-Response Cycle
#   59. Creating Our Own Middleware
#   60. Using 3rd-Party Middleware
#   61. Implementing the "Users" Routes
#   62. Creating and Mounting Multiple Routers
#   63. A Better File Structure
#   64. Param Middleware
#   65. Chaining Multiple Middleware Functions
#   66. Serving Static Files
#   67. Environment Variables
#   68. Setting up ESLint + Prettier in VS Code

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

#   48. What is Express?

-> 👉    Express is a minimal node.js framework, a higher level of abstraction.
-> 👉    Express contains a very robust set of features: complex routing, easier handling of requests and responses, middleware, server-side rendering etc.
-> 👉    Express allows for rapid development of node.js applications: we don't have to re-invent the wheel
-> 👉    Express makes it easier to organize our application into the MVC architecture

>> It is 100% written in node.js
>> It is the most popular framework of node.js

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
#   49. Installing Postman
#   50. Setting up Express and Basic Routing
->>Installing express version 4 - npm i express@4 
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
#   51. APIs and RESTful API Design

IMPORTANT 
-> API 
->> API: Application Programming Interface is a piece of software that can be used by another piece of software, in order to allow applications to talk to each other

>> 👉  The application in API can actually mean many different things as long as the piece of software is relatively stand alone.
? 👉  Take for example, the Node File System, or the HTTP Modules. We can say that they are small pieces of software and we can use them, we can interact with them by using their API.

? 👉  For example, when we use the readfile function from the FS Module, we are actually using the FS API. And that's why you will sometimes hear the term node APIs. And that usually simply refers to the core node modules that we can interact with.

? 👉  Or when we do DOM manipulation in the browser, we are not really using the JavaScript language itself, but rather, the DOM API that the browser exposes to us, so it gives us access to it.

? 👉  Or even another example, let's say we create a class in any programming language like Java and then add some public methods or properties to it. These methods will then be the API of each object created from that class because we're giving other pieces of software the possibility of interacting with our initial piece of software, the objects, in this case.

? 👉  You see, API has actually a broader meaning than just building web APIs. Alright? Anyway, a web API is what's most important for us in the context of note.

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

-> REST (Representational State Transfer)
-> REST is basically a way of building web APIs in a logical way, making them easy to consume.

>> To build RESTful APIs, which means APIs following the REST Architecture, we just need to follow a couple of principles.

>>  👉→ Separate our API into logical resources. 
    * Resource: Object or representation of something, which has data associated to it. Any information that can be named can be a resource. 
    ?     Eg. users, reviews, tours
>>  👉→ These resources should then be exposed, which means to be made available using structured resource-based URLs.
    *   Eg. https://www.natours.com/addNewTour <-
    
>>  👉→ Use HTTP methods and not the URL.
    *   Eg. https://www.natours.com/addNewTour 
    *    create            POST    /tours
    *    read              GET     /tours/7
    *    update            PUT     /tours/7
    *    update            PATCH   /tours/7 
    *    delete            DELETE  /tours/7
    * /getToursByUser and /deleteToursByUser
    *    read              GET     /users/3/tours
    *    delete            DELETE  /users/3/tours/9
    -> POST, GET, PUT, PATCH, DELETE are the five HTTP methods that we can and should respond to when building our RESTful APIs so that the client can perform the four basic CRUD operations.
    -> CRUD Stands for Create, Read, Update and Delete
    ? In case of POST, usually no I.D. will be sent because the server should automatically figure out the I.D. for the new resource.
    ? what's really important to note here is how the endpoint name is the exact same name for both GET and POST. The only difference is really the HTP method that is used for the request.
    * If the /tours endpoint is accessed with GET, we send data to the client. But if the same endpoint is accessed with POST, we expect data to come in with a request, so that we can then create a new resource on the server side.

    ?   Both PUT and PATCH has the ability to send data to the server. 
    *   difference between PUT and PATCH 
    ?   with PUT, the client is supposed to send the entire updated object
    ?   with PATCH, the client is supposed to send only the part of object which is changed 

>>  👉→ Send data as JSON 
    * We use some response formatting while sending the data to the user. 
    ? There are a couple of standards. 
    ? One such standard is JSend
    * In JSend - we create a simple object, then add a status message to it in order to inform the client whether the request was a success, fail or error, and we put the original data into a new object called data


>>  👉→ It must be stateless
    -> Stateless RESTful API: All state is handled on the client. This means that each request must contain all the information necessary to process a certain request. The server should not have to remember previous requests.

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


*/
