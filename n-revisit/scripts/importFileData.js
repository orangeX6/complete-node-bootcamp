const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../models/tourModel');

dotenv.config({ path: './config.env' });

//CONNECT DB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log('DB Connection Successful!'))
  .catch((err) => console.log(err));

// READ FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

// IMPORT DATA TO DATABASE
const importData = async () => {
  try {
    await Tour.insertMany(tours);
    console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//  Delete all data from collection
const deleteData = async () => {
  try {
    await Tour.deleteMany({});
    console.log('Collection Erased');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// console.log(process.argv);

// RUN importData() IF --import
//node .\scripts\importFileData.js --import
// RUN deleteData() IF --delete
//node .\scripts\importFileData.js --delete
if (process.argv[2] === '--import') importData();
if (process.argv[2] === '--delete') deleteData();

//! COMMENT OUT ALL THE USER MODEL DOCUMENT MIDDLEWARES BEFORE PERFORMING THIS
