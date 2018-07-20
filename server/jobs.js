const db = require('../db/index.js');
const express = require('express');
const app = require('./index.js');
const bluebird = require('bluebird');
const jobs = express.Router();

const jobHelperDisplay = (err) => {
  if(err) console.log('Issue Rendering all jobs, check DB: ', err);
   res.send(db.Jobs.find()); 
}
const jobHelperQuery = (err, searchTerms) => {
  if (err) console.log('Job Query Error: ', err);
  res.send(db.Jobs.find(searchTerms));
  // get specific elements from db
  // //pass terms into find
}

const jobHelperSaver = (err, inputtedTerms) => {
  let terms = inputtedTerms || 'none';
  if (err) console.log('Job Saver Error: ', err);
  // db.createJob(inputtedTerms); implement in DB
  res.send('Job Saved!');
//TODO:
  //input calender modal into date 
  //test this
}

jobs.get('/jobs', jobHelperDisplay);
//render '/jobs'and current 'job' instances

jobs.post('/jobs', jobHelperSaver);
//send req.miscFields to DB for new instance

module.exports = jobs; 
module.exports.jobHelperQuery = jobHelperQuery;