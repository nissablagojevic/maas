const express = require('express');
const path = require('path');
const app = express();

app.use('/maas', express.static(path.join(__dirname, 'client/build')));

app.get('/maas', function (req, res) {
    console.log(req);
    console.log(res);

});

app.listen(3000);
