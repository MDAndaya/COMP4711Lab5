
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// viewed at http://localhost:8888
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

/**
 * Saves content to artists.json.
 */
app.post('/saveartists', function (req, res) {
    console.log('saving to artist.json');

    var data = JSON.stringify(req.body);
    console.log(data);
    if (data) {
        fs.writeFile('artists.json', data, (err) => {
            if (err) throw err;
            console.log('saved to artists.json');
        });
    }
});

/**
 * Returns content of artists.json.
 */
app.get('/loadartists', function (req, res) {
    console.log('reading artists.json')
    fs.readFile('artists.json', (err, data) => {
        if (err) throw err;
        console.log('Loading artists');
        res.send(data);
    });
});

let port = 8888;
app.listen(port);
console.log('server started\nlistening on port' + port);