function CalValues(){
    this.instance = '';

}
var obj = {};
var widthEachChart = 0;
var heightEachChart = 0;
CalValues.prototype.findYTipsModified = function(diffTenthPow) {

    var instance = this.instance;

    var minValue = instance.minTipValue;
    var maxValue = instance.maxTipValue;
    var diff = instance.diffBwTips;

    for (i = 0; i < 10; i++) {
        var flag = 0;
        if (((diff / 5) % (Math.pow(10, diffTenthPow))) == 0) {

            instance.noOfYTips = 5;
            flag = 1;
            break;

        } else if (((diff / 3) % (Math.pow(10, diffTenthPow))) == 0) {

            instance.noOfYTips = 3;
            flag = 1;
            break;

        } else if (((diff / 4) % (Math.pow(10, diffTenthPow))) == 0) {

            instance.noOfYTips = 4;
            flag = 1;
            break;

        } else if (((diff / 6) % (Math.pow(10, diffTenthPow))) == 0) {

            instance.noOfYTips = 6;
            flag = 1;
            break;

        } else if (((diff / 7) % (Math.pow(10, diffTenthPow))) == 0) {

            instance.noOfYTips = 7;
            flag = 1;
            break;

        }

        diff = diff + Math.pow(10, diffTenthPow);
    }
    instance.maxTipValue = (instance.maxTipValue + (diff - instance.diffBwTips)) / instance.mulTiplyFactor;
    instance.diffBwTips = diff / instance.mulTiplyFactor;
    instance.minTipValue = instance.minTipValue / instance.mulTiplyFactor;
};
CalValues.prototype.findRangeModified = function() {

    var instance = this.instance;

    var minValue = instance.min;
    var lastDigit = minValue % 10;
    if (lastDigit < 0) {
        lastDigit = 10 + lastDigit;
    }

    minValue = minValue - lastDigit;
    var maxValue = instance.max;
    var lastDigit = maxValue % 10;

    if (lastDigit < 0) {
        lastDigit = 10 - lastDigit;
    }
    if (lastDigit !== 0) {

        maxValue = maxValue + (10 - lastDigit) * Math.pow(-1, instance.changeFactorMax);

    }

    var diffBwTips = (maxValue - minValue); // difference negative for negative values
    var padding = diffBwTips / 10;
    var diffTenthPow = 0;

    while (true) {
        if (Math.pow(10, diffTenthPow) < padding) {

            diffTenthPow++;

        } else {
            diffTenthPow--;
            break;
        }
    }

    if (padding < 10) {
        diffTenthPow = 1;
    } else if (padding < 1) {
        diffTenthPow = 0;
    }

    var remMinValue = minValue % (Math.pow(10, diffTenthPow));
    instance.minTipValue = minValue - remMinValue * Math.pow(-1, instance.changeFactorMin);
    var remMaxValue = maxValue % (Math.pow(10, diffTenthPow));

    if (remMaxValue !== 0) {

        instance.maxTipValue = maxValue + ((Math.pow(10, diffTenthPow)) - remMaxValue) * Math.pow(-1, instance.changeFactorMax);

    } else {
        instance.maxTipValue = maxValue;
    }

    instance.diffBwTips = instance.maxTipValue - instance.minTipValue;
    this.findYTipsModified(diffTenthPow);
};
CalValues.prototype.checkingForNegative = function() {

    var instance = this.instance;

    if (instance.min < 0) { //checking for negative values of min and max
        instance.changeFactorMin++; // 1 if only the min is negative

    }
    if (instance.max < 0) {
        instance.changeFactorMax++;
    }

};
CalValues.prototype.positionValues = function() {
    var instance = this.instance;

    var min = instance.min;
    var max = instance.max;
    if ((max - min) < 0.1) {
        // checking decimal values for four digit precision
        instance.mulTiplyFactor = 10000;
        this.scaleValues();


    } else if ((max - min) <= 2) {
        //checking decimal values for two digit precision
        instance.mulTiplyFactor = 100;
        this.scaleValues();


    } else if ((max - min) < 10) {

        instance.mulTiplyFactor = 10;
        this.scaleValues();


    } else {

        this.scaleValues();

    }
};
CalValues.prototype.scaleValues = function() {

    var instance = this.instance;

    instance.min = instance.min * instance.mulTiplyFactor;
    instance.max = instance.max * instance.mulTiplyFactor;
    this.checkingForNegative();
    if (instance.changeFactorMin == 1) {
        instance.min = Math.ceil(instance.min);
    } else {
        instance.min = Math.floor(instance.min);
    }

    if (instance.changeFactorMax == 1) {
        instance.max = Math.floor(instance.max);
    } else {
        instance.max = Math.ceil(instance.max);
    }
};
CalValues.prototype.findMax = function(tempMap) {

    var maximum = obj.data[0][tempMap];
    var i = 0;
    if (typeof maximum == 'undefined') {

        while (true) {
            i++;
            maximum = obj.data[i][tempMap];
            if (typeof maximum !== 'undefined') {
                console.log(maximum + 'initial minimum value');
                break;
            }

        }
    }

    for (var i = 0; i < obj.data.length; i++) {
        if (obj.data[i][tempMap] > maximum) {
            maximum = obj.data[i][tempMap];

        }
    }
    return maximum;

};
CalValues.prototype.findMonth = function(index) {

        var date = obj.data[index]["date"];
        dateObject = new Date(date);
        return dateObject.getMonth();
    };
CalValues.prototype.calculateChartOutLines = function (input) {
    var instance = this.instance;
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
    
    widthEachChart = obj.chart.width - (obj.chart.width * .5); //kept global
    heightEachChart = obj.chart.height * 0.65; //kept global
    

    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var chartWidth = obj.chart.width;
    var chartHeight = obj.chart.height;
    numberOfColCharts =  Math.floor(windowWidth / chartWidth);
    
};
CalValues.prototype.findMinAndSetDataValue = function(tempMap) {
    var instance = this.instance;



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
    instance.tempMap = tempMap;

    for (var i = 0; i < obj.data.length; i++) {
        //setting value to the object
        var monthValue = this.findMonth(i);
        instance.storeValue[monthValue] = obj.data[i][tempMap];
        if (obj.data[i][tempMap] < minimum) {
            minimum = obj.data[i][tempMap];

        }
    }
    return minimum;

};
CalValues.prototype.setChartValues = function(tempMap, i){
 
 chartModel[i] = new ChartModel();
 this.instance = chartModel[i];
 chartModel[i].min = this.findMinAndSetDataValue(tempMap);
 chartModel[i].max = this.findMax(tempMap);
 this.positionValues();
 this.findRangeModified();
/*for (var j = 0; j < obj.data.length; j++) {
        //setting value to the object
       
        console.log(this.instance.storeValue[j]) ;
       
    }
*/
 //console.log(chartModel[i].max);
return this.instance;
 

};
/*CalValues.prototype.calculateMappingPoint = function(value) {
    var instance = this.instance;
    var a = instance.minTipValue;
    var b = instance.maxTipValue;
    var c = instance.upLimitYAxis;
    var d = instance.lowLimitYAxis;
    return (d - (value - a) / (b - a) * (d - c));

};*/
var numberOfColCharts = 0;
var chartModel = [];