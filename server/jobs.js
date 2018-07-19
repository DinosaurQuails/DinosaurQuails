const db = require('../db/index.js');
const express = require('express');
const app = require('./index.js');
const bluebird = require('bluebird');
const jobs = app.Router();

jobs.get('/jobs', jobHelperQuery);
  //render '/jobs'and current 'job' instances

jobs.post('/jobs', jobHelperSaver);
  //send req.miscFields to DB for new instance

const jobHelperQuery = (err, searchTerms) => {
  if (err) {
    console.log(err);
  }
  //get all jobs (no filter terms) from db
  //pass terms into find
  res.send()
}

const jobHelperSaver = (err, inputtedTerms) => {
  if (err) {
    console.log(err);
  }
//takes req .contact, etc - creates new instance entry into db
//test this
//save update
}

module.exports = jobs;