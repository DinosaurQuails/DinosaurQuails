// Utilities for session care
const createSession = (req, res, newUser) => {
  return req.session.regenerate(() => {
    req.session.user = newUser;
    // res.redirect('/'); 
      //refer to comments below (14-16)
  });
};

const isLoggedIn = (req, res) => {
  return req.session ? !!req.session.user : false;
};

//Refactor this function to communicate with front-end to change state
  //this will likely mean sending an object with a specific key
//TLDR: Change 'session' state instead of redirecting.
const checkUser = (req, res, next) => {
  if (!exports.isLoggedIn(req)) {
    // res.redirect('/login');
  } else {
    next();
  }
};

module.exports.createSession = createSession;
module.exports.isLoggedIn = isLoggedIn;
module.exports.checkUser = checkUser;
