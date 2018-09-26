const pump = require('pump');

/*
* Когда клиент запрашивает Range bytes мы расчитываем этот диапазон и отправляем ответ сервера 206.
*
* */
let partialContent = function (req, res, start, end, fileSize, file) {
    let range = req.headers.range;
    let parts = range.replace(/bytes=/, '').split('-');
    let newStart = parts[0];
    let newEnd = parts[1];
    start = parseInt(newStart, 10);

    if (!newEnd) {
        end = start + 100000000 >= fileSize ? fileSize - 1 : start + 100000000;
    }
    else
        end = parseInt(newEnd, 10);
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
};

let notPartialContent = function (req, res, fileSize, pathToVideo) {
    const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
    };
    fs.createReadStream(pathToVideo).pipe(res);
    res.writeHead(200, head);
};

/*
* Когда клиент не запрашивает диапазон мы отдаем весь файл и ответ сервера 200.
*
* */
module.exports = {
    partialContent,
    notPartialContent
};