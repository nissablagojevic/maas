const express = require('express');
const path = require('path');
const app = express();

if (process.env.NODE_ENV !== 'production') {
    app.use('/', express.static(path.join(__dirname, 'client/build')));
    app.use('/*', express.static(path.join(__dirname, 'client/build')));
}
else {
    app.use('/maas', express.static(path.join(__dirname, 'client/build')));
    app.use('/maas/*', express.static(path.join(__dirname, 'client/build')));
}
app.listen(3000);