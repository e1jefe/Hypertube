const torrentStream = require('torrent-stream');
const fs = require('fs');
const headers = require('./headers');
const download = require('./downloadMovie');

module.exports = {
    magnetUrl: function (req, res, torrentLink) {
        let engine = torrentStream(torrentLink);
        engine.on('ready', () => {
            engine.files.forEach(function (file) {
                let fullPath = '/tmp/' + file.name;
                fs.exists(fullPath, (exists) => {
                    if (exists) {
                        let stat = fs.statSync(fullPath);
                        let sizeOfDownloaded = stat.size;
                        let sizeInTorrent = file.length;

                        //here may be a problem
                        if (sizeOfDownloaded === sizeInTorrent) {
                            const pathToVideo = '/tmp/' + file.name;
                            let fileSize = file.length;
                            const range = req.headers.range;

                            let start = 0;
                            let end = fileSize - 1;
                            if (range)
                                headers.partialContent(req, res, start, end, fileSize, file);
                            else
                                headers.notPartialContent(req, res, fileSize, pathToVideo);
                        }
                        else
                            download.downloadAndStream(req, res, file, fullPath);
                    }
                    else {
                        download.downloadAndStream(req, res, file, fullPath);
                    }
                });
            });
        })
    }
};