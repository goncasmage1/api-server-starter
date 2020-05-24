const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/routes.js')(app, fs);
const PORT = 3000;

const server = app.listen(process.env.PORT || PORT, () => {
    console.log('listening on port %s...', server.address().port);
});