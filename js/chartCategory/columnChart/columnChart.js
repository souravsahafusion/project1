function ColumnChart(instance) {

    this.instance = instance;

}

ColumnChart.prototype.initiateDraw = function() {
    var instance = this.instance;
    className = "plotColumnBound";
    var bound = new ChartFunc(instance);
    var rectIns = bound.drawBoundRectangle(className);
    instance.chartType = "column";
    this.plotColumnChart();
    this.selectChartListener(rectIns);
};
ColumnChart.prototype.plotColumnChart = function() {
    var instance = this.instance;
    var draw = new PlotGraph(instance);


    for (i = 0; i < obj.data.length; i++) { /*to be changed later '12' for any number of data i.e. find the last index of the storevalue array*/
        var value = instance.storeValue[i];
        if (typeof value != 'undefined') {
            scaleColChartFactor = obj.scaleColChartFactor / 100;
            var calculate = new ChartFunc(instance);
            var yPointPlot = calculate.calculateMappingPoint(value);
            //console.log(range.length); need to debug
            instance.storeAncorPointsY[i] = yPointPlot;
            var xPointPlot = instance.lowLimitXAxis + (widthEachChart / instance.noofXTips) * (i);
            storeAncorPointsX[i] = Math.floor(xPointPlot);
            var x = xPointPlot - widthEachChart * scaleColChartFactor;
            var y = instance.lowLimitYAxis;
            var heightRect = y - yPointPlot;
            var widthRect = widthEachChart * scaleColChartFactor * 2;
            var style = "fill:rgb(30, 122, 205);stroke-width:3;stroke:rgb(30, 122, 205)";
            var className = "plotColumnGraph";

            var rectIns = draw.drawRectangle(x, yPointPlot, heightRect, widthRect, className, style);
            this.columnChartListener(rectIns, className);
            instance.lastPlottedPointX = xPointPlot;
            instance.lastPlottedPointY = yPointPlot;

            //skipping the 2D array for storing x-y w.r.t month and instead storing the previous x-y coordinates

        }
    }

};


ColumnChart.prototype.columnChartListener = function(rectIns, className) {
    var instance = this.instance;

    rectIns.addEventListener("mousemove", entercoordinates.bind(instance, className));
    /*rectIns.addEventListener("mousemove", function () {
        entercoordinates.call(this, className);  
    });*/

    rectIns.addEventListener("syncCrossHair", columnTrigger);
    rectIns.addEventListener("mouseout", removeToolTip);

    //divNames[i].addEventListener("mousemove", showCoords,false);
    //rect.addEventListener("mouseleave", clearcoor,false);
    instance.toolTipTextIns = document.createElementNS("http://www.w3.org/2000/svg", "text");
    instance.toolTipBoxIns = document.createElementNS("http://www.w3.org/2000/svg", "rect");

};

ColumnChart.prototype.selectChartListener = function(rectIns) {
    var instance = this.instance;
    instance.selectRectIns = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    var _this = instance;
    instance.svg.appendChild(instance.selectRectIns)

    rectIns.addEventListener("mousedown", instantiateDragCol.bind(_this));
    rectIns.addEventListener("mousemove", dragColRect.bind(_this));
    rectIns.addEventListener("mouseup", releaseColRect.bind(_this));
    

};