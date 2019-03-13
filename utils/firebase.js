const firebase = require("firebase/app")
require("firebase/database");
firebase.initializeApp({
    
})
const database = firebase.database();
module.exports = database;