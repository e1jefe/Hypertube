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

app.use(express.static(path.join(__dirname, 'videos')))

let savedVideos = './videos';
let torrentHash = {};
let currentMovie = '';

fs.exists(savedVideos, (exists) => {
    if (!exists) fs.mkdirSync(savedVideos);
});

/*
* Подгружается список фильмов и выводится на страницу.
*
* */
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

/*
* Когда переходим на страницу с видео мы должны подятнуть все данные об этом видео с внешнего ресура.
*
* */
app.get('/video/:id', function (req, res) {
    if (!torrentHash[req.params.id]) {
        request('https://yts.am/api/v2/movie_details.json?movie_id=' + req.params.id, function (req, res) {
            if (res.body) {
                let movieInfo = JSON.parse(res.body);
                if (movieInfo.data.movie.torrents) {
                    currentMovie = movieInfo.data.movie.torrents[0].url;
                    torrentHash[movieInfo.data.movie.id] = movieInfo.data.movie.torrents[0].url;
                }
            }
        });
        setTimeout(function () {
            if (torrentHash[req.params.id]) {
                currentMovie = torrentHash[req.params.id];
                res.sendFile(path.join(__dirname + '/index.htm'))
            }
            else {
                res.send("error");
            }
        }, 1000)
    }
    else {
        currentMovie = torrentHash[req.params.id];
        res.sendFile(path.join(__dirname + '/index.htm'))
    }
});

/*
* Когда подгрузился плеер мы передаем в него видеострим.
*
* */
app.get('/videos', function (req, res) {
    stream.magnetUrl(req, res, currentMovie);
});

app.listen(3000, function () {
    console.log('Listening on port 3000!')
});