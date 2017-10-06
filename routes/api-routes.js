// REQUIRE FILES
var db = require("../models/index.js");
var passport = require("passport");

// Routes ======================================================================================================= //

module.exports = function(app) {

    // --------------------------------------------- GET ROUTES ------------------------------------------------- //

    /// ============= REDIRECT TO LOGIN ============= ///
    app.get('/', function(req, res) {
        res.redirect('/signin');
    });

    /// ================ RENDER SIGNIN =============== ///
    app.get('/signin', function(req, res) {
        res.render('signin', req);
    });

    /// ================ RENDER SIGNUP =============== ///
    app.get("/signup", function(req, res) {
        res.render('signup', req);
    });

    /// ================= RENDER USER ================ ///
    app.get("/user/:userID", function(req, res) {
        db.Users.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(user) {
            res.render('user', {
                user: user
            });
        })
    });

    /// ================ RENDER MAP ================== ///
    app.get("/map", function(req, res) {
        db.Centers.findAll().then(function(data) {
            var hbsObject = { centers: data };
            // res.json(hbsObject);
            res.render('map', hbsObject);
        });
    });

    /// =============== RENDER CALENDAR ============== ///
    app.get("/calendar", function(req, res) {
        db.Centers.findAll().then(function(data) {
            var hbsObject = { centers: data };
            // res.json(hbsObject);
            res.render('calendar', hbsObject);
        });
    });

    /// ============= ROUTE TO DASHBOARD ============ ///
    app.get("/dashboard", function(req, res) {
        db.Centers.findAll({
            include: [{
                model: db.Tenants,
                required: false
            }]
        }).then(function(data) {
            var hbsObject = { centers: data };
            // res.json(hbsObject);
            res.render('dashboard',
                hbsObject
            );
        })
    });

    /// === ROUTE TO SHOPPING CENTER PAGE BY ID ==== ///
    app.get("/center/:id", function(req, res) {

        var hbsObject = {};

        db.Centers.findAll().then(function(data) {
            hbsObject.centers = data;
            console.log(hbsObject.centers);
        }).then(function() {
            db.Centers.findOne({
                where: {
                    id: req.params.id
                },
                include: [{
                    model: db.Tenants,
                    required: false
                }]
            }).then(function(data) {

                hbsObject.tenants = data
                res.render('center', hbsObject);
                //res.json(hbsObject);
            });
        })
    });


    // ------------------------------------------- API GET ROUTES ----------------------------------------------- //

    /// ================= SHOW ALL CENTERS =================== ///
    app.get("/api/centers", function(req, res) {
        db.Centers.findAll({}).then(function(dbCenters) {
            res.json(dbCenters);
        });
    })

    /// ================= SHOW ALL TENANTS =================== ///
    app.get("/api/tenants", function(req, res) {
        db.Tenants.findAll({}).then(function(dbTenants) {
            res.json(dbTenants);
        });
    })

    /// =================== TENANT EVENTS ==================== ///
    app.get("/api/tenants/events", function(req, res) {
        db.Tenants.findAll({}).then(function(dbTenants) {
            return dbTenants
        }).then(function(data) {
            var eventsArray = [];

            /// EXPIRATION DATES
            for (i = 0; i < data.length; i++) {

                if (data[i].tenantName !== "Vacant") {
                    title = data[i].tenantName + " Expiration";

                    var date = data[i].leaseEnd;

                    var expdate = "" + new Date(date) + "";

                    var arr = date.split("/");

                    year = parseInt(arr[2]);
                    month = parseInt(arr[0]);
                    day = parseInt(arr[1]) + 1;

                    var expDate = year + "-" + month + "-" + day;

                    eventsArray.push({ title: title, start: expdate, allDay: true, className: 'event-red' });

                }
            }

            /// OPTION NOTICE DATES
            for (i = 0; i < data.length; i++) {

                if (data[i].tenantName !== "Vacant") {
                    title = data[i].tenantName + " Option Notice";

                    var date = data[i].noticeDate;

                    var expdate = "" + new Date(date) + "";

                    var arr = date.split("/");

                    year = parseInt(arr[2]);
                    month = parseInt(arr[0]);
                    day = parseInt(arr[1]) + 1;

                    var expDate = year + "-" + month + "-" + day;

                    eventsArray.push({ title: title, start: expdate, allDay: true, className: 'event-azure' });
                }
            }

            return eventsArray
        }).then(function(eventsArray) {
            console.log(eventsArray);
            res.json(eventsArray)
        })
    })

    /// ================= SHOW TENANT BY ID ================== ///
    app.get("/api/tenants/:id", function(req, res) {
        db.Tenants.findAll({
            where: {
                id: req.params.id
            }
        }).then(function(dbTenants) {
            res.json(dbTenants);
        });
    })

    // ------------------------------------------- POST ROUTES ------------------------------------------------- //


    /// =============== ADD OR EDIT TENANTS ================== ///

    app.post("/api/:id/newTenant", function(req, res) {

        // LOG INFO FROM REQ.BODY FROM MODAL FORM
        console.log("------------------------");
        console.log(req.body);
        console.log(req.body.id);
        console.log("------------------------");

        /// IF NO ID IS SENT THROUGH MODAL FORM, IT'S A NEW TENANT
        if (req.body.id == "") {

            //// ADD NEW TO TENANTS TABLE -- HANDLE VACANT TENANT OR REGULAR TENANT

            /// VACANT TENANT

            if (req.body.basePSF == "") {

                db.Tenants.create({
                    CenterId: req.params.id,
                    tenantName: req.body.tenantName,
                    tenantSF: req.body.tenantSF
                }).then(function(data) {

                    // REDIRECT TO CENTER PAGE
                    res.redirect("/center/" + req.params.id);

                }).catch(function(error) {

                    // REPORT ERRORS
                    res.send(error);
                });


                /// REGULAR TENANTS

            } else {

                db.Tenants.create({

                    CenterId: req.params.id,
                    tenantName: req.body.tenantName,
                    tenantSF: req.body.tenantSF,
                    leaseStart: req.body.leaseStart,
                    leaseEnd: req.body.leaseEnd,
                    basePSF: req.body.basePSF,
                    camPSF: req.body.camPSF,
                    totalPSF: parseFloat(req.body.basePSF) + parseFloat(req.body.camPSF),
                    annualRent: (parseFloat(req.body.basePSF) + parseFloat(req.body.camPSF)) * parseFloat(req.body.tenantSF),
                    salesPSF: req.body.salesPSF,
                    annualSales: parseFloat(req.body.salesPSF) * parseFloat(req.body.tenantSF),
                    occupancy: (parseFloat(req.body.basePSF) + parseFloat(req.body.camPSF)) / parseFloat(req.body.salesPSF),
                    noticeDate: req.body.noticeDate,
                    noticeRent: req.body.noticeRent

                }).then(function(data) {

                    // REDIRECT TO CENTER PAGE
                    res.redirect("/center/" + req.params.id);

                }).catch(function(error) {

                    // REPORT ERRORS
                    res.send(error);
                });
            }

        } else {

            /// EDIT EXISTING TENANT

            console.log("edit tenant");

            db.Tenants.update({
                CenterId: req.params.id,
                tenantName: req.body.tenantName,
                tenantSF: req.body.tenantSF,
                leaseStart: req.body.leaseStart,
                leaseEnd: req.body.leaseEnd,
                basePSF: req.body.basePSF,
                camPSF: req.body.camPSF,
                totalPSF: parseFloat(req.body.basePSF) + parseFloat(req.body.camPSF),
                annualRent: (parseFloat(req.body.basePSF) + parseFloat(req.body.camPSF)) * parseFloat(req.body.tenantSF),
                salesPSF: req.body.salesPSF,
                annualSales: parseFloat(req.body.salesPSF) * parseFloat(req.body.tenantSF),
                occupancy: (parseFloat(req.body.basePSF) + parseFloat(req.body.camPSF)) / parseFloat(req.body.salesPSF),
                noticeDate: req.body.noticeDate,
                noticeRent: req.body.noticeRent
            }, {
                where: { id: req.body.id }

                // REDIRECT TO SHOPPING CENTER PAGE
            }).then(function(data) {

                res.redirect("/center/" + req.params.id);

                // CATCH ERRORS
            }).catch(function(error) {

                res.send(error);
            });

        }

    });


    /// ==================== DELETE TENANT ====================== ///

    app.delete("/api/remove/:thisId", function(req, res) {

        console.log("\n\n\n>>>>");
        console.log("remove tenant");
        console.log(req.params.thisId);
        console.log(req.body);
        console.log("\n\n\n>>>>");

        var centerId = "";

        db.Tenants.findOne({
            where: {
                id: req.params.thisId
            }
        }).then(function(data) {
            console.log(data);
            centerId = data.CenterId;
            console.log(centerId);

        }).then(function() {

            db.Tenants.destroy({
                where: {
                    id: req.params.thisId
                }

                // REFRESH PAGE
            }).then(function() {
                location.reload();

                // CATCH ERRORS
            }).catch(function(error) {

                res.send(error);
            });

        })

    });

}; // close api export