const express = require('express');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5030;

// the app get method will respond to GET requests
// the method takes two arguments, the route to listen respond to 
// callback function with two arguments, the request and the response
// callback function is also called the route handler
app.get('/', (req, res) => {
  res.send('Hello Backend Developer!');
});

// Call the app listen method and give the port as first arguments
// There is callback which called when app starts listening
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});