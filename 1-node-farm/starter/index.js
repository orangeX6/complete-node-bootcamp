//# 6
import { read, readFile, readFileSync, writeFileSync } from "fs";
// const fs = require("fs");

//# 8 Reading and writing files
//  Blocking synchronous way
//? Synchronously reads the entire contents of file
// const textIn = readFileSync("./txt/input.txt", "utf-8");
// const textOut = `This is what we know about the avocado: ${textIn}.
// Created on ${new Date()}`;
// writeFileSync("./txt/output.txt", textOut);
// console.log("File written");

//  Non-blocking, asynchronous way
readFile("./txt/start.txt", "utf-8", (err, data1) => {
  readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
  });
});
console.log("Will read file!");
