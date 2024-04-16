const express = require('express');
const listingsRouter = require('./routes/listings');
const usersRouter = require('./routes/users');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: [
      'http://localhost:5172',
      'http://localhost:5030',
      'http://172.16.4.202:8080',
      'http://172.16.4.202:90'
    ]
  }));

app.get('/health', (req, res) => {
    res.status(200).send("OK");
});

app.use('/api/listings', listingsRouter);
app.use('/api/users', usersRouter);

//test line

module.exports = app;