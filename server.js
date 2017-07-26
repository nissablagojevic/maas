const express = require('express');
const path = require('path');
const app = express();

if (process.env.NODE_ENV !== 'production') {
    app.use('/', function (err, req, res, next) {
        console.log(process.env.NODE_ENV);
        express.static(path.join(__dirname, 'client/build'))
    });
    app.use('/client/build', function (err, req, res, next) {
        console.log(process.env.NODE_ENV);
        express.static(path.join(__dirname, 'client/build'))
    });
}
else {
    app.use('/maas', function (err, req, res, next) {
        console.log(process.env.NODE_ENV);
        express.static(path.join(__dirname, 'client/build'))
    });
    app.use('/maas/client/build', function (err, req, res, next) {
        console.log(process.env.NODE_ENV);
        express.static(path.join(__dirname, 'client/build'))
    });
}


app.listen(3000);