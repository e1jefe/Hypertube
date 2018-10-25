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

let savedVideos = './videos';
let torrentHash = {};
let currentMovieUrl = '';
let currentIMDB = '';

fs.exists(savedVideos, (exists) => {
    if (!exists) fs.mkdirSync(savedVideos);
});

app.get('/', function (req, res) {
    let torrentInfo = [];
    request('https://yts.am/api/v2/list_movies.json?sort_by=rating', function (movie_count, limit, movies, page_number) {
        let message = JSON.parse(movies);
        let films = '';
        message.data.movies.forEach(function (item) {
            if (films.length > 0) {
                torrentHash[item.id] = {
                    'url': item.torrents[0].url.split('/')[5],
                    'imdb': item.imdb_code
                };
                torrentInfo.push(
                    {
                        'href': 'http://localhost:3000/movie/' + item.id,
                        'id': item.id,
                        'src': item.medium_cover_image,
                        'year': item.year,
                        'imdb_rating': item.rating,
                        'genres': item.genres,
                        'name': item.title_english
                    }
                );
            }
            else {
                torrentHash[item.id] = {
                    'url': item.torrents[0].url.split('/')[5],
                    'imdb': item.imdb_code
                };
                torrentInfo.push(
                    {
                        'href': 'http://localhost:3000/movie/' + item.id,
                        'id': item.id,
                        'src': item.medium_cover_image,
                        'year': item.year,
                        'imdb_rating': item.rating,
                        'genres': item.genres,
                        'name': item.title_english
                    }
                );
            }
        });
        res.send(torrentInfo);
    });
});

app.get('/movie/:id', function (req, res) {
    if (!torrentHash[req.params.id]) {
        request('https://yts.am/api/v2/movie_details.json?movie_id=' + req.params.id, function (req, res) {
            if (res.body) {
                let movieInfo = JSON.parse(res.body);
                if (movieInfo.data.movie.torrents) {
                    currentMovieUrl = movieInfo.data.movie.torrents[0].url.split('/')[5];
                    currentIMDB = movieInfo.data.movie.imdb_code;

                    torrentHash[movieInfo.data.movie.id] = {
                        'url': movieInfo.data.movie.torrents[0].url.split('/')[5],
                        'imdb': movieInfo.data.movie.imdb_code
                    };
                }
            }
        });
        setTimeout(function () {
            if (torrentHash[req.params.id]) {
                currentMovieUrl = torrentHash[req.params.id].url;
                currentIMDB = torrentHash[req.params.id].imdb;
                stream.magnetUrl(req, res, currentMovieUrl);
            }
            else {
                res.send("error");
            }
        }, 1000);
    }
    else {
        currentMovieUrl = torrentHash[req.params.id].url;
        currentIMDB = torrentHash[req.params.id].imdb;
        stream.magnetUrl(req, res, currentMovieUrl);
    }
});

app.get('/movie/:id/:quality', function (req, res) {
    let quality = 0;
    if (req.params.quality === "720") {
        quality = 0;
    }
    else {
        quality = 1;
    }
    request('https://yts.am/api/v2/movie_details.json?movie_id=' + req.params.id, function (req, res) {
        if (res.body) {
            let movieInfo = JSON.parse(res.body);
            if (movieInfo.data.movie.torrents) {
                currentMovieUrl = movieInfo.data.movie.torrents[quality].url.split('/')[5];
                currentIMDB = movieInfo.data.movie.imdb_code;

                torrentHash[movieInfo.data.movie.id] = {
                    'url': movieInfo.data.movie.torrents[quality].url.split('/')[5],
                    'imdb': movieInfo.data.movie.imdb_code
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
    request('https://yts.am/api/v2/movie_details.json?movie_id=' + req.params.id, function (req, res) {
        if (res.body) {
            let movieInfo = JSON.parse(res.body);
            if (movieInfo.data.movie.yt_trailer_code) {
                let response = {url: movieInfo.data.movie.yt_trailer_code};
                tmpRes.send(response)
            }
        }
    });
});

app.get('/subtitles/en/:id', function (req, res) {
    subtitles.getEnglishSubtitles(res, currentIMDB, req.params.id);
});

app.get('/subtitles/ru/:id', function (req, res) {
    subtitles.getRussianSubtitles(res, currentIMDB, req.params.id);
});

schedule.scheduleJob('*/1 * * * *', function() {
    request('http://localhost:8000/api/films/return-films', function (req, res) {
        let arr = JSON.parse(res.body);
        arr.forEach(function(i) {
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