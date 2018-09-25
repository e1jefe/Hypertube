const magnetLink = require('magnet-link');
const torrentStream = require('torrent-stream');
const fs = require('fs');
const pump = require('pump');


let savedVideos = './videos';

module.exports = {
    magnetUrl: function (req, res, torrentLink) {
        magnetLink(torrentLink, (err, link) => {
            if (err) throw err;
            let movie_title = '';
            let engine = torrentStream(link);
            engine.on('ready', () => {
                engine.files.forEach(function (file) {
                    let fullPath = savedVideos + '/' + file.name;
                    fs.exists(fullPath, (exists) => {
                        if (exists) {
                            console.log("file ", file.name, " exists");
                            const pathToVideo = 'videos/' + file.name;
                            const stat = fs.statSync(pathToVideo);
                            let fileSize = file.length;
                            const range = req.headers.range;

                            let start = 0;
                            let end = fileSize - 1;
                            if (range) {
                                console.log("file-size (exists) = ", fileSize);
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
                                    'Content-Type': 'video/mp4',
                                    'Connection': 'keep-alive'
                                };
                                res.writeHead(206, head);

                                let stream = file.createReadStream({
                                    start: start,
                                    end: end
                                });
                                pump(stream, res);
                            } else {
                                const head = {
                                    'Content-Length': fileSize,
                                    'Content-Type': 'video/mp4',
                                };
                                fs.createReadStream(pathToVideo).pipe(res);
                                res.writeHead(200, head);
                            }
                        }
                        else {
                            movie_title = file.name;
                            let videoFormat = file.name.split('.').pop();
                            if (videoFormat === 'mp4' || videoFormat === 'mkv' || videoFormat === 'ogg' || videoFormat === 'webm') {
                                console.log('Фильм скачивается с торрента');
                                let currentStream = file.createReadStream();
                                currentStream.pipe(fs.createWriteStream(savedVideos + '/' + file.name));

                                const pathToVideo = 'videos/' + file.name;
                                let fileSize = file.length;
                                console.log("file-size from torrent file = ", fileSize)
                                const range = req.headers.range;
                                videoFormat = file.name.split('.').pop();
                                let start = 0;
                                let end = fileSize - 1;

                                console.log('Я зашел в папку с видео\nПуть к видеофайлу: ', pathToVideo, '\nРазмер файла:', fileSize, 'байт', '\nФормат видео: ', videoFormat);
                                if (range) {
                                    console.log("file-size = ", fileSize)
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
                                        'Content-Type': 'video/mp4',
                                        'Connection': 'keep-alive'
                                    };
                                    let stream = file.createReadStream({
                                        start: start,
                                        end: end
                                    });
                                    pump(stream, res);
                                    res.writeHead(206, head);
                                } else {
                                    console.log('play');
                                    const head = {
                                        'Content-Length': fileSize,
                                        'Content-Type': 'video/mp4',
                                    };
                                    res.writeHead(200, head);
                                    fs.createReadStream(pathToVideo).pipe(res);
                                }
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