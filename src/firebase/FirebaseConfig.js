const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyBs_KMIi9vVEQJSeE97mLH1wRExal8eknY",
    authDomain: "bookingsaving.firebaseapp.com",
    databaseURL: "https://bookingsaving.firebaseio.com",
    storageBucket: "bookingsaving.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

module.exports = firebaseApp;