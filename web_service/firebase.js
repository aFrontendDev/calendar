// firebase connection
const firebase = require('firebase');
const admin = require("firebase-admin");
const { configVariables } = require('./private-config.js');

const serviceAccount = require('./calendar-58189367ae49.json');

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

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: configVariables.databaseURL,
      databaseAuthVariableOverride: {
        uid: "db-editor"
      }
    });
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

  addUser(email, uid, firstName, lastName) {
    const db = admin.database();
    let errored = false;

    console.log(email);
    console.log(uid);
    console.log(firstName);
    console.log(lastName);

    return new Promise(function(resolve, reject) {
      db.ref('users/' + uid).set({
        email,
        firstName,
        lastName
      })
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        errored = true;
        reject(errorMessage);
      })
      .then(function (e) {
        console.log(e);

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