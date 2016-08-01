function parseData(input) {



    var chartBound = new CalValues();
    chartBound.calculateChartOutLines(input);
    var numberOfCharts = obj.y_axis_map.length;
    var chartArrange = new CalValues();
    chartArrange.customChartArrange();
    
    //console.log(numberOfCharts + 'numberOfCharts');
    /*for (var i = 0; i < numberOfCharts; i++) {
            var tempMap = obj.y_axis_map[i];
            //console.log(tempMap+ 'first step');
            range2[i] = new CalValues();
            range2[i].min = range2[i].findMinAndSetDataValue(tempMap);
            //console.log(range[i].min + 'minimum calculated from different data values');
            range2[i].max = range2[i].findMax(tempMap, i);
        }
*/
    var expression = obj.chart_order_func;
        switch (expression) {
            case "minimum":
                arrangeOnMin();
                break;
            case "maximum":
                arrangeOnMax();
                break;

        }
    for (var i = 0; i < numberOfCharts; i++) {
        var tempMap = obj.y_axis_map[i];
        //console.log(tempMap+ 'first step');
        var range = [];
        range[i] = new CalValues();
        var instance = range[i].setChartValues(tempMap, i);

        range[i] = new DrawChart(instance, i);
        range[i].initiateGraph();

    }


}
parseData(jsonData);
var range = [];
