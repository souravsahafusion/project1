function DrawChart(instance, index){

this.instance = instance;
this.index = index;

}
DrawChart.prototype.drawChartOutline = function() {
	var instance = this.instance;
	
	console.log(numberOfColCharts);
	var numberOfCharts = obj.y_axis_map.length;
	
    instance.chartId = document.getElementById("chart");
    instance.chartNo = this.index + 1;

    var check = 1;

    if (numberOfCharts % 2 == 0) {
        check = 2; //even
    }
    
    var xAxis = new DrawXAxis(instance);
    xAxis.drawXAxis(check, numberOfCharts);

    var yAxis = new DrawYAxis(instance);
    yAxis.drawYAxis();
    //this.addChartName(chartNo, check); //this chartNo is the index value of the array 

    //this.addXLabel();

};
DrawChart.prototype.createSVG = function() {
	var instance = this.instance;

    instance.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
   
    instance.svg.setAttribute("height", obj.chart.height);
    instance.svg.setAttribute("width", obj.chart.width);
    chartId = document.getElementById("chart");
    instance.svg.setAttribute("class", "chartSVG");
    chartId.appendChild(instance.svg);

};
DrawChart.prototype.initiateGraph = function(){
	this.createSVG();
	this.drawChartOutline();
	var instance = this.instance;
	var expression = obj.chartType;
    switch (expression) {
        case "line":
            drawChart = new LineChart(instance);
            drawChart.initiateDraw();
            break;
        case "column":
            drawChart = new ColumnChart(instance);
            drawChart.initiateDraw();

            
            break;

    }
	 


	

};

var crossHairInstance = '';
var storeAncorPointsX = [];
var flag = 0;
var flagRemoveColor = 0;
var shiftXTipLine = .01; //first point plot shift on x-axis from y-axis for column chart
var shiftXTipCol = .07; //first point plot shift on x-axis from y-axis for column chart
var distYAxisFromOr = .2; //widthEachChart * distYAxisFromOr
var yShiftPer = .25;
var chartNameBoxShift = .03;
var chartNameBoxHtFactor = .15;
