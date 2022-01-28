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
#7 Using Modules - Core Modules
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
-> 
*/
