function LineChart(instance) {

    this.instance = instance;

}
LineChart.prototype.initiateDraw = function() {
    var instance = this.instance;
    var className = "lineBound";
    var bound = new ChartFunc(instance);
    var rectIns = bound.drawBoundRectangle(className);
    instance.chartType = "line";
    this.plotLineChart();
    this.drawDivRectangle(i); /*rectangle is not required since we don't need to restrict the crooshair, infact no crosshair is there*/
    var draw = new CrossHair(instance);
    draw.drawCrossHair();
};


LineChart.prototype.plotLineChart = function() {
    var instance = this.instance;
    var draw = new PlotGraph(instance);

    var flagFirstPoint = 0;
    for (i = 0; i < obj.data.length; i++) { /*to be changed later '12' for any number of data i.e. find the last index of the storevalue array*/
        var value = instance.storeValue[i];
        if (typeof value != 'undefined') {
            var calculate = new ChartFunc(instance);
            var yPointPlot = calculate.calculateMappingPoint(value);
            //console.log(range.length); need to debug
            instance.storeAncorPointsY[i] = yPointPlot;
            var xPointPlot = instance.lowLimitXAxis + (widthEachChart / instance.noofXTips) * (i);
            storeAncorPointsX[i] = Math.floor(xPointPlot);

            if (flagFirstPoint != 0) //skipping the first plot
            {
                var style = "stroke:rgb(29, 121, 204);stroke-width:6";
                var className = "plotGraph";
                draw.drawLine(instance.lastPlottedPointX, instance.lastPlottedPointY, xPointPlot, yPointPlot, style, className);
                className = "ancorTipCicle";

                draw.plotTipCirle(instance.lastPlottedPointX, instance.lastPlottedPointY);

            }
            instance.lastPlottedPointX = xPointPlot;
            instance.lastPlottedPointY = yPointPlot;

            flagFirstPoint = 1;
            //skipping the 2D array for storing x-y w.r.t month and instead storing the previous x-y coordinates

        }

    }
    draw.plotTipCirle(xPointPlot, yPointPlot);

};


LineChart.prototype.drawDivRectangle = function(index) {
    /*var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");*/
    var instance = this.instance;
    var draw = new PlotGraph(instance);
    var x = instance.lowLimitXAxis;
    var y = instance.upLimitYAxis;
    var heightRect = instance.lowLimitYAxis - instance.upLimitYAxis;
    var widthRect = instance.upLimitXAxis - instance.lowLimitXAxis;
    var rectangleDiv = 'svgDivs';
    style = "fill:transparent";

    var rect = draw.drawRectangle(x, y, heightRect, widthRect, rectangleDiv, style);

    rect.addEventListener("mousemove", entercoordinates.bind(instance, rectangleDiv));
    /*rect.addEventListener("mousemove", function () {
            entercoordinates.call(this, rectangleId);  
        });*/
    rect.addEventListener("syncCrossHair", showCoords, false);
    rect.addEventListener("syncCrossHair", displayCrossHair, false);
    //divNames[i].addEventListener("mousemove", showCoords,false);
    rect.addEventListener("mouseleave", clearcoor, false);
    rect.addEventListener("mouseleave", removeCrossHair, false);
    instance.toolTipTextIns = document.createElementNS("http://www.w3.org/2000/svg", "text"); //might need to be added in column as well
    instance.toolTipBoxIns = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    instance.selectRectIns = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    var _this = instance;
    instance.svg.appendChild(instance.selectRectIns);

    rect.addEventListener("mousedown", instantiateDragLine.bind(_this));
    rect.addEventListener("mousemove", dragLineRect.bind(_this));
    rect.addEventListener("mouseup", releaseLineRect.bind(_this));


    //svg chart area bound with x y axis
    /**/

};