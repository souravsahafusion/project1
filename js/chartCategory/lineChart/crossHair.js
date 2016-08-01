function CrossHair(instance) {
    this.instance = instance;
}

CrossHair.prototype.drawCrossHair = function() {
    var instance = this.instance;
    var draw = new PlotGraph(instance);
    var className = "drawCrossHairLines";
    var x = instance.lowLimitXAxis;
    var y1 = instance.lowLimitYAxis;
    var y2 = instance.upLimitYAxis;
    var style = "stroke:rgb(255, 0 , 0);stroke-width:1;";
    var strokedasharray = "3, 2";
    var visibility = "hidden";
    draw.drawLine(x, y1, x, y2, style, className, visibility, strokedasharray);
};