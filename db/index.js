const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dinasour');

const db = mongoose.connection;

db.on('error', function() {
  console.log('Error connecting to Mongoose');
});

db.once('open', function() {
  console.log('Mongoose connected');
});

const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;

//TODO: ADD USER SCHEMA
let userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
});

//TODO: ADD USER MODEL for user db
let User = mongoose.model('User', userSchema);

let createUser = (user, callback) => {
  console.log(user);
  User.findOne({ email: user.email }, (err, existingUser) => {
    if (err) {
      console.log(err);
      callback(err, null);
    }
    if (existingUser) {
      console.log('existing', existingUser);
      if (existingUser.email === user.email) {
        callback(null, { messageCode: 101, message: 'User email already exists' });
      } else if (existingUser.userName === user.userName) {
        callback(null, { messageCode: 102, message: 'User name already exists' });
      }
    } else {
      console.log('I got here');
      bcrypt.hash(user.password, saltRounds, function(err, hash) {
        if (err) {
          callback(err, null);
        }

        let user_obj = {
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
          password: hash
        }; 

        let newUser = new User(user_obj);
        newUser.save()
        .then(data => {
          callback(null, data)
        })
        .catch(data => {
          callback(error, null)
        })
      });
    }
  });
};

/*
 newUser.save((err, savedUser) => {
  if (err) {
    console.log(err);
    callback(err, null);
  } else {
    console.log('savedUser', savedUser);
    callback(null, savedUser);
  }
});
*/

let login = (query, callback) => {
  User.findOne({ email: query.email }, (err, user) => {
    if (err) {
      callback(err, null);
    }

    if (!user) {
      callback(null, { messageCode: 103, message: 'User does not exist' });
    } else {
      bcrypt.compare(query.password, user.password, function(err, res) {
        if (res === true) {
          callback(null, user);
        } else {
          callback(null, { messageCode: 104, message: 'Wrong password' });
        }
      });
    }
  });
};

// ADD JOB SCHEMA
let jobSchema = mongoose.Schema({
  userId: String,
  company: {
    name: String,
    jobTitle: String,
    webSite: String
  },
  contact: {
    email: String,
    phone: String,
    recruiter: String
  },
  postDate: Date,
  appliedDate: Date,
  interviewedDate: Date,
  coverLetterUrl: String,
  state: String
});

// ADD JOB MODEL
let Job = mongoose.model('Job', jobSchema);

let createJob = (fieldInfo, callback) => {
  console.log('fieldInfo', fieldInfo);

  let jobOpportunity = new Job({
    userId: 'some user id',
    company: {
      name: fieldInfo.name,
      jobTitle: fieldInfo.jobTitle,
      webSite: fieldInfo.webSite
    },
    contact: {
      email: fieldInfo.email,
      phone: fieldInfo.phone,
      recruiter: fieldInfo.recruiter
    },
    postDate: fieldInfo.postDate,
    appliedDate: fieldInfo.appliedDate,
    interviewedDate: fieldInfo.interviewedDate,
    coverLetterUrl: fieldInfo.coverLetterUrl,
    state: fieldInfo.state
  });

  jobOpportunity.save(function(error, savedJob) {
    if (error) {
      console.log('could not save job to db', error);
      callback(error, null);
    } else {
      console.log('saved job to db', savedJob);
      callback(null, savedJob);
    }
  });
};
//EXPORT MODELS

// module.exports.db = db;
module.exports.createUser = createUser;
module.exports.login = login;
module.exports.createJob = createJob;
