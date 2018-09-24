const fs = require('fs');
const express = require('express')
const request = require('request');
const path = require('path')
const stream = require('./stream');
const app = express();

app.use(express.static(path.join(__dirname, 'public')))

app.get('/video/:id', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.htm'))
})

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
                stream.magnetUrl(torrentHash[req.params.id], req.params.id);
            }
            else {
                res.send("error");
            }
        }, 1000)
    }
    else {
        stream.magnetUrl(torrentHash[req.params.id], req.params.id);
    }
});

// let magnetUrl = magnetLink(torrentLink, (err, link) => {
//     if (torrentLink === '') return;
//     if(err) throw err;
//     let movie_title = '';
//     let fileSize = 0;
//     let engine = torrentStream(link);
//     engine.on('ready', () => {
//       engine.files.forEach(function (file) {
//                 console.log('after')
//         let fullPath = savedVideos + '/' + file.name;
//         fs.exists(fullPath, (exists) => {
//           if(exists) {
//             console.log("file exists");

//             app.get('/videos', function (req, res) {
//                 const pathToVideo = 'videos/' + file.name;
//                 const stat = fs.statSync(pathToVideo)
//                 const fileSize = stat.size;
//                 const range = req.headers.range;
//                 let videoFormat = file.name.split('.').pop();
//                 if (range) {
//                     const parts = range.replace(/bytes=/, "").split("-")
//                     const start = parseInt(parts[0], 10)
//                     const end = parts[1]
//                         ? parseInt(parts[1], 10)
//                         : fileSize - 1

//                     console.log('start point = ', start)
//                     console.log('end point = ', end)
//                     console.log('file size = ', fileSize)
//                     if (start >= end) {
//                         console.log('error 404 because start >= end')
//                         res.writeHead(404).end();
//                     }
//                     const chunksize = (end - start) + 1;
//                     console.log('chunksize = ', chunksize);
//                     console.log('videoFormat = ', videoFormat)
//                     const file = fs.createReadStream(pathToVideo, {start, end})
//                     const head = {
//                         'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//                         'Accept-Ranges': 'bytes',
//                         'Content-Length': chunksize,
//                         'Content-Type': 'video/' + videoFormat,
//                     }
//                     res.writeHead(206, head)
//                     file.pipe(res)
//                 } else {
//                     console.log('else videoFormat = ', videoFormat)
//                     const head = {
//                         'Content-Length': fileSize,
//                         'Content-Type': 'video/' + videoFormat,
//                     }
//                     res.writeHead(200, head)
//                     fs.createReadStream(pathToVideo).pipe(res)
//                 }
//             })
//         }
//         else {
//             console.log('Фильм скачивается с торрента')
//             movie_title = file.name
//             let videoFormat = file.name.split('.').pop();
//             if (videoFormat === 'mp4' || videoFormat === 'mkv' || videoFormat === 'ogg' || videoFormat === 'webm') {
//               let currentStream = file.createReadStream();
//               currentStream.pipe(fs.createWriteStream(savedVideos + '/' + file.name));

//               app.get('/videos', function (req, res) {
//                 const pathToVideo = 'videos/' + file.name;
//                 const stat = fs.statSync(pathToVideo)
//                 fileSize = file.length;
//                 const range = req.headers.range;
//                 let videoFormat = file.name.split('.').pop();
//                 let start = 0;
//                 let end = fileSize - 1;


//                 console.log('Я зашел в папку с видео\nПуть к видеофайлу: ', pathToVideo, '\nРазмер файла:', fileSize, 'байт', '\nФормат видео: ', videoFormat);
//                 if (range) {

//                 let range = req.headers.range;
//                 let parts = range.replace(/bytes=/, '').split('-');
//                 let newStart = parts[0];
//                 let newEnd = parts[1];
//                 start = parseInt(newStart, 10);

//                 if (!newEnd) {
//                     end = start + 100000000 >= fileSize ? fileSize - 1 : start + 100000000;
//                 }
//                 else
//                     end = parseint(newEnd, 10);
//                 let chunksize = end - start + 1;
//                 let head = {
//                     'Content-Range': 'bytes ' + start + '-' + end + '/' + fileSize,
//                     'Accept-Ranges': 'bytes',
//                     'Content-Length': chunksize,
//                     'Content-Type': 'video/' + videoFormat,
//                     Connection: 'keep-alive'
//                 }
//                 res.writeHead(206, head);

//                 let stream = file.createReadStream({
//                     start: start,
//                     end: end
//                 });
//                 pump(stream, res);
//                 } else {
//                   console.log('play')
//                     const head = {
//                         'Content-Length': fileSize,
//                         'Content-Type': 'video/' + videoFormat,
//                     }
//                     res.writeHead(200, head)
//                     fs.createReadStream(pathToVideo).pipe(res)
//                 }
//                 })
//           }
//           }
//         });
//  engine.on('download', () => {
//             console.log(movie_title.slice(0, -4), Math.trunc(engine.swarm.downloaded / fileSize * 100) + '%');
//         })
//   });
//   })
// })


app.listen(3000, function () {
    console.log('Listening on port 3000!')
})