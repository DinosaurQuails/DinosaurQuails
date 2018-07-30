const bcrypt = require('bcrypt-nodejs');
const db = require('../db/index.js'); // only necessary in case of utilizing db functions here.
/**
 * @description This file contains a single function for bcrypt encryption hashPass
 * Ideally, this file should contain any other relevant middleware the db might require
 * as helper utilities
 * @param {Object} user the object containing all user submitted info on sign up 
 * @param {Function} callback the callback to be executed from the database once bcrypt async executes.
 */
const hashPass = (user, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.log(err);
    }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        console.log(err);
      }
      let user_obj = {
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        password: hash
      };
      callback(null, user_obj);
    });
  });
}

module.exports.hashPass = hashPass;