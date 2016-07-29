function DrawXAxis(instance){
this.instance = instance;
}

DrawXAxis.prototype.drawXAxis = function(check, numberOfColCharts, numberOfCharts) {
	var instance = this.instance;
    var chartNo = instance.chartNo;
    lineDraw = new PlotGraph(instance);
    //plot = new PlotGraph(instance);



    var x1 = widthEachChart * distYAxisFromOr; // distance from the origin to the yaxis
    instance.chartLowBoundXCoor = x1;

    var x2 = widthEachChart + (widthEachChart * distYAxisFromOr) /*+ (widthEachChart / 20)*/ ; //the extra divided by 20 added to keep some extra space
    instance.chartUpBoundXCoor = x2;
    var y1 = 0;
    var y2 = 0;
    if (check !== 2) { //check is being calculated many number of times
        instance.yShift = yShiftPer;
        var yShift = instance.yShift;
        y1 = (heightEachChart * yShift);
        y2 = (heightEachChart * yShift);
    } else {
        instance.yShift = yShiftPer;
        var yShift = instance.yShift;
        y1 = (heightEachChart * yShift) + (heightEachChart);
        y2 = (heightEachChart * yShift) + (heightEachChart);
    }
    var style = "stroke:rgb(237, 237, 237);stroke-width:1;";
    var className = "drawXAxis";
    lineDraw.drawLine(x1, y1, x2, y2, style, className);
    //drawTicks
    var numberOfTicks = obj.data.length;
    if (obj.chartType == "line") {
        var temp_x1 = x1 + (shiftXTipLine * widthEachChart); /*this variable is used to set the distance from y-axis to the first plotting point*/
    } else if (obj.chartType == "column") {
        var temp_x1 = x1 + (shiftXTipCol * widthEachChart);
    }

    instance.lowLimitXAxis = temp_x1; //setting the limits from the Tip value
    //var widthEachChart = this.widthEachChart;
    /*
     */
    instance.noofXTips = instance.storeValue.length;
    /*for (i = 0; i < instance.noofXTips; i++) {
        x1 = temp_x1 + (widthEachChart / instance.noofXTips) * (i);
        x2 = temp_x1 + (widthEachChart / instance.noofXTips) * (i);
        instance.upLimitXAxis = x1;
        if (check !== 2) {
            y1 = (heightEachChart * yShift) - 4;
            y2 = (heightEachChart * yShift) + 4;
        } else {
            y1 = (heightEachChart * yShift) + (heightEachChart) - 4;
            y2 = (heightEachChart * yShift) + (heightEachChart) + 4;
        }
        if (obj.chartType == "line") {
            var style = "stroke:rgb(237, 237, 237);stroke-width:1;";
            var className = "axisTicks";
            line.drawLine(x1, y1, x2, y2, style, className);

        }

        //put x-axis label 
        if (check !== 2 && chartNo <= numberOfColCharts) {
            plot.chartDivLabelX(obj.month[i], x1, y2, check);

        }

        if (check == 2 && chartNo > (numberOfCharts - numberOfColCharts)) {
           plot.chartDivLabelX(obj.month[i], x1, y2, check);
        }
    }*/
};