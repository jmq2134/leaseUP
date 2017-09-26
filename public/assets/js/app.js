$(document).ready(function() {


    /// ----------------------------- FIND VACANT, OCCUPIED, TOTAL SF IN TENANT TABLES ----------------------------- ///	

    var sum = 0;
    var result = 0;
    var vacant = 0;
    var occupied = 0;

    $('tr').each(function() {

        $(this).find('.tenantName').each(function() {

            var tenantName = $(this).text();

            if (tenantName == "Vacant") {

                result = $(this).closest('td').next().text();
                vacant += parseFloat(result);
                sum += parseFloat(result);

            } else {

                result = $(this).closest('td').next().text();
                occupied += parseFloat(result);
                sum += parseFloat(result);

            }

        });

        console.log("Sum: " + sum);
        console.log("Vacant: " + vacant);
        console.log("Occupied: " + occupied);

        // ADD TOTAL SF TO SUM ROW
        $('.tenantSFsum', this).html(sum);

    });
});


    /// ----------------------------- CENTER CHARTS ----------------------------- ///	


initCharts: function() {


    /*  **************** OCCUPANCY / VACANCY - Pie Chart ******************** */


    var dataPreferences = {
        series: [
            [25, 30, 20, 25]
        ]
    };

    var optionsPreferences = {
        donut: true,
        donutWidth: 40,
        startAngle: 0,
        height: "245px",
        total: 100,
        showLabel: false,
        axisX: {
            showGrid: false
        }
    };

    Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

    Chartist.Pie('#chartPreferences', {
        labels: ['62%', '32%'],
        series: [62, 32]
    });


    /*  **************** LEASE ROLLOVER  - Bar Chart ******************** */

    /// GET CURRENT YEAR


    /// NUMBER OF YEARS TO DISPLAY

    var dataViews = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
        ]
    };

    var optionsViews = {
        seriesBarDistance: 10,
        classNames: {
            bar: 'ct-bar ct-azure'
        },
        axisX: {
            showGrid: false
        }
    };

    var responsiveOptionsViews = [
        ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
                labelInterpolationFnc: function(value) {
                    return value[0];
                }
            }
        }]
    ];

    Chartist.Bar('#chartViews', dataViews, optionsViews, responsiveOptionsViews);



    var data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
            [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
        ]
    };

    var options = {
        seriesBarDistance: 10,
        axisX: {
            showGrid: false
        },
        height: "245px"
    };

    var responsiveOptions = [
        ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
                labelInterpolationFnc: function(value) {
                    return value[0];
                }
            }
        }]
    ];

    Chartist.Bar('#chartActivity', data, options, responsiveOptions);

},