'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const functions = require('../web_service/functions');
const firebase = require('./firebase');
const app = express();

//  Middle-ware for handling post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// START *** Settings headers to allow cross domain requests
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// END *****


// START *** Express deals with urls
app.get('/getMonth', function (req, res) {
  if (!req.query || !req.query.year || !req.query.month) {
    res.send('nothing');
  }

  const data = functions.getMonth(req.query.year, req.query.month);
  // console.log(data);
  res.send(data);
});

app.get('/startfb', function (req, res) {
  firebase.initFirebase();
  res.send('done');
});

app.post('/signup', function (req, res) {
  const password = req.body.password;
  const email = req.body.email;
  console.log(email);
  console.log(password);

  firebase.signUp(email, password);
  res.sendStatus(200);
});

app.get('/test', function (req, res) {
    res.send('Testing');
    console.log(req.client.remoteAddress);
});
// END *****


// START *** Use Express to listen to port
app.listen(4000, '127.0.0.1');
// END *****