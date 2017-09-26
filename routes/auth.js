var authController = require('../controllers/authcontroller.js');

module.exports = function(app, passport) {

    /// SIGN UP
    app.get('/signup', authController.signup);

    /// SIGN IN 
    app.get('/signin', authController.signin);

    /// SIGN UP VALIDATION 
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }));

    /// DASHBOARD
    app.get('/dashboard', isLoggedIn, authController.dashboard);

    /// LOG OUT
    app.get('/logout', authController.logout);

    /// SIGN IN VALIDATION 
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin'
    }));

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/signin');
    }

}