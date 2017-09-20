$(document).ready(function() {

    // Getting references to the add new tenant inputs
    var CenterId = $("[name=centerId]");

    var tenantName = $("[name=tenantName]");
    var tenantSF = $("[name=tenantSF]");
    var leaseStart = $("[name=leaseStart]");
    var leaseEnd = $("[name=leaseEnd]");
    var basePSF = $("[name=basePSF]");
    var camPSF = $("[name=camPSF]");
    var salesPSF = $("[name=salesPSF]");
    var noticeDate = $("[name=noticeDate]");
    var noticeRent = $("[name=noticeRent]");

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

        // A function for creating a new tenant
        function newTenant(tenantData) {
            console.log(tenantData);
            $.post("/api/newTenant", tenantData, function(){
                console.log('request ended')
            })
            console.log("running new tenant function with tenantData");
        }

        // Calling the newTenant function and passing in the values in the new tenant input
        newTenant({
            CenterId: CenterId
                .val()
                .trim(),
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
            salesPSF: salesPSF
                .val()
                .trim(),
            noticeDate: noticeDate
                .val()
                .trim(),
            noticeRent: noticeRent
                .val()
                .trim()

        });

    };

});