
function parseData(input) {
     chartBound = new CalValues();
     var numberOfColCharts =chartBound.calculateChartOutLines(input);
     var numberOfCharts = obj.y_axis_map.length;
     console.log(numberOfCharts + 'numberOfCharts');

    /*for (var i = 0; i < numberOfCharts; i++) {
        var tempMap = obj.y_axis_map[i];
        //console.log(tempMap+ 'first step');
        range2[i] = new Tip();
        range2[i].min = range2[i].findMinAndSetDataValue(tempMap);
        //console.log(range[i].min + 'minimum calculated from different data values');
        range2[i].max = range2[i].findMax(tempMap, i);
    }*/
    /*
    var expression = obj.chart_order_func;
    switch (expression) {
        case "minimum":
            arrangeOnMin();
            break;
        case "maximum":
            arrangeOnMax();
            break;

    }
    */
    for (var i = 0; i < numberOfCharts; i++) {
        var tempMap = obj.y_axis_map[i];
        //console.log(tempMap+ 'first step');
        var range = [];
        range[i] = new CalValues();
        range[i].setChartValues(tempMap, i);
        /*range[i].min = range[i].indfMinAndSetDataValue(tempMap);
        //console.log(range[i].min + 'minimum calculated from different data values');
        range[i].max = range[i].findMax(tempMap, i);*/
    }
    //console.log(range[i].max + 'maximum ' + tempMap);

    /*for (var i = 0; i < numberOfCharts; i++) {
        if (range[i].max !== range[i].min) { //skipping if there is only one value

            range[i].positionValues();
            range[i].createSVG();
            range[i].findRangeModified();
            //console.log("calling cross hair");

            //range[i].findYTips();

            range[i].drawChartOutline(i, numberOfCharts, numberOfColCharts);

            if (obj.chartType == "line") {
                var className = "lineBound";
                var rectIns = range[i].drawBoundRectangle(className);
                range[i].chartType = "line";
                range[i].plotLineChart();
                range[i].drawDivRectangle(i);
                range[i].drawCrossHair();
                //range[i].selectLineListener(rectIns);

            } else if (obj.chartType == "column") {
                className = "plotColumnBound"
                var rectIns = range[i].drawBoundRectangle(className);
                range[i].chartType = "column";
                range[i].plotColumnChart();
                range[i].selectChartListener(rectIns);


            }

        }

    }

*/


}
parseData(jsonData);
var range = [];
var range2 = [];
