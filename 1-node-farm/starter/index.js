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
//# 13 Building a Simple API
//# 14 HTML Templating: Building the templates
//# 15 HTML Templating: Filling the templates

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};

// Fetching data from API
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// Creating server
const server = http.createServer((req, res) => {
  const { query, pathname: pathName } = url.parse(req.url, true);
  //console.log(url.parse(req.url, true));

  // Overview Page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
    res.end(output);

    //Product Page
  } else if (pathName === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //API
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // Not Found
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
