// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var sequelize = require("sequelize");
var session = require('express-session')
var env = require('dotenv').load();
var passport = require('passport');
var Handlebars = require('handlebars');
var HandlebarsIntl = require('handlebars-intl');
var NumeralHelper = require("handlebars.numeral");
var geocoder = require('geocoder');
NumeralHelper.registerHelpers(Handlebars);
HandlebarsIntl.registerWith(Handlebars);


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./public"));

// Sets up Passport
// ============================================================
app.use(session({    
    secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
 

// Sets up the Handlebars
// =============================================================
var exhb = require("express-handlebars");

app.engine("handlebars", exhb({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Routes =======================================================
require("./routes/api-routes.js")(app);
require('./config/passport/passport.js')(passport, db.user);
var authRoute = require('./routes/auth.js')(app, passport);


// Syncing sequelize models and then starting the express app
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});