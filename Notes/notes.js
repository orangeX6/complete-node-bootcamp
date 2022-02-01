//# SECTION 2 - INTRODUCTION TO NODE.JS AND NPM

/*
# 5
-> Node js is a javascript runtime built on google's open source v8 javascript engine.

-> Pros of using node js
>> Single threaded, based on event driven, non-blocking I/O model
>> Perfect for building fast and scalable data-intensive apps
>> Javascript across the entire stack: Faster and more efficient development
>> NPM: huge library of open source packages available for everyone for free
>> Very active development community

# 6 
* index.js
>> to open node terminal, in powershell 
-> node
-> Ctrl+D OR .exit to exit
-> tab + tab to open list of variables available for node
-> _ is your previous result 
? 3*8  //returns 24
? _ + 6 // returns 30
-> String. press tab twice to get list of properties on String

-> To open a js file in node 
-> node index.js 

>> READING FROM A FILE 
-> Node js is built around the concept of modules, where all the additional functionalities are stored in a module.
-> For reading files,it is the fs module
-> We use require keyword to import these modules


#6 Running JS outside Browser
#7 Using Modules 1 - Core Modules
# 8 Reading and writing files
# 9 Blocking and Non-Blocking Async Nature of Node JS
import * as fs from 'fs';
-> We can also use the following to import (PRE ES6) Common js
>> const fs = require("fs");
>> const http = require("http");
-> Then to use it, we use
//* fs.readFile('./txt/input.txt', 'utf-8',(err,data)=> console.log(data))

-> In newer versions of js - we need to specify the following and package.json and import as following
{
  "type": "module"
}
import { readFile, readFileSync, writeFile, writeFileSync } from "fs";
import * as http from "http";

# 11 Creating a Simple Web Server
>> http module - gives us networking capabilities such as building a server
>> url module - gives us capability to analyze the URL

#12 
>> {__dirname} is used in paths so that path is identified correctly even if node is not run from the current working directory

>> writeHead content-type -> 
*  for json - application/json
*  for html - text/html

#METHODS USED 
>> FILE SYSTEM MODULE
-> readFile
-> writeFile
-> readFileSync
-> writeFileSync
-> createServer
* fs.readFile('./txt/input.txt', 'utf-8',(err,data)=> console.log(data)

>> HTTP MODULE 
-> createServer(res,req) 
-> http.createServer().listen

* http.createServer((req,res){
*   res.end
*   res.writeHead(statusCode, {'Content-type':'application/json'})
* })


>> URL MODULE

 #17 Using Modules 2: Our own modules
>> In node js actually, every single file is treated as a module

#18 Introduction to NPM and the package.json file
-> NPM is both the command line interface we used to manage the packages, and also the repository itself.
>> It is the largest software repository.
* npm init

#19 Types of packages and installs
-> There are two types of dependencies.
>> 1. Simple Dependencies 
>> 2. Development Dependencies
 ?? Development dependencies are just tools for development, for example, like a code bundler like Webpack, or a debugger tool for a testing library. They are not needed for production.

-> Installing Slugify - A tool we can use to make more readable urls out of names. 
? This is just a regular dependency i.e. a simple dependency
* npm install slugify

-> Installing nodemon. (Dev dependency) - A tool that helps us to develop node js applications, by automatically restarting the node application, whenever we change the files in the working directory
* npm install nodemon --save-dev
>> To use globally installed dependencies 
? To use locally installed nodemon, specify the command for it in scripts property in package.json
>> Package.json 
*  "scripts": {
*   "start": "nodemon index.js"
* },
>> Then every time we use it, in terminal we use the following command
* npm run start

-> Start is a special command, and so we can just write 
* npm start 

/////////////////////////////////////////////
/////////////////////////////////////////////
-> There are two types of installs in npm 
>> Local install (packages will only work in current project)
>> Global install (packages will work across all the projects on your system)

-> Installing nodemon globally
* npm i nodemon --global
>> To use globally installed dependencies
? Using globally installed nodemon 
* nodemon index.js

! On mac it will give you an error that you dont have permission. In that case - 
* sudo npm i nodemon --global

#20 Using modules 3: Third party modules
* require('slugify')

#21 Package versioning and numbering
-> Most of the packages on npm follow the so-called semantic version notation, which means that their versions numbers is always expressed with these three numbers.
>> The first one here is called the major version. 
? which is only bumped up whenever it is a huge new release which can have breaking changes.
>> The second one is called the minor version.
? The minor version introduces some new features into the package, but it does not include breaking changes. All the changes that are done in a new version number will always be backward-compatible.
>> The third one is called the patch version.
? is only intended to fix bugs. Let's say that in version 1.18, the developers found a bug and so they fixed that bug and then released 1.18.1. Then they found another bug and then they released 1.18.2

-> IMPORTANT!
>> In package.json  - 
*  "devDependencies": {
*    "nodemon": "^2.0.15",
*  }
-> ^ symbolizes that we accept minor changes and bug fixes
-> ~ symbolizes that we only accept patch releases 
-> * symbolizes we accept version changes. 
! Its not a good idea to use *, as it updates major version and it might contain breaking changes

-> Check if we have outdated packages - 
* npm outdated

-> uninstall packages 
* npm uninstall <package-name>

-> install all the dependent npm packages to a project downloaded from github or somewhere 
* npm install

-> ALWAYS SHARE package.json and package-lock.json files

#22 Setting up prettier in VS Code
? Create a config file .prettierrc and configure it there. 

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

# SECTION 3 - INTRODUCTION TO BACK-END WEB DEVELOPMENT
# 25. An Overview of How the Web Works
# 26. HTTP in Action
# 27 Front end vs back end web dev
?? Well a basic server is really just a computer that is connected to the internet which, first, stores a website's files like HTML, CSS, and images, and second, runs an HTTP server that is capable of understanding URLs, requests, and also delivering responses.
// So this piece of HTTP server software is what actually communicates with the browser using requests and responses.Therefore, it is like the bridge between the front-end and the back-end nof a website or web application

# 28 Static vs Dynamic API 


/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

# SECTION 3 - INTRODUCTION TO BACK-END WEB DEVELOPMENT

# 29 
# 30 Node, V8, Libuv and C++
>> 1️⃣ V8 - the V8 engine is what converts JavaScript code into machine code that a computer can actually understand.

>> 2️⃣ libuv - And libuv is an open source library with a strong focus on asynchronous IO.
-> LIBUV IS COMPLETELY WRITTEN IN C++
>> Libuv - Libuv is a library that provides a high-performance event loop for Node.js.
-> This layer is what gives Node access to the underlying computer operating system, file system, networking, and more. Besides that, libuv also implements two extremely important features of Node.JS which are the event loop and also the thread pool.

>> 3️⃣ Node does actually not only rely on V8 and libuv, but also on 
// http-parser for parsing http, 
// c-ares or something like that for some DNS request stuff, 
// OpenSSL for keptography, and also 
// zlib for compression.

# 31. Processes, Threads and the Thread Pool

>> Node JS Process (instance of a program in execution on a computer)
                  ⬇️
  >> Single Thread (Sequence of instructions)
                  ⬇️
  |------------------------------------|
  |       Initialize Program               
  |             ⬇️
  |       Execute Top level Code
  |             ⬇️
  |         Require modules
  |             ⬇️
  |     Register event callbacks
  |             ⬇️
  |        Start event Loop  --------  Thread Pool     
  |             ⬇️
  
 >> Thread Pool - 
  >>👉  Additional 4 threads or more 
  >>👉  Offload work from the event loop
  >>👉  Handle Heavy ('expensive') tasks
      >>👉 File System APIs 
      >>👉 Cryptography
      >>👉 Compression
      >>👉 DNS Lookup
  
IMPORTANT : 
# 32. The Node.js Event Loop 
-> Event Loop - All the application code that is inside callback functions 
>> Node js is built around callback 
>> event driven architecture 
  >> Events are emitted
  >> Event Loops picks them up
  >> Callbacks are called
>> event loop does the orchestration 

-> Event Loop in Detail 
>>                Start
>>                ⬇️               Callback Queues
>>          Expired Timer Callbacks
>>                ⬇️
>>         I/O Polling(looking for I/O events) & 
>>             callbacks 
>>                ⬇️    
>>         Set Immediate Callbacks
>>                ⬇️
>>          Close Callbacks
>>
>>  SPECIAL QUEUES -> 
>>        👉  PROCESS.NEXTTICK() QUEUE
>>        👉  OTHER MICROTASKS QUEUE (Resolved Promises)
-> Process.NextTick() -> basically, process the nextTick() is a function that we can use when we really, really need to execute a certain callback right after the current event loop phase.

>>Dont block the event loop
! Dont use sync versions of functions in fs,crypto,zlib modules in your callback functions
! Dont perform complex calculations (eg. loops inside loops)
! Be Careful with JSON in large objects 
! Don't use too complex regular expressions (Eg. Nested quantifiers)

# 33. The Event Loop in Practice
IMPORTANT 
>> Setting the number of threads on MAC vs WINDOWS 
->>On MAC - In script -> process.env.UV_THREADPOOL_SIZE = 1;
->> On WINDOWS - IN Command Prompt ->set UV_THREADPOOL_SIZE=1 & node eventLoop.js

# 34. Events and Event-Driven Architecture
# 35. Events in Practice
->Event emitters can emit named events and we can then subscribe to these events and then react accordingly
? It is a bit like setting an event listener on DOM element, for eg. when clicking on a button
>>  Event Emitter --emits-event--> Event Listener --calls--> Attached Callback function

-> OBSERVER PATTERN =>
>>    Event Emitter -----------------> Event Listener
?                     Emits event

>> If you are to use this pattern, then its best practice to create a class that will inherit from the node event emitter


# 36. Introduction to Streams
-> Streams - Used to process (read and write) data piece by piece (chunks), without completing the whole read or write operation, and therefore without keeping all the data in memory
>> Streams are instances of the EventEmitter class


-> TYPES OF STREAMS 
>>👉  Readable streams - Streams from which we can read data 
>>        Example - http requests, fs read streams
>>        Important Events - data,end
>>        Important Functions - pipe(),read()

>>👉  Writable Streams - Streams to which we can write data
>>        Example - http responses, fs write streams
>>        Important Events - drain, finish
>>        Important Functions - write(), end()

>>👉  Duplex Streams - Streams that are both readable & writable
>>        Example - net Web Sockets

>>👉  Transform Streams - Duplex streams that transform data as it is read or written
>>        Example - zlib Gzip creation        

# 37. Streams in Practice

# 38. How Requiring Modules Really Works

# 39. Requiring Modules in Practice

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

# NPM COMMANDS 
* Ctrl+D OR .exit to exit
* tab + tab to open list of variables available for node
* _ is your previous result 
? 3*8  //returns 24
? _ + 6 // returns 30
* String. press tab twice to get list of properties on String
* node index.js -> To open a js file in node   


* npm init
* npm install nodemon --save-dev
* npm install slugify
? To use locally installed nodemon, specify the command for it in scripts property in package.json
>> Package.json 
*  "scripts": {
*   "start": "nodemon index.js"
* },
>> Then every time we use it, in terminal we use the following command
* npm run start
-> Start is a special command, and so we can just write 
* npm start 
-> Installing nodemon globally
* npm i nodemon --global
>> To use globally installed dependencies
? Using globally installed nodemon 
* nodemon index.js
* sudo npm i nodemon --global
-> Check if we have outdated packages - 
* npm outdated
-> uninstall packages 
* npm uninstall <package-name>
-> install all the dependent npm packages to a project downloaded from github or somewhere 
* npm install

*/
