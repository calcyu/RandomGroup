const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url.startsWith("/names.json")) {
        const file = fs.readFileSync(path.resolve(__dirname, 'names.txt'));
        const str = Buffer.from(file).toString();
        // console.log(str + "");
        const pattern = /.+/g;
        const names = str.match(pattern);
        const leader = [];
        const member = [];
        names.forEach((n) => {
            if (n.indexOf("*") >= 0) {
                leader.push(n);
            } else {
                member.push(n);
            }
        })
        res.setHeader('content-type','application/json;charset=utf8');
        res.end(JSON.stringify({ "leader": leader, "member": member }));
    } else {
        let fileName = req.url.substring(1);
        if (!fileName) {
            fileName = "index.html";
        }
        const file = fs.readFileSync(path.resolve(__dirname, fileName))
        if (file) {
            res.statusCode = 200;
            if (fileName.endsWith('.css')) {
                res.setHeader('content-type', 'text/css');
            }
            res.end(file)
        } else {
            res.statusCode = 404;
            res.end('file not found!');
        }
    }
})

server.listen(5555, 'localhost', () => {
    console.log('http://localhost:5555');
})