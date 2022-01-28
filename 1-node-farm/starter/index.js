const fs = require("fs");
const http = require("http");
const url = require("url");

// import { readFile, readFileSync, writeFile, writeFileSync } from "fs";
// import * as http from "http";
// import * as url from "url";

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
//-> MODULES
//#6 Running JS outside Browser
//#7 Using Modules - Core Modules
//import * as fs from 'fs';
//-> We can also use the following to import (PRE ES6) Common js
//>> const fs = require("fs");
//>> const http = require("http");
//-> Then to use it, we use
//* fs.readFile('./txt/input.txt', 'utf-8',(err,data)=> console.log(data))

//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
//-> FILES
//# 8 Reading and writing files
//# 9 Blocking and Non-Blocking Async Nature of Node JS
/*
//  Blocking synchronous way
//? Synchronously reads the entire contents of file
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
const textOut = `This is what we know about the avocado: ${textIn}.
Created on ${new Date()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File written");
*/

//# 10 Reading and writing files asynchronously
/*
//  Non-blocking, asynchronous way
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.error(`${err.message} 💥🤯💥🤯`);
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("The file has been saved!");
      });
    });
  });
});
*/

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
//-> SERVER
//# 11 Creating a Simple Web Server
//# 12 Routing
//>> http module - gives us networking capabilities such as building a server

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
  // console.log(res);
  console.log(req.url);
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the overview");
  } else if (pathName === "/product") {
    res.end("This is the product");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "random-header": "hello-world",
    }); // check network tab as u reload
    res.end("<h1>Page not found!</h1>");
    // throw new Error("Page not found XOXO");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("listening to request on port 8000");
});
