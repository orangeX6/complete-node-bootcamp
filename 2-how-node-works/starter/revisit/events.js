const http = require('http');
const EventEmitter = require('events');

class Sales extends EventEmitter {
  //   constructor() {
  //     super();
  //   }
}

const emitter = new Sales();

emitter.on('newSale', () => {
  console.log('There was a new Sale');
});

emitter.on('newSale', () => {
  console.log('Customer name : Pranav');
});

emitter.on('newSale', (stock) => {
  console.log(`There are now ${stock} items left`);
});

emitter.on('saleOver', (msg) => {
  console.log(msg);
});

emitter.emit('newSale', 9);

emitter.emit('saleOver', 'Thank you for shopping with us');

/////////////////////////////////////////////////////////////

const server = http.createServer().on('request', (req, res) => {
  console.log(`${req.url} Request Received`);
  res.end('Request Received');
});

server.on('request', (req, res) => {
  console.log(`Another Request Received`);
});

server.on('close', () => {
  console.log('Server closed');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Waiting for requests ...');
});
