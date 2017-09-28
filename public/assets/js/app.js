app = {

    /// ----------------------------- FIND VACANT, OCCUPIED, TOTAL SF IN TENANT TABLES ----------------------------- ///    

    initFindOccupancy: function() {

        // VARIABLES
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
                console.log(tenantName);

                // VACANCY
                if (tenantName == "Vacant") {

                    result = $(this).closest('td').next().text();
                    result = result.replace(/\,/g, '');
                    vacant += parseFloat(result);
                    sum += parseFloat(result);

                    // OCCUPANCY
                } else {

                    result = $(this).closest('td').next().text();
                    result = result.replace(/\,/g, '');
                    occupied += parseFloat(result);
                    sum += parseFloat(result);
                }
            });

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
        });
    } // CLOSE INITFINDOCCUPANCY

 

}; // CLOSE APP FUNCTION