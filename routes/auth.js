var authController = require('../controllers/authcontroller.js'); 
var passport = require('passport');

module.exports = function(app, passport) {
 
 
    app.get('/signup', authController.signup);
 
 
    app.get('/login', authController.login);
 
 
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/dashboard',
 
            failureRedirect: '/signup'
        }
 
    ));
 
 
    app.get('/dashboard', isLoggedIn, authController.dashboard);
 
  
    app.get('/logout', authController.logout);
 
 
    app.post('/login', passport.authenticate('local-signin', {
            successRedirect: '/dashboard',
 
            failureRedirect: '/login'
        }
 
    ));
 
 
    function isLoggedIn(req, res, next) {
 
        if (req.isAuthenticated())
 
            return next();
 
        res.redirect('/signin');
 
    }
 
}