const srt2vtt = require('srt-to-vtt');
const downloadSubFromUrl = require('download-file')
const fs = require('fs');
const OS = require('opensubtitles-api');
const OpenSubtitles = new OS({
    useragent: 'TemporaryUserAgent'
});

module.exports = {
    getSubtitles: function (res, imdb) {
        OpenSubtitles.search({
            sublanguageid: 'all',
            imdbid: imdb,
        }).then(subtitles => {
            convertSubtitles(res, subtitles);
            // downloadSubFromUrl(subtitles.en.filename, subtitles.en.url)
            // console.log(subtitles.ru.url);

        }).catch((err) => {
            console.log(err);
        });
    }
};


function convertSubtitles(res, subtitleInfo) {
    let filename = '';
    if (subtitleInfo.en) {
        let downloadUrl = subtitleInfo.en.url;
        filename = subtitleInfo.en.filename;
        let options = {
            directory: "./subtitles/",
            filename: filename,
            extensions: ['srt']
        };
        downloadSubFromUrl(downloadUrl, options, function (err) {
            if (err) throw err;
            fs.closeSync(fs.openSync('./srt/' + filename, 'w'));
            fs.createReadStream('./srt/' + filename)
                .pipe(srt2vtt())
                .pipe(fs.createWriteStream('./subtitles/' + 'en_' + filename.slice(0, -4) + '.vtt'));
            res.send('OK');
        })
    }
    else if (subtitleInfo.ru) {
        let downloadUrl = subtitleInfo.ru.url;
        filename = subtitleInfo.ru.filename;
        let options = {
            directory: "/subtitles/",
            filename: filename,
            extensions: ['srt']
        };
        downloadSubFromUrl(downloadUrl, options, function (err) {
            if (err) throw err;
            fs.closeSync(fs.openSync('./srt/' + filename, 'w'));
            fs.createReadStream('./srt/' + filename)
                .pipe(srt2vtt())
                .pipe(fs.createWriteStream('./subtitles/' + 'ru_' + filename.slice(0, -4) + '.vtt'));
            res.send('OK');
        })
    }
    else {
        res.send('no subtitles');
    }
}