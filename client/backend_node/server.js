const path = require('path');
const fs = require('fs');
const express = require('express');
const request = require('request');
const app = express();
const stream = require('./stream');
const subtitles = require('./downloadSubtitles');
var schedule = require('node-schedule');

app.use(express.static(path.join(__dirname, '/tmp')));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('content-type', 'text/vtt');
    next();
});

let torrentHash = {};
let currentMovieUrl = '';
let currentIMDB = '';


app.get('/movie/:id/:quality', function (req, res) {
    let tmpReq = req;
    let quality = req.params.quality + 'p';

    request('https://tv-v2.api-fetch.website/movie/' + req.params.id, function (req, res) {
        if (res.body) {
            let movieInfo = JSON.parse(res.body);
            if (movieInfo.torrents.en) {
                currentMovieUrl = movieInfo.torrents.en[quality].url;
                currentIMDB = movieInfo.imdb_id;
                torrentHash[tmpReq.params.id] = {
                    'url':movieInfo.torrents.en[quality].url,
                    'imdb': movieInfo.imdb_id
                };
            }
        }
    });
    setTimeout(function () {
        if (torrentHash[req.params.id]) {
            currentMovieUrl = torrentHash[req.params.id].url;
            currentIMDB = torrentHash[req.params.id].imdb;
            stream.magnetUrl(req, res, currentMovieUrl, req.params.id, req.params.quality);
        }
        else {
            res.send("error");
        }
    }, 1000);
});

app.get('/youtube/:id', function (req, res) {
    let tmpRes = res;
    request('https://tv-v2.api-fetch.website/movie/' + req.params.id, function (req, res) {
        if (res.body) {
            let movieInfo = JSON.parse(res.body);
            if (movieInfo.trailer) {
                let trailer = movieInfo.trailer.split("=");
                let response = {url: trailer[1]};
                tmpRes.send(response)
            }
            else {
                let response = {url: 'OUMvvYSCnMQ'};
                tmpRes.send(response)
            }
        }
        else {
            let response = {url: 'OUMvvYSCnMQ'};
            console.log("no trailer" , response);
            tmpRes.send(response)
        }
    });
});

app.get('/subtitles/en/:id', function (req, res) {
    let tmpReq = req;
    request('https://tv-v2.api-fetch.website/movie/' + req.params.id, function (req, res) {
        if (res.body) {
            let movieInfo = JSON.parse(res.body);
            currentIMDB = movieInfo.imdb_id;
        }
    });
    setTimeout(function() {
        subtitles.getEnglishSubtitles(res, currentIMDB, tmpReq.params.id);
    }, 2000);
});

app.get('/subtitles/ru/:id', function (req, res) {
    let tmpReq = req;
    let currentIMDB = '';
    request('https://tv-v2.api-fetch.website/movie/' + req.params.id, function (req, res) {
        if (res.body) {
            let movieInfo = JSON.parse(res.body);
            currentIMDB = movieInfo.imdb_id;
        }
    });
    setTimeout(function() {
        subtitles.getRussianSubtitles(res, currentIMDB, tmpReq.params.id);
    }, 2000);
});

schedule.scheduleJob('*/1 * * * *', function () {
    request('http://localhost:8000/api/films/return-films', function (req, res) {
        let arr = JSON.parse(res.body);
        arr.forEach(function (i) {
            fs.exists('/tmp/' + i.id_film, (exists) => {
                if (exists) {
                    fs.unlinkSync('/tmp/' + i.id_film)
                }
            })
        })
    });
});

app.listen(3001, function () {
    console.log('Listening on port ' + '\033[31m' + '3001!' + '\033[0m')
});