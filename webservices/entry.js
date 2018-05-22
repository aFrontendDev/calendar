const express = require('express');
const app = express();
const db = require('./db');

var AuthController = require('./auth/authController');
app.use('/api/auth', AuthController);


const port = process.env.PORT || 3000;
const server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
