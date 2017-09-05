// Routes =============================================================
var db = require("../models/index.js");

// ---------------------------- GET ROUTES ---------------------------- //

    /// SHOW LOGIN ON LOAD
    app.get("/", function(req, res) {
        res.render('login.html', req);
    });

    /// REDIRECT FROM LOGIN TO DASHBOARD IF VALIDATED


    /// ROUTE TO AVON


    /// ROUTE TO HAWTHORNE


    /// ROUTE TO LEGACY


    /// ROUTE TO MENTOR


    /// ROUTE TO STEELYARD


    /// ROUTE TO OAKWOOD


    /// SHOW ALL TENANT INFO
    app.get("/api/tenants", function(req, res) {
        db.Tenants.findAll({
        }).then(function(dbTenants) {
            res.json(dbTenants);
        });
    });

    /// SHOW ALL SHOPPING CENTER INFO
    app.get("/api/centers", function(req, res) {
        db.Tenants.findAll({
        }).then(function(dbCenters) {
            res.json(dbCenters);
        });
    });


// ---------------------------- POST ROUTES ---------------------------- //

	/// ADD A NEW TENANT

	    app.post("/api/newTenant", function(req, res) {

	    // LOG INFO FROM REQ.BODY FROM MODAL FORM
        console.log("------------------------");
        console.log(req.body);
        console.log("------------------------");

        // ADD TO TENANTS TABLE
        db.Tenants.create({



        }).then(function(data) {

        	// REDIRECT TO CENTER PAGE
            res.redirect("/center/" + data.centerID);
          
            }).catch(function(error) {
            	
            	// REPORT ERRORS
                  res.send(error);
               });

         });


	/// EDIT AN EXISTING TENANT




	/// DELETE A TENANT