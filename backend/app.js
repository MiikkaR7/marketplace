const express = require('express');
const listingsRouter = require('./routes/listings');

const app = express();

app.get('/health', (req, res) => {
    res.status(200).send("OK");
});

app.use('/api/listings', listingsRouter);


module.exports = app;