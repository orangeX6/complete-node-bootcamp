const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

// console.log(process.env.NODE_ENV);
// console.log(app.get('env'));
// console.log(process.env);

const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}. . .`);
});
