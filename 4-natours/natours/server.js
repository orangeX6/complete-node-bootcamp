/*eslint strict: ["error", "global"]*/

'use strict';

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

// console.log(process.env.NODE_ENV);
// console.log(app.get('env'));
// console.log(process.env);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`DB connection successful!`));

const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}. . .`);
});
