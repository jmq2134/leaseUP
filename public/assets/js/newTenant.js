$(document).ready(function() {

    // Getting references to the add new tenant inputs
    var tenantName = $("#tenantName");
    var tenantSF = $("#tenantSF");
    var leaseStart = $("#leaseStart");
    var leaseEnd = $("#leaseEnd");
    var basePSF = $("#basePSF");
    var camPSF = $("#camPSF");
    var salesPSF = $("#salesPSF");
    var noticeDate = $("#noticeDate");
    var noticeRent = $("#noticeRent");

    var totalPSF = parseInt(req.body.basePSF) + parseInt(req.body.camPSF);
    var annualRent = parseInt(req.body.basePSF) * parseInt(req.body.tenantSF);
    var annualSales = parseInt(salesPSF) * parseInt(req.body.tenantSF);
    var occupancy = parseInt(salesPSF) / parseInt(totalPSF);

    // Handle new tenant submit
    $(document).on("submit", "#form--event-add", handleTenantFormSubmit);

    // A function to handle what happens when the form is submitted to create a new tenant
    function handleTenantFormSubmit(event) {

        console.log("calling add new tenant function");

        event.preventDefault();

        // Don't do anything if the name field hasn't been filled out
        if (!tenantName.val().trim().trim()) {
            return;
        }

        // Calling the newTenant function and passing in the values in the new tenant input
        newTenant({

            tenantName: tenantName
                .val()
                .trim(),
            tenantSF: tenantSF
                .val()
                .trim(),
            leaseStart: leaseStart
                .val()
                .trim(),
            leaseEnd: leaseEnd
                .val()
                .trim(),
            basePSF: basePSF
                .val()
                .trim(),
            camPSF: camPSF
                .val()
                .trim(),
            totalPSF: totalPSF
                .val()
                .trim(),
            annualRent: annualRent
                .val()
                .trim(),
            salesPSF: salesPSF
                .val()
                .trim(),
            annualSales: annualSales
                .val()
                .trim(),
            occupancy: occupancy
                .val()
                .trim(),
            noticeDate: noticeDate
                .val()
                .trim(),
            noticeRent: noticeRent
                .val()
                .trim()

        });


        // A function for creating a game
        function newTenant(tenantData) {
            $.post("/api/newTenant", tenantData)
            console.log("connected");
        }

    };

});