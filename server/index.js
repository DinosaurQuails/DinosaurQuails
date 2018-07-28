const express = require('express');
const db = require('../db/index.js');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const util = require('./helpers/utilities.js');
const app = express();
const createUser = require('../db/index.js').createUser;
const jobs = require('./jobs');
const job = require('./job');
const PATH = require('path');

app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Origin, X-Requested-With');
  next();
})

//Setup Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: 'jurassic eggs',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
  })
);
//Serve static files
app.use(express.static(PATH.join(__dirname, '/../client/dist')));

//Establish routes
app.get('/', util.checkUser, (req, res) => {
  // Just checks verification status.
});

app.post('/jobs', jobs);
app.get('/jobs', jobs);

app.put('/job', job);
app.delete('/job', job);

app.post('/signup', require('./signup.js'));
app.get('/signup', require('./signup.js'));

app.post('/login', require('./login.js'));
app.get('/login', require('./login.js'));

app.get('/logout', function(req, res) {
  req.session.destroy(function() {
    res.status(200).json({message: 'Successful Logout'});
  });
});

const PORT = process.env.PORT || 3000;

//Establish port#
app.listen(PORT, function() {
  console.log('Get the Job Cat at port: ', PORT);
});

//save update
module.exports = app;
