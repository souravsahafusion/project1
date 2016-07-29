function ChartModel(){
	this.chartType = '';
    this.min = 0;
    this.max = 0;
    this.range = 0;
    //stringValue:'',
    this.maxTipValue = 0;
    this.minTipValue = 0;
    this.diffBwTips = 0;
    this.noOfYTips = 0;
    this.noofXTips = 0;
    this.chartId = '';
    this.chartNo = 0;
    this.upLimitXAxis = 0;
    this.lowLimitXAxis = 0;
    this.upLimitYAxis = 0;
    this.lowLimitYAxis = 0;
    this.storeValue = [];
    this.storeAncorPointsX = [];
    this.storeAncorPointsY = [];
    this.tempMap = '';
    this.lastPlottedPointX = 0;
    this.lastPlottedPointY = 0;
    this.textLabelId = '';
    this.changeFactorMin = 0;
    this.changeFactorMax = 0;
    this.mulTiplyFactor = 1;
    this.crossHairLineIns = '';
    this.chartLowBoundXCoor = 0;
    this.chartUpBoundXCoor = 0;
    this.toolTipTextIns = '';
    this.toolTipBoxIns = '';
    this.yShift = 0;
    this.selectRectIns = '';
    this.svg = '';
    this.numberOfColCharts = 0;
    this.numberOfCharts = 0;
    

}