const magnetLink = require('magnet-link');
const torrentStream = require('torrent-stream');
const fs = require('fs');
const express = require('express');
const pump = require('pump');
const app = express();

let savedVideos = './videos';

module.exports = {
    magnetUrl: function (torrentLink) {
        magnetLink(torrentLink, (err, link) => {
            if (err) throw err;
            let movie_title = '';
            let engine = torrentStream(link);
            engine.on('ready', () => {
                let fileSize = undefined;
                engine.files.forEach(function (file) {
                    console.log('after');
                    let fullPath = savedVideos + '/' + file.name;
                    fs.exists(fullPath, (exists) => {
                        if (exists) {
                            console.log("file exists");
                            app.get('/video/:id', function (req, res) {
                                const pathToVideo = 'videos/' + file.name;
                                const stat = fs.statSync(pathToVideo)
                                fileSize = stat.size;
                                const range = req.headers.range;
                                let videoFormat = file.name.split('.').pop();
                                if (range) {
                                    const parts = range.replace(/bytes=/, "").split("-")
                                    const start = parseInt(parts[0], 10);
                                    const end = parts[1]
                                        ? parseInt(parts[1], 10)
                                        : fileSize - 1;

                                    console.log('start point = ', start);
                                    console.log('end point = ', end)
                                    console.log('file size = ', fileSize);
                                    if (start >= end) {
                                        console.log('error 404 because start >= end')
                                        res.writeHead(404).end();
                                    }
                                    const chunksize = (end - start) + 1;
                                    console.log('chunksize = ', chunksize);
                                    console.log('videoFormat = ', videoFormat)
                                    const file = fs.createReadStream(pathToVideo, {start, end})
                                    const head = {
                                        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                                        'Accept-Ranges': 'bytes',
                                        'Content-Length': chunksize,
                                        'Content-Type': 'video/' + videoFormat,
                                    };
                                    res.writeHead(206, head);
                                    file.pipe(res)
                                } else {
                                    console.log('else videoFormat = ', videoFormat);
                                    const head = {
                                        'Content-Length': fileSize,
                                        'Content-Type': 'video/' + videoFormat,
                                    };
                                    res.writeHead(200, head);
                                    fs.createReadStream(pathToVideo).pipe(res)
                                }
                            })
                        }
                        else {
                            console.log('Фильм скачивается с торрента');
                            movie_title = file.name;
                            let videoFormat = file.name.split('.').pop();
                            if (videoFormat === 'mp4' || videoFormat === 'mkv' || videoFormat === 'ogg' || videoFormat === 'webm') {
                                let currentStream = file.createReadStream();
                                currentStream.pipe(fs.createWriteStream(savedVideos + '/' + file.name));

                                app.get('/video/:id', function (req, res) {
                                    const pathToVideo = 'videos/' + file.name;
                                    console.log(pathToVideo)
                                    fileSize = file.length;
                                    const range = req.headers.range;
                                    let videoFormat = file.name.split('.').pop();
                                    let start = 0;
                                    let end = fileSize - 1;


                                    console.log('Я зашел в папку с видео\nПуть к видеофайлу: ', pathToVideo, '\nРазмер файла:', fileSize, 'байт', '\nФормат видео: ', videoFormat);
                                    if (range) {

                                        let range = req.headers.range;
                                        let parts = range.replace(/bytes=/, '').split('-');
                                        let newStart = parts[0];
                                        let newEnd = parts[1];
                                        start = parseInt(newStart, 10);

                                        if (!newEnd) {
                                            end = start + 100000000 >= fileSize ? fileSize - 1 : start + 100000000;
                                        }
                                        else
                                            end = parseint(newEnd, 10);
                                        let chunksize = end - start + 1;
                                        let head = {
                                            'Content-Range': 'bytes ' + start + '-' + end + '/' + fileSize,
                                            'Accept-Ranges': 'bytes',
                                            'Content-Length': chunksize,
                                            'Content-Type': 'video/' + videoFormat,
                                            Connection: 'keep-alive'
                                        };
                                        res.writeHead(206, head);

                                        let stream = file.createReadStream({
                                            start: start,
                                            end: end
                                        });
                                        pump(stream, res);
                                    } else {
                                        console.log('play');
                                        const head = {
                                            'Content-Length': fileSize,
                                            'Content-Type': 'video/' + videoFormat,
                                        };
                                        res.writeHead(200, head);
                                        fs.createReadStream(pathToVideo).pipe(res)
                                    }
                                })
                            }
                        }
                    });
                    // engine.on('download', () => {
                    //     console.log(movie_title.slice(0, -4), Math.trunc(engine.swarm.downloaded / fileSize * 100) + '%');
                    // })
                });
            })
        })
    }
};