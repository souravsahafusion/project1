function ChartFunc(instance) {
    this.instance = instance;
}

ChartFunc.prototype.drawBoundRectangle = function(className) {
    var instance = this.instance;

    style = "stroke:rgb(237, 237, 237);stroke-width:1;fill:transparent";
    var widthRect = instance.chartUpBoundXCoor - instance.chartLowBoundXCoor;
    var heightRect = instance.lowLimitYAxis - instance.upLimitYAxis;

    drawRect = new PlotGraph(instance);
    var rectBound = drawRect.drawRectangle(instance.chartLowBoundXCoor, instance.upLimitYAxis, heightRect, widthRect, className, style);

    return rectBound;

};

ChartFunc.prototype.calculateMappingPoint = function(value) {
    var instance = this.instance;
    var a = instance.minTipValue;
    var b = instance.maxTipValue;
    var c = instance.upLimitYAxis;
    var d = instance.lowLimitYAxis;
    return (d - (value - a) / (b - a) * (d - c));

};