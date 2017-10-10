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
    console.log('fb');
    console.log(email);
    console.log(password);
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }

};