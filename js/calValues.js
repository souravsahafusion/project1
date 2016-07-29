function CalValues(){
    this.min = 0;
    this.max = 0;
    this.range = 0;
    //stringValue:'',
    this.maxTipValue = 0;
    this.minTipValue = 0;
    this.diffBwTips = 0;
    this.noOfYTips = 0;
    this.noofXTips = 0;

}
var obj = {};
CalValues.prototype.calculateChartOutLines = function (input) {
	obj = input;
	var noOfDatas = obj.data.length;

    if (obj.y_axis_map.length < 1) {
        var arr = [];
        for (var i = 0; i < noOfDatas; i++) {
            arr[i] = Object.keys(obj.data[i]);

        }
        for (var i = 0; i < noOfDatas; i++) {
            for (var j = 0; j < arr[i].length - 1; j++) {
                var value = arr[i][j];
                if (obj.y_axis_map.indexOf(value) < 0) {
                    obj.y_axis_map.push(arr[i][j]);

                }

            }

        }

    }
    
    widthEachChart = obj.chart.width - (obj.chart.width * .5);
    heightEachChart = obj.chart.height * 0.65;
    

    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var chartWidth = obj.chart.width;
    var chartHeight = obj.chart.height;
    var numberOfColCharts = Math.floor(windowWidth / chartWidth);
    console.log(numberOfColCharts + 'numberOfColCharts');
    return numberOfColCharts;
};
CalValues.prototype.findMinAndSetDataValue = function(tempMap) {


    var minimum = obj.data[0][tempMap];
    var i = 0;
    if (typeof minimum == 'undefined') {

        while (true) {
            i++;
            minimum = obj.data[i][tempMap];
            if (typeof minimum !== 'undefined') {
                break;
            }

        }
    }
    /*this.tempMap = tempMap;

    for (var i = 0; i < obj.data.length; i++) {
        //setting value to the object
        var monthValue = this.findMonth(i);
        this.storeValue[monthValue] = obj.data[i][tempMap];
        if (obj.data[i][tempMap] < minimum) {
            minimum = obj.data[i][tempMap];

        }
    }*/
    return minimum;

};
CalValues.prototype.setChartValues = function(tempMap, i){
	var chartModel = [];
 chartModel[i] = new ChartModel();
 chartModel[i].min = this.findMinAndSetDataValue(tempMap);
 console.log(chartModel[i].min); 

};