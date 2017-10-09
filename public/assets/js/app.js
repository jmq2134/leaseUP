app = {

    /// ----------------------------- FIND VACANT, OCCUPIED, TOTAL SF IN TENANT TABLES ----------------------------- ///    

    initFindOccupancy: function() {

        /// FIND OCCUPANCY ================================================================================================================

        // VARIABLES -- OCCUPANCY
        var sum = 0;
        var result = 0;
        var vacant = 0;
        var occupied = 0;
        var sumPer = 0;
        var vacantPer = 0;
        var occupiedPer = 0;

        // FIND VACANT AND OCCUPIED SF BY CHECKING/ADDING VALUES OF TABLE ROWS

        $('tr').each(function() {

            $(this).find('.tenantName').each(function() {

                var tenantName = $(this).text();
                // console.log(tenantName);

                // VACANCY
                if (tenantName == "Vacant") {

                    result = $(this).closest('td').next().text();
                    // console.log(result);
                    result = result.replace(/\,/g, '');
                    // console.log(result);
                    vacant += parseInt(result);
                    sum += parseInt(result);

                    // OCCUPANCY
                } else {

                    result = $(this).closest('td').next().text();
                    // console.log(result);
                    result = result.replace(/\,/g, '');
                    // console.log(result);
                    occupied += parseInt(result);
                    sum += parseInt(result);
                }
            });

        });

        /// FIND PERCENTAGE OCCUPIED OR VACANT
        sumCalc = parseInt((sum / sum) * 100).toFixed(2);
        occupiedCalc = parseInt((occupied / sum) * 100).toFixed(2);
        vacantCalc = parseInt((vacant / sum) * 100).toFixed(2);

        /// FIND PERCENTAGE OCCUPIED OR VACANT
        sumPer = parseFloat((sum / sum) * 100).toFixed(2) + "%";
        occupiedPer = parseFloat((occupied / sum) * 100).toFixed(2) + "%";
        vacantPer = parseFloat((vacant / sum) * 100).toFixed(2) + "%";

        /// FUNCTION TO ADD COMMAS
        function numberWithThousands(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        /// FORMAT SUM, OCCUPIED, VACANT
        var sumFormat = numberWithThousands(sum);
        var occupiedFormat = numberWithThousands(occupied);
        var vacantFormat = numberWithThousands(vacant);

        /// ADD TOTAL SF, OCCUPIED SF, VACANT SF TO GRID
        $('#totalSF').html(sumFormat);
        $('#occupiedSF').html(occupiedFormat);
        $('#vacantSF').html(vacantFormat);

        $('#totalSFper').html(sumPer);
        $('#occupiedSFper').html(occupiedPer);
        $('#vacantSFper').html(vacantPer);


        /// FIND EXPIRATIONS (SF) ===================================================================================================================

        // VARIABLES -- EXPIRATIONS
        var expirations = [];
        var sf = 0;
        var year = 0;
        var reducedObjArr = [];
        var expireObj = [];
        var chartYears = [];

        // FIND CURRENT YEAR
        var currentYear = Date().substr(11, 4);

        // FIND CHART YEARS
        var numYears = 5;

        var chartYears = [];

        // FILL CHART YEARS DEPENDING ON STARTING YEAR & # OF YEARS TO ANALYZE
        for (i = 0; i < numYears; i++) {
            chartYears.push(parseInt(currentYear) + i);
        }


        $('tr').each(function() {

            $(this).find('.leaseEnd').each(function() {

                // FIND EXPIRATION DATE
                var expirationDate = $(this).text();

                // FIND EXPIRATION YEAR
                year = expirationDate.substring(expirationDate.lastIndexOf("/") + 1)

                // FIND SF OF EXPIRATION YEAR
                sf = $(this).closest('td').prev().prev().text();

                // IF YEAR EXISTS IN CHARTYEARS ARRAY, PUT INFO INTO EXPIRATIONS ARRAY
                for (i = 0; i < chartYears.length; i++) {

                    if (parseInt(year) === chartYears[i]) {
                        expirations.push({ year: chartYears[i], sf: parseFloat(sf.replace(/,/g, '')) });
                        // console.log(expirations);
                    } else {
                        expirations.push({ year: chartYears[i], sf: 0 });
                    }
                }

                // SUM SF PER EXPIRATION YEAR iNTO NEW ARRAY -> reducedObjArr
                let counts = expirations.reduce((prev, curr) => {
                    let count = prev.get(curr.year) || 0;
                    prev.set(curr.year, curr.sf + count);
                    return prev;
                }, new Map());

                reducedObjArr = [...counts].map(([year, value]) => {
                    return { year, value }
                })

                // SORT NEW ARRAY BY YEAR
                reducedObjArr.sort(function(a, b) {
                    return a.year - b.year
                })

            });

        }); // close TR

        // console.log(reducedObjArr);

        // PUT SF INTO CHARTSF ARRAY
        var chartSF = [];

        for (j = 0; j < reducedObjArr.length; j++) {
            chartSF.push(reducedObjArr[j].value)
        }

        // console.log(chartSF);

        // FIND CUMULATIVE TURNOVER PER YEAR

        var chartSFcumulative = [];
        chartSF.reduce(function(a, b, i) { return chartSFcumulative[i] = a + b; }, 0);

        // console.log(chartSFcumulative);


        /// FIND EXPIRATIONS ($) ===================================================================================================================

        // VARIABLES -- EXPIRATIONS
        var expirations = [];
        var sf = 0;
        var year = 0;
        var reducedObjArr = [];
        var expireObj = [];
        var chartYears = [];

        // FIND CURRENT YEAR
        var currentYear = Date().substr(11, 4);

        // FIND CHART YEARS
        var numYears = 5;

        var chartYears = [];

        // FILL CHART YEARS DEPENDING ON STARTING YEAR & # OF YEARS TO ANALYZE
        for (i = 0; i < numYears; i++) {
            chartYears.push(parseInt(currentYear) + i);
        }


        $('tr').each(function() {

            $(this).find('.leaseEnd').each(function() {

                // FIND EXPIRATION DATE
                var expirationDate = $(this).text();

                // FIND EXPIRATION YEAR
                year = expirationDate.substring(expirationDate.lastIndexOf("/") + 1)

                // FIND SF OF EXPIRATION YEAR
                Rev = $(this).closest('td').next().next().next().next().text();

                // console.log(Rev);

                // parseFloat(textValue.replace(/[^\d\.]/, ''));

                // IF YEAR EXISTS IN CHARTYEARS ARRAY, PUT INFO INTO EXPIRATIONS ARRAY
                for (i = 0; i < chartYears.length; i++) {

                    if (parseInt(year) === chartYears[i]) {
                        expirations.push({ year: chartYears[i], Rev: parseFloat(Rev.replace(/[^\d.]/g, '')) });
                        // console.log(expirations);
                    } else {
                        expirations.push({ year: chartYears[i], Rev: 0 });
                    }
                }

                // SUM Rev PER EXPIRATION YEAR iNTO NEW ARRAY -> reducedObjArr
                let counts = expirations.reduce((prev, curr) => {
                    let count = prev.get(curr.year) || 0;
                    prev.set(curr.year, curr.Rev + count);
                    return prev;
                }, new Map());

                reducedObjArr = [...counts].map(([year, value]) => {
                    return { year, value }
                })

                // SORT NEW ARRAY BY YEAR
                reducedObjArr.sort(function(a, b) {
                    return a.year - b.year
                })

            });

        }); // close TR

        // console.log(reducedObjArr);

        // PUT Rev INTO CHARTRev ARRAY
        var chartRev = [];

        for (j = 0; j < reducedObjArr.length; j++) {
            chartRev.push(reducedObjArr[j].value)
        }

        // console.log(chartRev);

        // FIND CUMULATIVE TURNOVER PER YEAR

        var chartRevcumulative = [];
        chartRev.reduce(function(a, b, i) { return chartRevcumulative[i] = a + b; }, 0);

        // console.log(chartRevcumulative);

        /// CHARTIST - BAR (SF) ================================================================================================================

        new Chartist.Bar('.ct-barchart', {
            labels: chartYears,
            series: [
                chartSF,
                chartSFcumulative
            ]
        }, {
            seriesBarDistance: 10,
            axisX: {
                offset: 60
            },
            axisY: {
                offset: 80,
                labelInterpolationFnc: function(value) {
                    return numberWithThousands(value);
                },
                scaleMinSpace: 15
            },
            chartPadding: {
                top: 15,
                right: 10,
                bottom: 5,
                left: 10
            },
            height: '300px'
        });

        /// CHARTIST - BAR ($) ================================================================================================================

        new Chartist.Bar('.ct-barchartRev', {
            labels: chartYears,
            series: [
                chartRev,
                chartRevcumulative
            ]
        }, {
            seriesBarDistance: 10,
            axisX: {
                offset: 60
            },
            axisY: {
                offset: 80,
                labelInterpolationFnc: function(value) {
                    return "$" + numberWithThousands(value);
                },
                scaleMinSpace: 15
            },
            chartPadding: {
                top: 15,
                right: 10,
                bottom: 5,
                left: 10
            },
            height: '300px'
        });


        /// CHARTIST - PIE ================================================================================================================

        var chart = new Chartist.Pie('.ct-chart', {
            series: [occupiedCalc, vacantCalc],
            labels: [occupiedPer, vacantPer]
        }, {
            donut: true,
            showLabel: true
        });

        chart.on('draw', function(data) {
            if (data.type === 'slice') {
                // Get the total path length in order to use for dash array animation
                var pathLength = data.element._node.getTotalLength();

                // Set a dasharray that matches the path length as prerequisite to animate dashoffset
                data.element.attr({
                    'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
                });

                // Create animation definition while also assigning an ID to the animation for later sync usage
                var animationDefinition = {
                    'stroke-dashoffset': {
                        id: 'anim' + data.index,
                        dur: 1000,
                        from: -pathLength + 'px',
                        to: '0px',
                        easing: Chartist.Svg.Easing.easeOutQuint,
                        // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
                        fill: 'freeze'
                    }
                };

                // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
                if (data.index !== 0) {
                    animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
                }

                // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
                data.element.attr({
                    'stroke-dashoffset': -pathLength + 'px'
                });

                // We can't use guided mode as the animations need to rely on setting begin manually
                // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
                data.element.animate(animationDefinition, false);
            }
        });

        // For the sake of the example we update the chart every time it's created with a delay of 8 seconds
        chart.on('created', function() {
            if (window.__anim21278907124) {
                clearTimeout(window.__anim21278907124);
                window.__anim21278907124 = null;
            }
            window.__anim21278907124 = setTimeout(chart.update.bind(chart), 10000);
        });


    } // CLOSE INITFINDOCCUPANCY

} // CLOSE APP