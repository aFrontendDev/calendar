// firebase connection
const firebase = require('firebase');
const { configVariables } = require('./private-config.js');

// Initialize Firebase
const config = {
  apiKey: configVariables.apiKey,
  authDomain: configVariables.authDomain,
  databaseURL: configVariables.databaseURL,
  projectId: configVariables.projectId,
  storageBucket: configVariables.storageBucket,
  messagingSenderId: configVariables.messagingSenderId
};

module.exports = {

  initFirebase() {
    firebase.initializeApp(config);
  },

  signUp(email, password) {
    let errored = false;

    return new Promise(function(resolve, reject) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          errored = true;
          reject(errorMessage);
        })
        .then(function (e) {

          if (!errored) {
            resolve('success');
          }
        });
    });
  },

  signIn(email, password) {
    let errored = false;

    return new Promise(function(resolve, reject) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          errored = true;
          reject(errorMessage);
        })
        .then(function (e) {

          if (!errored) {
            resolve('success');
          }
        });
    });
  },

  signOut() {
    let errored = false;

    return new Promise(function(resolve, reject) {
      firebase.auth().signOut()
        .catch(function(error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          errored = true;
          reject(errorMessage);
        })
        .then(function (e) {

          if (!errored) {
            resolve('success');
          }
        });
    });
  },

  currentUser() {
    const user = firebase.auth().currentUser;
    return user;
  },

};