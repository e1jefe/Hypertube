const srt2vtt = require('srt-to-vtt');
const downloadSubFromUrl = require('download-file');
const fs = require('fs');
const OS = require('opensubtitles-api');
const OpenSubtitles = new OS({
    useragent: 'TemporaryUserAgent'
});

module.exports = {
    getEnglishSubtitles: function (res, imdb, id) {
        console.log("english subtitles");
        console.log('imdb = ', imdb);
        console.log('id = ', id);
        OpenSubtitles.search({
            sublanguageid: 'all',
            imdbid: imdb,
        }).then(subtitles => {
            console.log('english subtitles found')
            convertSubtitles(res, subtitles, id, 'en');
        }).catch((err) => {
            console.log(err);
        });
    },
    getRussianSubtitles: function (res, imdb, id) {
        console.log("russian subtitles")
        OpenSubtitles.search({
            sublanguageid: 'all',
            imdbid: imdb,
        }).then(subtitles => {
            console.log('russian subtitles found')
            convertSubtitles(res, subtitles, id, 'ru');
        }).catch((err) => {
            console.log(err);
        });
    }
};


function convertSubtitles(res, subtitleInfo, id, language) {
    if (language === 'en') {

        console.log('downloading...');
        fs.exists('./srt/en_' + id + '.srt', (exists) => {
            if (exists) {
                console.log("exists");
                fs.createReadStream('./srt/en_' + id + '.srt')
                    .pipe(srt2vtt())
                    .pipe(res);
            }
            else if (subtitleInfo.en) {
                let downloadUrl = subtitleInfo.en.url;
                let filename = 'en_' + id + '.srt';
                let options = {
                    directory: "./srt/",
                    filename: filename,
                    extensions: ['srt']
                };
                console.log(downloadUrl);
                console.log(filename);
                downloadSubFromUrl(downloadUrl, options, function (err) {
                    if (err) console.log('error = ', err);
                    fs.createReadStream('./srt/' + filename)
                        .pipe(srt2vtt())
                        .pipe(res);
                })
            }
        });
    }
    if (language === 'ru') {
        console.log('downloading...');
        fs.exists('./srt/ru_' + id + '.srt', (exists) => {
            if (exists) {
                fs.createReadStream('./srt/ru_' + id + '.srt')
                    .pipe(srt2vtt())
                    .pipe(res);
            }
            else if (subtitleInfo.ru) {
                let downloadUrl = subtitleInfo.ru.url;
                let filename = 'ru_' + id + '.srt';
                let options = {
                    directory: "./srt/",
                    filename: filename,
                    extensions: ['srt']
                };
                console.log(downloadUrl);
                console.log(filename);
                downloadSubFromUrl(downloadUrl, options, function (err) {
                    if (err) console.log('error = ', err);
                    fs.createReadStream('./srt/' + filename)
                        .pipe(srt2vtt())
                        .pipe(res);
                })
            }
        });
    }
}