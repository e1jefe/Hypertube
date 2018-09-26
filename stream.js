const magnetLink = require('magnet-link');
const torrentStream = require('torrent-stream');
const fs = require('fs');
const headers = require('./headers');


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
                            const pathToVideo = 'videos/' + file.name;
                            let fileSize = file.length;
                            const range = req.headers.range;

                            let start = 0;
                            let end = fileSize - 1;
                            if (range) {
                                headers.partialContent(req, res, start, end, fileSize, file);
                            } else {
                                headers.notPartialContent(req, res, fileSize, pathToVideo);
                            }
                        }
                        else {
                            movie_title = file.name;
                            let videoFormat = file.name.split('.').pop();
                            if (videoFormat === 'mp4' || videoFormat === 'mkv' || videoFormat === 'ogg' || videoFormat === 'webm') {
                                let currentStream = file.createReadStream();
                                currentStream.pipe(fs.createWriteStream(savedVideos + '/' + file.name));

                                const pathToVideo = 'videos/' + file.name;
                                let fileSize = file.length;
                                const range = req.headers.range;
                                let start = 0;
                                let end = fileSize - 1;

                                if (range) {
                                    headers.partialContent(req, res, start, end, fileSize, file);
                                } else {
                                    headers.notPartialContent(req, res, fileSize, pathToVideo);
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