const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// START *** Settings headers to allow cross domain requests
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
  next();
});
// END *****


const { newEvent, getEvent, addUserToEvent, updateEvent } = require('./event/eventController');

const AuthController = require('./auth/authController');
app.use('/api/auth', AuthController);


app.post('/api/event/new', (req, res) => {
  const body = req.body;
  const adminName = body.username;
  const adminId = body.userid;
  const password = body.password || '';
  const targetDate = body.targetDate;
  const targetTime = body.targetTime || '';
  const locationName = body.locationName || '';
  const locationLat = body.locationLat || '';
  const locationLon = body.locationLon || '';
  const name = body.name;

  const eventObj = {
    adminName,
    adminId,
    password,
    targetDate,
    targetTime,
    locationName,
    locationLat,
    locationLon,
    name
  }

  newEvent(eventObj)
    .then(response => {
      res.send(response);
    });
});

app.get('/api/event/get', (req, res) => {
  const id = req.query.id;

  getEvent(id)
    .then(response => {
      res.send(response);
    });
});

app.post('/api/event/addUserToEvent', (req, res) => {
  const id = req.body.id;
  const username = req.body.username;
  const userId = req.body.userid;

  addUserToEvent(id, username, userId)
    .then(response => {
      res.send(response);
    });
});

app.post('/api/event/update', (req, res) => {
  const id = req.body.id;
  const userId = req.body.userid;
  const targetDate = req.body.targetDate;
  const targetTime = req.body.targetTime;
  const locationName = req.body.locationName;
  const locationLat = req.body.locationLat;
  const locationLon = req.body.locationLon;

  updateEvent(id, userId, targetDate, targetTime, locationName, locationLat, locationLon)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({'err': err});
    })
});

const port = process.env.PORT || 3000;
const server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
