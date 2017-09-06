// Routes =============================================================
var db = require("../models/index.js");

// ---------------------------- GET ROUTES ---------------------------- //

    /// SHOW LOGIN ON LOAD
    app.get("/", function(req, res) {
        res.render('login.html', req);
    });

    /// REDIRECT FROM LOGIN TO DASHBOARD IF VALIDATED
    app.get("/login", function(req, res) {
        res.render('dashboard.html', req);
    });


    /// ROUTE TO AVON
    app.get("/avon", function(req, res) {
        res.render('avon.html', req);
    });


    /// ROUTE TO HAWTHORNE
    app.get("/hawthorne", function(req, res) {
        res.render('hawthorne.html', req);
    });


    /// ROUTE TO LEGACY
    app.get("/legacy", function(req, res) {
        res.render('legacy.html', req);
    });


    /// ROUTE TO MENTOR
    app.get("/mentor", function(req, res) {
        res.render('mentor.html', req);
    });


    /// ROUTE TO STEELYARD
    app.get("/steelyard", function(req, res) {
        res.render('steelyard.html', req);
    });


    /// ROUTE TO OAKWOOD
    app.get("/oakwood", function(req, res) {
        res.render('oakwood.html', req);
    });


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

	    app.post("/api/edit/:centerID/:tenantID", function(req, res) {

        console.log("\n\n\n>>>>");
        console.log(req.params.tenantID);
        console.log(req.body);
        console.log("\n\n\n>>>>");

        var totalPSF = parseInt(req.body.basePSF) + parseInt(req.body.camPSF);
        var annualRent = parseInt(req.body.basePSF) * parseInt(req.body.tenantSF);
        var annualSales = parseInt(salesPSF) * parseInt(req.body.tenantSF);
        var occupancy = parseInt(salesPSF) / parseInt(totalPSF);

        // ADD EDITS TO TENANT TABLE BY TENANTID
        db.Tenants.update(
        	{   tenantName: req.body.tenantName,
        		centerID: req.params.centerID,
    			tenantSF: req.body.tenantSF,
    			leaseStart: req.body.leaseStart,
    			leaseEnd: req.body.leaseEnd,
    			basePSF: req.body.basePSF,
    			camPSF: req.body.camPSF,
    			totalPSF: totalPSF,
    			annualRent: annualRent,
    			salesPSF: req.body.salesPSF,
    			annualSales: annualSales,
    			occupancy: occupancy,
    			noticeDate: req.body.noticeDate,
    			noticeRent: req.body.noticeRent
    		},
            { where: { _id: req.params.id } }

            // REDIRECT TO SHOPPING CENTER PAGE
            }).then(function(data) {

                res.redirect("/center/" + data.centerID );

            // CATCH ERRORS
            }).catch(function(error) {

                res.send(error);
            });
    

	/// DELETE A TENANT

	app.post("/api/remove/:centerID/:tenantID", function (req,res) {

        db.Tenants.destroy(

        	{ where: { id: req.params.tenantID } } )
          
         // REDIRECT TO SHOPPING CENTER PAGE
        }).then(function(data) {

            res.redirect("/center/" + data.centerID );

        // CATCH ERRORS
        }).catch(function(error) {

            res.send(error);
        });