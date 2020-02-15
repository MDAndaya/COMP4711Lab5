
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

app.use(express.static(__dirname + '/public'));
// viewed at http://localhost:8080
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/test', function (req, res) {
    res.sendFile(path.join(__dirname + '/test.json'));

    const data = new Uint8Array(Buffer.from(req.query.artists));
    fs.writeFile('message.txt', data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
});

app.get('/saveartists', function (req, res) {
    // res.sendFile(path.join(__dirname + '/test.json'));

    const data = new Uint8Array(Buffer.from(req.query.artists));
    fs.writeFile('artists.json', data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
});

app.get('/loadartists', function (req, res) {
    // res.sendFile(path.join(__dirname + '/test.json'));
    fs.readFile('artists.json', (err, data) => {
        if (err) throw err;
        console.log(data);
        res.send(data);
    });
});

app.listen(8888);
console.log('server started')