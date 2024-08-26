const http = require('http');
const fs = require('fs');

// Create the http server
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('this is home page')
        res.end();
    }else if (req.url === '/about') {
        res.write('this is about page')
        res.end();
    }else if (req.url === '/contact') {
        res.write('this is contact page')
        res.end();
    }else if (req.url === '/file-write') {
        fs.writeFile('demo.txt','Hello World',(err) => {
            if (err) {
                res.write('Failed to write this file');
                res.end();
            }else {
                res.write('This file written successfully!');
                res.end();
            }
        })
    }else {
        res.statusCode = 404;
        res.write('Page Not Found!');
        res.end();
    }
})
server.listen(5500, ()=>{
    console.log('server listening on 5500');
})