const express = require('express');
const path = require('path');
const app = express();

app.use('/maas', express.static(path.join(__dirname, 'client/build')));

app.listen(3000);
