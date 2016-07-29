function LineChart(instance){

this.instance = instance;

}
LineChart.prototype.initiateDraw = function(){
	var instance = this.instance;
	var className = "lineBound";
    var rectIns = this.drawBoundRectangle(className);
    instance.chartType = "line";
    this.plotLineChart();
    //range[i].drawDivRectangle(i); /*rectangle is not required since we don't need to restrict the crooshair, infact no crosshair is there*/
    //range[i].drawCrossHair();
};

LineChart.prototype.drawBoundRectangle = function(className) {
	var instance = this.instance;

    style = "stroke:rgb(237, 237, 237);stroke-width:1;fill:transparent";
    var widthRect = instance.chartUpBoundXCoor - instance.chartLowBoundXCoor;
    var heightRect = instance.lowLimitYAxis - instance.upLimitYAxis;

    drawRect = new PlotGraph(instance);
    var rectBound = drawRect.drawRectangle(instance.chartLowBoundXCoor, instance.upLimitYAxis, heightRect, widthRect, className, style);

    return rectBound;

};
LineChart.prototype.plotLineChart = function() {
	var instance = this.instance;
	var draw = new PlotGraph(instance);
	
    var flagFirstPoint = 0;
    for (i = 0; i < obj.data.length; i++) { /*to be changed later '12' for any number of data i.e. find the last index of the storevalue array*/
        var value = instance.storeValue[i];
        if (typeof value != 'undefined') {
        	//var calculate = new CalVaues();
            var yPointPlot = this.calculateMappingPoint(value);
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


LineChart.prototype.calculateMappingPoint = function(value) {
    var instance = this.instance;
    var a = instance.minTipValue;
    var b = instance.maxTipValue;
    var c = instance.upLimitYAxis;
    var d = instance.lowLimitYAxis;
    return (d - (value - a) / (b - a) * (d - c));

};