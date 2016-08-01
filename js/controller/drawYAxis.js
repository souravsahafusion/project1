function DrawYAxis(instance) {

    this.instance = instance;

}

DrawYAxis.prototype.drawYAxis = function() {
    var instance = this.instance;
    draw = new PlotGraph(instance);

    var chartNo = instance.chartNo;
    var yShift = instance.yShift;
    var x1 = widthEachChart * distYAxisFromOr;
    var x2 = widthEachChart * distYAxisFromOr;
    //console.log(chartNo + 'chartNo');
    var y1 = (heightEachChart * yShift);
    var y2 = (heightEachChart * yShift) + (heightEachChart);
    var style = "stroke:rgb(237, 237, 237);stroke-width:1;";
    var className = "axisDraw";
    draw.drawLine(x1, y1, x2, y2, style, className);

    //draw ticks
    var noOfYTips = instance.noOfYTips;


    //var heightEachChart = this.heightEachChart;
    var temp_y1 = y1;
    instance.upLimitYAxis = y1; //setting the top limit value of y axis

    var temp_x1 = x1;
    var temp_x2 = x2;
    /*assigning label text to divs + assigning tics and division draw + rectangle for coloring*/
    instance.textLabelId = document.getElementById("text");
    var xl = instance.chartLowBoundXCoor;
    var width = instance.chartUpBoundXCoor - instance.chartLowBoundXCoor;
    var height = heightEachChart / noOfYTips;
    for (i = 0; i < noOfYTips; i++) {
        x1 = temp_x1 - 4;
        x2 = temp_x2 + 4;
        y1 = temp_y1 + (heightEachChart / noOfYTips) * (i);
        y2 = temp_y1 + (heightEachChart / noOfYTips) * (i);

        //drawing ticks
        var style = "";
        var className = "axisTicks";
        draw.drawLine(x1, y1, x2, y2, style, className);
        //drawing divs
        var style = "stroke:rgb(237, 237, 237);stroke-width:1;";
        className = "divLines";
        draw.drawLine(x1, y1, widthEachChart + (widthEachChart * distYAxisFromOr) /* + (widthEachChart / 20)*/ , y2, style, className);
        //writing the labels

        //drawing the rect
        if ((i % 2 == 1)) {

            className = "designRect";
            style = "fill:rgb(247,247,247);";
            draw.drawRectangle(xl, y1, height, width, className, style);
        }

    }
    instance.lowLimitYAxis = y1 + (heightEachChart / noOfYTips);
    for (i = 0; i <= noOfYTips; i++) {
        y2 = temp_y1 + (heightEachChart / noOfYTips) * (i);
        draw.chartDivLabelY(y2, i);
    }

};