/*
* При переходе по адресу http://localhost:3000 собирает информацию о фильмах по дефолту отсортированных по рейтингу, создаются ссылки на эти фильмы
* и при нажатии на любую из них передается айди фильма, который хранится в torrentHash вместе с необходимыми данными, потом
* фильм скачивается и паралельно воспроизводится.
*
* torrentHash - список всех фильмов на странице и infoHash каждого из них.
* savedVideos - путь для сохранения фильмов на сервере.
*
* */

const path = require('path');
const fs = require('fs');
const express = require('express');
const request = require('request');
const stream = require('./stream');
const app = express();

app.use(express.static(path.join(__dirname, 'public')))

// app.get('/video/:id', function(req, res) {
//     res.sendFile(path.join(__dirname + '/index.htm'))
// })

let savedVideos = './videos';
let torrentHash = {};

fs.exists(savedVideos, (exists) => {
    if (!exists) fs.mkdirSync(savedVideos);
});

app.get('/', function (req, res) {
    request('https://yts.am/api/v2/list_movies.json?sort_by=rating', function (movie_count, limit, movies, page_number) {
        let message = JSON.parse(movies);
        let films = '';
        let imgTemplate = function (source, id) {
            return '<a href=\"/video/' + id + '\"><img id=\'' + id + '\'' + 'src=' + source + '></a>';
        };
        message.data.movies.forEach(function (item) {
            if (films.length > 0) {
                torrentHash[item.id] = item.torrents[0].url;
                films = films + imgTemplate(item.medium_cover_image, item.id);
            }
            else {
                torrentHash[item.id] = item.torrents[0].url;
                films = imgTemplate(item.medium_cover_image, item.id);
            }
        });
        res.send(films);
    });
});

app.get('/video/:id', function (req, res) {
    if (!torrentHash[req.params.id]) {
        request('https://yts.am/api/v2/movie_details.json?movie_id=' + req.params.id, function (req, res) {
            if (res.body) {
                let movieInfo = JSON.parse(res.body);
                if (movieInfo.data.movie.torrents) {
                    torrentHash[movieInfo.data.movie.id] = movieInfo.data.movie.torrents[0].url;
                }
            }
        });
        setTimeout(function () {
            if (torrentHash[req.params.id]) {
                stream.magnetUrl(req, res, torrentHash[req.params.id]);
            }
            else {
                res.send("error");
            }
        }, 1000)
    }
    else {
        stream.magnetUrl(req, res, torrentHash[req.params.id]);
    }
});

app.listen(3000, function () {
    console.log('Listening on port 3000!')
});