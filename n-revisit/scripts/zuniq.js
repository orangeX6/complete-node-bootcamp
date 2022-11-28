// require and wrapping

// # In JS FILE
/*
console.log(arguments);
console.log(require('module').wrapper);
delete process.env.X;
console.log(app.get('env'));
console.log(process.env);
console.log(process.env.NODE_ENV);
*/

//##############################################
//##############################################
//##############################################
/*
# Command Line
-> IN NODE 14 and ABOVE
* $Env:NODE_ENV='development'; nodemon server.js
* $Env:NODE_ENV='development';$Env:X=23;nodemon server.js
*/

//##############################################
//##############################################
//##############################################

/* 
# Command Line>  node
-> In node command line 
-> Press tab to check all node classes

*/

//##############################################
//##############################################
//##############################################

/*
# Package.json 
>>in package.json
*SET NODE_ENV=development&&nodemon server.js

-> PACKAGE.JSON
* "scripts": {
  *    "start:dev": "nodemon server.js",
  *    "start:prod": "SET NODE_ENV=production&&nodemon server.js"
  *  },
  
 */
//##############################################
//##############################################
//#################MONGOOSE################
//#MONGOOSE
/*
#THIS WORKS TOO 
exports.createTour = (req, res) => {
  Tour.create(req.body, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        status: 'fail',
        message: err.message,
      });
    }

    res.status(201).json({
      status: 'success',
      tour: data,
    });
  });

  #Mongoose automatically parses the date 
  

# QUERY INJECTION

# CROSS SITE SCRIPTING ATTACK

*/
