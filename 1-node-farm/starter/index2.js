const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

//-> 3. SIMPLE WEB SERVER
//#SERVER
// READING HTML FILES
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
let templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);

// READING DATA OBJECT
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// SLUGIFY PRODUCT NAME
dataObj.forEach(
  (data) => (data.slug = slugify(data.productName, { lower: true }))
);
// dataObj.forEach((data) => console.log(data.slug));

// SERVER START
http
  .createServer((req, res) => {
    // console.log(req.url);
    const { query, pathname: path } = url.parse(req.url, true);
    // console.log(url.parse(req.url, true));

    //  Overview Page
    if (path === '/overview' || path === '/') {
      res.writeHead(200, { 'content-type': 'text/html' });

      const cardHTML = dataObj.reduce(
        (str, data) => (str += replaceTemplate(templateCard, data)),
        ''
      );
      const output = templateOverview.replace(/{%PRODUCT_CARDS%}/g, cardHTML);
      res.end(output);

      //  Product Page (USING QUERY)
      // } else if (path === '/product') {
      //   res.writeHead(200, { 'content-type': 'text/html' });

      //   const productHTML = replaceTemplate(
      //     templateProduct,
      //     dataObj.at(query.id)
      //   );

      //   res.end(productHTML);

      //  Product Page (USING SLUG)
    } else if (path.split('/').at(1) === 'product') {
      res.writeHead(200, { 'content-type': 'text/html' });

      const data = dataObj.find((data) => data.slug === path.split('/').at(2));

      const productHTML = replaceTemplate(templateProduct, data);

      res.end(productHTML);

      //  Get API
    } else if (path === '/api') {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(data);

      //  Error
    } else {
      res.writeHead(404, ' Page not found', {
        'Content-type': 'text/html',
        'my-own-header': 'hello-world',
      });
      res.end('Page cannot be found!!!');
    }
  })
  .listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
  });

// server.listen(8000, '127.0.0.1', () => {
//   console.log('Listening to requests on port 8000');
// });

////////////////////////////////////////
//# FILES
//-> 1. SYNCHRONOUS READING/ WRITING FILE
// const avocado = fs.readFileSync('./txt/input.txt', 'utf-8');

// let options = {
//   day: 'numeric',
//   month: 'numeric',
//   year: '2-digit',
//   hour: 'numeric',
//   minute: 'numeric',
//   dayPeriod: 'short',
//   // timeZone: 'Asia/Calcutta',
//   // timeZone: 'Europe/Berlin',
//   // weekday: 'short',
// };

// const date = new Intl.DateTimeFormat('en-IN', options).format(new Date());

// const textOut = `This is what we know about the Avocado - ${avocado}
// Create at ${date}`;

// console.log(textOut);
// fs.writeFileSync('./txt/output.txt', textOut);

//-> 2 . ASYNCHRONOUS READING/ WRITING FILE

// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//   if (err) return console.log(`ERROR!💥💥💥 ${err.message} `);
//   fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
//     fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
//         console.log('done');
//       });
//     });
//   });
// });

// console.log('will read file');

//-> 4 NPM UPDATES
/*
slugify:"^1.3.4" 
slugify:"~1.3.4" 
1: major version (can be breaking)
3: minor updates
4: bug fixes
^ : accept all the patch and minor releases 
~ : only accept patch releases

npm outdated (to check outdated packages)
npm update (to update all packages)
npm uninstall package-name (to uninstall a package)
*/
