type = ['', 'info', 'success', 'warning', 'danger'];


demo = {
    initPickColor: function() {
        $('.pick-class-label').click(function() {
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if (display_div.length) {
                var display_buttons = display_div.find('.btn');
                display_buttons.removeClass(old_class);
                display_buttons.addClass(new_class);
                display_div.attr('data-class', new_class);
            }
        });
    },

    initFullScreenGoogleMap: function() {

        /// HOME LATITUDE/LONGITUDE
        var myLatlng = new google.maps.LatLng(40.748817, -73.985428);

        /// FIND CENTER ADDRESSES
        var locationsArray = [];

        function location(centerName, centerStreet, centerCity, centerState, centerZip) {
            this.centerName = centerName;
            this.centerStreet = centerStreet;
            this.centerCity = centerCity;
            this.centerState = centerState;
            this.centerState = centerState;
            locationsArray.push(this);
        }

        $.ajax({
                method: "GET",
                url: "/api/centers"
            })
            // Fill modal with tenant info
            .done(function(data) {
                console.log(data);

                /// PUSH CENTER DATA INTO LOCATION ARRAY
                for (i = 0; i < data.length; i++) {
                    var centerName = data[i].centerName;
                    var centerStreet = data[i].centerStreet;
                    var centerCity = data[i].centerCity;
                    var centerState = data[i].centerState;
                    var centerZip = data[i].centerZip;

                    new location(centerName, centerStreet, centerCity, centerState, centerZip);
                    console.log(locationsArray);

                    geocoder.geocode(location, function(err, data) {
                        // do something with data 
                        return data;
                        console.log(geocode);
                    });

                    // var location = data[i].centerStreet + ' ' + data[i].centerCity + ' ' + data[i].centerState + ' ' + data[i].centerZip;
                    // geocodeAddress(location);
                }
            });

        function geocodeAddress(location) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                'address': centerStreet + ' ' + centerCity + ' ' + centerState + ' ' + centerZip
            }, function(results, status) {
                // Drop a pin on map for each geocoded address
                if (status == 'OK') {
                    window.mapInstance.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: window.mapInstance,
                        position: results[0].geometry.location,
                        title: location.name
                    });

                    var infowindow = new google.maps.InfoWindow({
                        content: location.name + "<br>" + location.centerStreet + "<br>" + location.centerCity + ' ' + location.centerState + ' ' + locationArray.centerZip,
                        map: map
                    });

                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(map, this);
                    });

                    // Error alert
                } else {
                    alert("geocode of " + address + " failed:" + status);
                }
            });
        }



        var mapOptions = {
            zoom: 13,
            center: myLatlng,
            scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
            styles: [{ "featureType": "water", "stylers": [{ "saturation": 43 }, { "lightness": -11 }, { "hue": "#0088ff" }] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "hue": "#ff0000" }, { "saturation": -100 }, { "lightness": 99 }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#808080" }, { "lightness": 54 }] }, { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{ "color": "#ece2d9" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#ccdca1" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#767676" }] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "poi", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#b8cb93" }] }, { "featureType": "poi.park", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.sports_complex", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.medical", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.business", "stylers": [{ "visibility": "simplified" }] }]

        }

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title: "Hello World!"
        });

        // To add the marker to the map, call setMap();
        marker.setMap(map);
    },


    initAnimationsArea: function() {
        $('.animationsArea .btn').click(function() {
            animation_class = $(this).data('animation-class');

            $parent = $(this).closest('.animationsArea');

            $parent.find('.btn').removeClass('btn-fill');

            $(this).addClass('btn-fill');

            $parent.find('.animated')
                .removeAttr('class')
                .addClass('animated')
                .addClass(animation_class);

            $parent.siblings('.header').find('.title small').html('class: <code>animated ' + animation_class + '</code>');
        });
    },

    showSwal: function(type) {
        if (type == 'basic') {
            swal("Here's a message!");

        } else if (type == 'title-and-text') {
            swal("Here's a message!", "It's pretty, isn't it?")

        } else if (type == 'success-message') {
            swal("Good job!", "You clicked the button!", "success")

        } else if (type == 'warning-message-and-confirmation') {
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover this imaginary file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn btn-info btn-fill",
                confirmButtonText: "Yes, delete it!",
                cancelButtonClass: "btn btn-danger btn-fill",
                closeOnConfirm: false,
            }, function() {
                swal("Deleted!", "Your imaginary file has been deleted.", "success");
            });

        } else if (type == 'warning-message-and-cancel') {
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover this imaginary file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    swal("Deleted!", "Your imaginary file has been deleted.", "success");
                } else {
                    swal("Cancelled", "Your imaginary file is safe :)", "error");
                }
            });

        } else if (type == 'custom-html') {
            swal({
                title: 'HTML example',
                html: 'You can use <b>bold text</b>, ' +
                    '<a href="http://github.com">links</a> ' +
                    'and other HTML tags'
            });

        } else if (type == 'auto-close') {
            swal({
                title: "Auto close alert!",
                text: "I will close in 2 seconds.",
                timer: 2000,
                showConfirmButton: false
            });
        } else if (type == 'input-field') {
            swal({
                    title: 'Input something',
                    html: '<p><input id="input-field" class="form-control">',
                    showCancelButton: true,
                    closeOnConfirm: false,
                    allowOutsideClick: false
                },
                function() {
                    swal({
                        html: 'You entered: <strong>' +
                            $('#input-field').val() +
                            '</strong>'
                    });
                })
        }
    },

    initFormExtendedSliders: function() {

        // Sliders for demo purpose in refine cards section
        if ($('#slider-range').length != 0) {
            $("#slider-range").slider({
                range: true,
                min: 0,
                max: 500,
                values: [75, 300],
            });
        }
        if ($('#refine-price-range').length != 0) {
            $("#refine-price-range").slider({
                range: true,
                min: 0,
                max: 999,
                values: [100, 850],
                slide: function(event, ui) {
                    min_price = ui.values[0];
                    max_price = ui.values[1];
                    $(this).siblings('.price-left').html('&euro; ' + min_price);
                    $(this).siblings('.price-right').html('&euro; ' + max_price)
                }
            });
        }

        if ($('#slider-default').length != 0 || $('#slider-default2').length != 0) {
            $("#slider-default, #slider-default2").slider({
                value: 70,
                orientation: "horizontal",
                range: "min",
                animate: true
            });
        }
    },

    initFormExtendedDatetimepickers: function() {
        $('.datetimepicker').datetimepicker({
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove'
            }
        });

        $('.datepicker').datetimepicker({
            format: 'MM/DD/YYYY',
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove'
            }
        });

        $('.timepicker').datetimepicker({
            //          format: 'H:mm',    // use this format if you want the 24hours timepicker
            format: 'h:mm A', //use this format if you want the 12hours timpiecker with AM/PM toggle
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove'
            }
        });
    },

    initFullCalendar: function() {
        $calendar = $('#fullCalendar');

        today = new Date();
        y = today.getFullYear();
        m = today.getMonth();
        d = today.getDate();

        var eventsArray = [];
        var title = "";
        var year = 0;
        var month = 0;
        var day = 0;

        // FIND TENANT INFO FROM ROW
        // $.ajax({
        //         method: "GET",
        //         url: "/api/tenants/"
        //     })
        //     // Fill modal with tenant info
        //     .done(function(data) {
        //         console.log(data);

        //         for (i = 0; i < data.length; i++) {

        //             if (data[i].tenantName !== "Vacant") {
        //                 title = data[i].tenantName + " Expiration";

        //                 var date = data[i].leaseEnd;
        //                 console.log(date);

        //                 var expdate = "" + new Date(date) + "";

        //                 var arr = date.split("/");

        //                 year = parseInt(arr[2]);
        //                 month = parseInt(arr[0]);
        //                 day = parseInt(arr[1]) + 1;

        //                 var expDate = year + "-" + month + "-" + day;
        //                 console.log(expDate);

        //                 eventsArray.push({ title: title, start: expdate, allDay: true, className: 'event-azure' })
        //             }
        //         }
        //     });

        // console.log(eventsArray);

        $calendar.fullCalendar({
            header: {
                left: 'title',
                center: 'month,agendaWeek,agendaDay',
                right: 'prev,next today'
            },
            defaultDate: today,
            selectable: true,
            selectHelper: true,
            titleFormat: {
                month: 'MMMM YYYY', // September 2015
                week: "MMMM D YYYY", // September 2015
                day: 'D MMM, YYYY' // Tuesday, Sep 8, 2015
            },
            select: function(start, end) {

                // on select we show the Sweet Alert modal with an input
                swal({
                    title: 'Create an Event',
                    html: '<br><input class="form-control" placeholder="Event Title" id="input-field">',
                    showCancelButton: true,
                    closeOnConfirm: true
                }, function() {

                    var eventData;
                    event_title = $('#input-field').val();

                    if (event_title) {
                        eventData = {
                            title: event_title,
                            start: start,
                            end: end
                        };
                        $calendar.fullCalendar('renderEvent', eventData, true); // stick? = true
                    }

                    $calendar.fullCalendar('unselect');

                });
            },
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: "/api/tenants/events"

            // color classes: [ event-blue | event-azure | event-green | event-orange | event-red 

        });
    }


}