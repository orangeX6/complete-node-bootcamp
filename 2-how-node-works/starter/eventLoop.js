//# 30 - 33

const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();
//Changing number of threads
process.env.UV_THREADPOOL_SIZE = 1; //! Won't work on windows

setImmediate(() => console.log('Immediate 1 finished'));
setTimeout(() => console.log('Timer 1 finished'), 0);

fs.readFile('./test-file.txt', () => {
  console.log('I/O Finished');
  console.log('---------------------');

  setTimeout(() => console.log('Timer 2 finished'), 0);
  setTimeout(() => console.log('Timer 3 finished'), 3000);
  setImmediate(() => console.log(`Immediate 2 finished`));

  process.nextTick(() => console.log('Process.nextTick'));

  //USING SYNCHRONOUS CRYPTO - This will block the execution of all the code below
  /*
  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'Password encrypted');
  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'Password encrypted');
  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'Password encrypted');
  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'Password encrypted');
  */

  //ASYNCHRONOUS
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
});

console.log('Hello from the top-level code');
