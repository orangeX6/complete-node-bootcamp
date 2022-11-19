'use strict';
const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 1;

setImmediate(() => console.log('Immediate 1 finished'));
setTimeout(() => console.log('Timer 1 finished'), 0);

// console.log(__dirname);
fs.readFile(`${__dirname}/../test-file.txt`, 'utf-8', (err, data) => {
  //   console.log(data);
  console.log('Reading file done');
  console.log('🐙🐙🐙🐙🐙🐙🐙');
  setTimeout(() => console.log('Timer 2 finished'), 0);
  setTimeout(() => console.log('Timer 3 finished'), 20);
  setTimeout(() => console.log('Timer 4 finished'), 0);

  setImmediate(() => console.log('Immediate 2 finished'));

  process.nextTick(() => console.log('Process next tick '));
  Promise.resolve('Promise Resolved').then((data) => console.log(data));

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password Encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password Encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password Encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password Encrypted');
  });
});

console.log('YOHOHOHOHOHHOHO');

Promise.resolve('Promise Resolved').then((data) => console.log(data));
process.nextTick(() => console.log('Process next tick OUT '));

// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another Success'),
//   Promise.resolve('Success'),
// ]).then((res) => console.log(...res));

//   console.log(`Test Start`);
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });
// console.log('Test end');

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem!')).then(x => console.error(x));
