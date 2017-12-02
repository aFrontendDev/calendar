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
  res.send(data);
});

app.post('/signup', function (req, res) {
  const password = req.body.password;
  const email = req.body.email;

  firebase.signUp(email, password).then(function(fulfilled) {
    // console.log(fulfilled);
    res.sendStatus(200);
  })
  .catch(function (error) {
    console.log(error);
    res.status(500).send(error);
  });
});

app.post('/adduser', function (req, res) {
  const email = req.body.email;
  const userId = req.body.uid;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  console.log(email);
  console.log(userId);
  console.log(firstName);
  console.log(lastName);

  firebase.addUser(email, userId, firstName, lastName).then(function(fulfilled) {
    // console.log(fulfilled);
    res.sendStatus(200);
  })
  .catch(function (error) {
    console.log(error);
    res.status(500).send(error);
  });
});

app.post('/signin', function (req, res) {
  const password = req.body.password;
  const email = req.body.email;

  firebase.signIn(email, password).then(function(fulfilled) {
    // console.log(fulfilled);
    res.sendStatus(200);
  })
  .catch(function (error) {
    console.log(error);
    res.status(500).send(error);
  });
});

app.get('/signout', function (req, res) {

  firebase.signOut()
    .then(function(fulfilled) {
      // console.log(fulfilled);
      res.sendStatus(200);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get('/currentUser', function (req, res) {
  const user = firebase.currentUser();
  // console.log(user);
  res.send(user);
});

app.get('/test', function (req, res) {
    res.send('Testing');
    console.log(req.client.remoteAddress);
});
// END *****


// START *** Use Express to listen to port
app.listen(4000, '127.0.0.1', function () {
  firebase.initFirebase();
  console.log('init');
});
// END *****