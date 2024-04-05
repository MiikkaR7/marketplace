const express = require('express');
const listingsRouter = require('./routes/listings');
const usersRouter = require('./routes/users');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).send("OK");
});

app.use('/api/listings', listingsRouter);
app.use('/api/users', usersRouter);


module.exports = app;