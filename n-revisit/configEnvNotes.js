/*
-> IN NODE 14 and ABOVE
// delete process.env.X;
// console.log(app.get('env'));
// console.log(process.env);
// console.log(process.env.NODE_ENV);
* $Env:NODE_ENV='development'; nodemon server.js
* $Env:NODE_ENV='development';$Env:X=23;nodemon server.js
>>OR 
>>in package.json
*SET NODE_ENV=development&&nodemon server.js

-> PACKAGE.JSON
* "scripts": {
*    "start:dev": "nodemon server.js",
*    "start:prod": "SET NODE_ENV=production&&nodemon server.js"
*  },
*/
