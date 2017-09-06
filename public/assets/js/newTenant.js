$(document).ready(function() {

    // Getting references to the add new tenant inputs
    var nameInput = $("#player-name");
    var emailInput = $("#player-email");
    var passwordInput = $("#player-password");
    var teamInput = $("#team-name");
    var courseName = $("#course-name");
    var eventDate = $("#event-date");
    var eventTime = $("#event-time");

    // Handle new tenant submit
    $(document).on("submit", "#form--event-add", handleTenantFormSubmit);

    // A function to handle what happens when the form is submitted to create a new tenant
    function handleTenantFormSubmit(event) {

        console.log("calling add new tenant");

        event.preventDefault();

        // Don't do anything if the name fields hasn't been filled out
        if (!nameInput.val().trim().trim()) {
            return;
        }

        // Calling the newTenant function and passing in the values in the new tenant input
        newTenant({

            coursename: courseName
                .val()
                .trim(),
            date: eventDate
                .val()
                .trim(),
            time: eventTime
                .val()
                .trim(),
            playername: nameInput
                .val()
                .trim(),
            email: emailInput
                .val()
                .trim(),
            password: passwordInput
                .val()
                .trim(),
            teamname: teamInput
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