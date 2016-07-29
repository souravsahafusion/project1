function PlotGraph(instance){

this.instance = instance;


}
PlotGraph.prototype.drawLine = function(x1, y1, x2, y2, style, className, visibility, strokedasharray) {
	var instance = this.instance;
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("class", className);
    line.setAttribute("stroke-dasharray", strokedasharray);
    line.setAttribute("style", style);
    if (typeof visibility !== 'undefined') {
        line.setAttribute("visibility", "hidden");

    }
    console.log(instance.svg );
    instance.svg.appendChild(line);

};
PlotGraph.prototype.drawRectangle = function(x, y, height, width, className, style) {
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttributeNS(null, 'x', x);
    rect.setAttributeNS(null, 'y', y);
    rect.setAttributeNS(null, 'height', height);
    rect.setAttributeNS(null, 'width', width);
    rect.setAttribute("class", className);
    rect.setAttribute("style", style);
    this.instance.svg.appendChild(rect);
    return rect;


};
PlotGraph.prototype.plotTipCirle = function(xPointPlot, yPointPlot, className) {
    var circleTip = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circleTip.setAttribute("cx", xPointPlot); // setting circle 
    console.log(xPointPlot);
    circleTip.setAttribute("cy", yPointPlot); // coordinates
    circleTip.setAttribute("r", 5);
    circleTip.setAttribute("class", "ancorTipCicle");
    style = "stroke:blue; stroke-width:2;fill:white;";
    circleTip.setAttribute("style", style);
    this.instance.svg.appendChild(circleTip);

};
PlotGraph.prototype.chartDivLabelX = function(textValue, x, y, check) {
	var instance = this.instance;
    var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
    var x = x - (widthEachChart / 70);
    var y = y + (heightEachChart / 40);

    var transform = '';
    textElement.innerHTML = textValue;
    if (check !== 2) {
        y = y - 20;
        transform = "rotate(0 " + x + "," + y + ")";

    } else {
        transform = "rotate(90 " + x + "," + y + ")";
    }
    textElement.setAttribute("x", x);
    textElement.setAttribute("y", y);

    var fontSize = heightEachChart * .05;
    textElement.setAttribute("font-size", fontSize);
    textElement.setAttribute("transform", transform);
    instance.svg.appendChild(textElement);

};