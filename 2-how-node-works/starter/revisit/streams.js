const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  //->SOLUTION 1
  //   fs.readFile('./../test-file.txt', 'utf-8', (err, data) => {
  //     console.log('reading');
  //     // console.log(data);
  //     res.end(data);
  //   });

  //->SOLUTION 2
  //   const readable = fs.createReadStream('./../test-file.txt');

  //   readable.on('data', (chunk) => {
  //     res.write(chunk);
  //   });

  //   readable.on('end', () => {
  //     res.end();
  //   });

  //   readable.on('error', (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end('File not found');
  //   });

  //->SOLUTION 3

  fs.createReadStream('./../test-file.txt').pipe(res);
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening on ...');
});
