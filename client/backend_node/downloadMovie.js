const fs = require('fs');
const headers = require('./headers');

module.exports = {
    downloadAndStream: function (req, res, file, fullPath) {
        let videoFormat = file.name.split('.').pop();
        if (videoFormat === 'mp4' || videoFormat === 'mkv' || videoFormat === 'ogg' || videoFormat === 'webm') {
            let currentStream = file.createReadStream();
            currentStream.pipe(fs.createWriteStream(fullPath));

            const pathToVideo = fullPath;
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
};
