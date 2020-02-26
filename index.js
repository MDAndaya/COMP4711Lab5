
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
app.post('/saveartist', function (req, res) {
    console.log('saving to artist.json');

    var data = (req.body);
    console.log(data);
    if (data) {
        var newData = [];
        fs.readFile('artists.json', (err, oldData) => {
            if (err) throw err;
            newData = JSON.parse(oldData);
            newData.push(data);
            newData = JSON.stringify(newData);

            fs.writeFile('artists.json', newData, (err) => {
                if (err) throw err;
                console.log('saved to artists.json');
                res.send('artist saved');
            });

        });
    }
});

app.post('/deleteartist', function (req, res) {
    console.log('deleting artist from artist.json');

    var data = (req.body);
    console.log(data);
    if (data) {
        var newData = [];
        fs.readFile('artists.json', (err, oldData) => {
            if (err) throw err;

            console.log(JSON.parse(oldData));
            newData = JSON.parse(oldData);
            for (let i = 0; i < newData.length; i++) {
                if (newData[i].name.toLowerCase() == data.name.toLowerCase() &&
                    newData[i].about.toLowerCase() == data.about.toLowerCase()) {
                    newData.splice(i, 1);
                    break;
                }
            }
            newData = JSON.stringify(newData);
            fs.writeFile('artists.json', newData, (err) => {
                if (err) throw err;
                console.log('saved to artists.json');
                res.send('artist deleted');
            });

        });
    }
});

/**
 * Returns content of artists.json.
 */
app.get('/loadartists/', function (req, res) {
    console.log('reading artists.json')
    fs.readFile('artists.json', (err, data) => {
        if (err) throw err;
        console.log('Loading artists');
        res.send(JSON.parse(data));
    });
});

/**
 * Returns content of artists.json.
 */
app.get('/loadartists/:search', function (req, res) {
    console.log('reading artists.json')
    fs.readFile('artists.json', (err, data) => {
        if (err) throw err;
        console.log('Loading artists');

        data = JSON.parse(data);
        console.log('/////////////////////////');
        console.log(data);
        console.log(data[0].name);
        var filteredData = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].name.toLowerCase().includes(req.params.search.toLowerCase())) {
                filteredData.push(data[i]);
            }
        }
        res.send(filteredData);
    });
});

let port = 8888;
app.listen(port);
console.log('server started\nlistening on port' + port);