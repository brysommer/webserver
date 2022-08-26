const http = require('http');
const url = require('url');
const axios = require('axios');
const fs = require('fs')
const mime = require('mime-types')
const obj = {
    firstName: 'Fred',
    lastName: 'Flintstone',
}

http.createServer((req, res) => {
    console.log('Reqest', req.url);
    const { pathname } = url.parse(req.url);

    if( pathname === '/') {
        res.statusCode = 200;
        res.end(`<h1>Hello</h1>`);  
    } else if( pathname === '/objjson') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(obj));
        
    } else if( pathname === '/file') {
        if ( mime.contentType('2.jpg') === 'image/jpeg' ) {
            res.writeHead(200, { 'Content-Type': `${mime.contentType('2.jpg')}` });
            console.log(mime.contentType('2.jpg'))
            fs.createReadStream('./2.jpg').pipe(res);
        } else {
            res.writeHead(200, { 'Content-Type': `${mime.contentType('2.jpg')}`, "Content-Disposition": "attachment; filename=6.jpg" });
            console.log(mime.contentType('2.jpg'))
            fs.createReadStream('./2.jpg').pipe(res);
        }
        
    }
     else {
        res.statusCode = 404;
        res.end(`<h1>Not found</h1>`);
    }
}).listen(3000);

// protocol://domain:port/path?qwery
// http://google.com:3000/123?a=15&b=10


