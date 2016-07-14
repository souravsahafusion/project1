    var obj = {};
    var heightEachChart = 0; 
    var widthEachChart = 0;
    function tip() {

        this.min = 0;
        this.max = 0;
        this.range = 0;
        //stringValue:'',
        this.maxTipValue = 0;
        this.minTipValue = 0;
        this.diffBwTips = 0;
        this.noOfYTips = 0;
        this.noofXTips = 0;
        //heightEachChart: 400,
        //widthEachChart: 800,
        this.chartId = '';
        this.chartNo = 0;
        this.upLimitXAxis = 0;
        this.lowLimitXAxis = 0;
        this.upLimitYAxis = 0;
        this.lowLimitYAxis = 0;
        this.storeValue = [];
        this.tempMap = '';
        this.lastPlottedPointX = 0;
        this.lastPlottedPointY = 0;
        this.textLabelId = '';
    }
        tip.prototype.findMinAndSetDataValue = function(tempMap) {
            if (typeof tempMap !== undefined) {
                var minimum = obj.data[0][tempMap];
                this.tempMap = tempMap;




                for (var i = 0; i < obj.data.length; i++) {
                    //setting value to the object
                    var monthValue = this.findMonth(i);
                    this.storeValue[monthValue] = obj.data[i][tempMap];
                    //console.log(monthValue + 'monthValue');
                    //console.log(this.storeValue[monthValue]);
                    if (obj.data[i][tempMap] < minimum) {
                        minimum = obj.data[i][tempMap];

                    }
                    //console.log(obj.data[i][tempMap]);

                }
                return minimum;
            } else {

            }

        };
        tip.prototype.findMax = function(tempMap) {
            if (typeof tempMap !== undefined) {
                var maximum = obj.data[0][tempMap];



                for (var i = 0; i < obj.data.length; i++) {
                    if (obj.data[i][tempMap] > maximum) {
                        maximum = obj.data[i][tempMap];

                    }
                    //console.log(obj.data[i][tempMap]);

                }
                return maximum;
            } else {

            }

        };
        tip.prototype.findRange = function() {

            var minValue = Math.floor(this.min);
            var lastTwoMinDigit = minValue % 100;
            this.minTipValue = minValue - lastTwoMinDigit;
            var maxValue = Math.ceil(this.max);
            var lastTwoMaxDigit = maxValue % 100;
            if (lastTwoMaxDigit !== 0) {
                this.maxTipValue = this.max + (100 - lastTwoMaxDigit);
            } else {
                this.maxTipValue = this.max + (lastTwoMaxDigit);
            }

            this.diffBwTips = this.maxTipValue - this.minTipValue;
            this.findYTips();


            //console.log(this.minTipValue);
            //console.log(this.maxTipValue);
            //console.log(this.diffBwTips + 'diffBwTips actual');
            //console.log(minValue);


        };
        tip.prototype.checkingForNegative = function(){

            var changeFactor = 0;
            if(this.min < 0 || this.max < 0) //checking for negative values of min and max
                {
                    changeFactor++;  // 1 if only the min is negative
                    if(this.max < 0)
                    {
                        changeFactor++;    // 2 if both min and max are negative
                    }
                    
                }
            return changeFactor;    
        };
        tip.prototype.findRangeModified = function(multiplyFactor, changeFactor)
        {
            var minValue = this.min * multiplyFactor;
            var maxValue = this.max * multiplyFactor;
            if(changeFactor == 1){ //only minimum negative

                minValue = minValue * -1;

            }else if(changeFactor == 2){

                minValue = minValue * -1;
                maxValue = maxValue * -1;
            }
            
            var temp1 = minValue % 10;
            var tempMinValue = minValue - temp1;
            var temp2 = maxValue % tempMinValue;
            var temp3 = minValue - temp2;
            var tempMaxValue = maxValue + temp3;

            if(changeFactor == 0){

                this.minTipValue = tempMinValue / multiplyFactor;
                this.maxTipValue = tempMaxValue / multiplyFactor;

            }else if(changeFactor == 1){ //only minimum negative

                this.minTipValue = tempMinValue / multiplyFactor * -1;
                this.maxTipValue = tempMaxValue / multiplyFactor;

            }else if(changeFactor == 2) {

                this.minTipValue = tempMinValue / multiplyFactor * -1;
                this.maxTipValue = tempMaxValue / multiplyFactor * -1;

            }



        };
        tip.prototype.positionValues =  function(){

            var multiplyFactor = 1;
            var changeFactor = 0;
            if((Math.floor(this.min) - Math.ceil(this.max))<=2 ){   
                //checking decimal values for two digit precision
               multiplyFactor = 100;
               changeFactor = this.checkingForNegative();

            }else if((this.max - this.min)<0.1){ 
                // checking decimal values for four digit precision
                multiplyFactor = 10000;
                changeFactor = this.checkingForNegative();




            }else if((this.max - this.min)<300){
                
                changeFactor = this.checkingForNegative();

            }else{

                changeFactor = this.checkingForNegative();
                this.findRange();

            }
            this.diffBwTips = this.maxTipValue - this.minTipValue;
            

        };
        tip.prototype.findYTipsModified = function()
        {

        };
        
        tip.prototype.findYTips = function() {
            var diffBwTips = this.diffBwTips;
            var tempDiffBwTips = diffBwTips + 100;
            if ((diffBwTips / 5) % 100 == 0) {
                this.noOfYTips = 5;

            } else if ((diffBwTips / 3) % 100 == 0) {
                this.noOfYTips = 3;

            } else if ((diffBwTips / 4) % 100 == 0) {
                this.noOfYTips = 4;
            } else if ((diffBwTips / 7) % 100 == 0) {
                this.noOfYTips = 7;
            } else if ((diffBwTips / 3) % 50 == 0) {
                this.noOfYTips = 3;

            } else if ((diffBwTips / 4) % 50 == 0) {
                this.noOfYTips = 4;
            } else if ((diffBwTips / 7) % 50 == 0) {
                this.noOfYTips = 7;
            } else if ((tempDiffBwTips / 5) % 100 == 0) {
                this.maxTipValue = this.maxTipValue + tempDiffBwTips - diffBwTips;
                this.diffBwTips = this.diffBwTips + tempDiffBwTips - diffBwTips;
                this.noOfYTips = 5;

            } else if ((tempDiffBwTips / 3) % 100 == 0) {
                this.maxTipValue = this.maxTipValue + tempDiffBwTips - diffBwTips;
                this.diffBwTips = this.diffBwTips + tempDiffBwTips - diffBwTips;
                this.noOfYTips = 3;

            } else if ((tempDiffBwTips / 4) % 100 == 0) {
                this.maxTipValue = this.maxTipValue + tempDiffBwTips - diffBwTips;
                this.diffBwTips = this.diffBwTips + tempDiffBwTips - diffBwTips;
                this.noOfYTips = 4;

            } else if ((tempDiffBwTips / 7) % 100 == 0) {
                this.maxTipValue = this.maxTipValue + tempDiffBwTips - diffBwTips;
                this.diffBwTips = this.diffBwTips + tempDiffBwTips - diffBwTips;
                this.noOfYTips = 7;
                tempDiffBwTips = tempDiffBwTips + 100;

            } else if ((tempDiffBwTips / 5) % 100 == 0) {
                this.maxTipValue = this.maxTipValue + tempDiffBwTips - diffBwTips;
                this.diffBwTips = this.diffBwTips + tempDiffBwTips - diffBwTips;
                this.noOfYTips = 5;

            } else if ((tempDiffBwTips / 3) % 100 == 0) {
                this.maxTipValue = this.maxTipValue + tempDiffBwTips - diffBwTips;
                this.diffBwTips = this.diffBwTips + tempDiffBwTips - diffBwTips;
                this.noOfYTips = 3;

            } else if ((tempDiffBwTips / 4) % 100 == 0) {
                this.maxTipValue = this.maxTipValue + tempDiffBwTips - diffBwTips;
                this.diffBwTips = this.diffBwTips + tempDiffBwTips - diffBwTips;
                this.noOfYTips = 4;

            } else {

                this.noOfYTips = 5;

            }
            //console.log(this.diffBwTips + ' diffBwtips modified');
            //console.log(this.maxTipValue + 'maxTipValue modified');
            //console.log(this.noOfYTips);
            //console.log(this.diffBwTips / this.noOfYTips + 'eachdivrange');
            //console.log(this.diffBwTips / this.noOfYTips + 'each tip range');

        };
        tip.prototype.findMonth = function(index) {

            var date = obj.data[index]["date"];
            //console.log(date);
            dateObject = new Date(date);
            return dateObject.getMonth();
            //console.log(month[this.monthValue]);
        };
        tip.prototype.drawLine = function(x1, y1, x2, y2, style,className) {
            var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x1);
            line.setAttribute("y1", y1);
            line.setAttribute("x2", x2);
            line.setAttribute("y2", y2);
            line.setAttribute("class",className);
            line.setAttribute("style", style);
            //console.log(this.chartId);
            this.chartId.appendChild(line);



        };
        tip.prototype.chartDivLabelY = function(y, index) {
            var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
            var x = widthEachChart / 16;
            var y = y;
            var fontSize  = widthEachChart / 45;
            var textValue = this.maxTipValue - (this.diffBwTips * index / this.noOfYTips);
            textElement.setAttribute("x", x);
            textElement.setAttribute("y", y);
            textElement.innerHTML = textValue;
            textElement.setAttribute("font-size",fontSize);
            //textElement.setAttribute("style", style);
            //console.log(y + 'label');
            this.chartId.appendChild(textElement);




        };
        tip.prototype.chartDivLabelX = function(textValue, x, y) {
            var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
            var x = x - (widthEachChart / 70);
            var y = y + (heightEachChart / 40);
            textElement.setAttribute("x", x);
            textElement.setAttribute("y", y);
            textElement.innerHTML = textValue;
            this.chartId.appendChild(textElement);




        };
        tip.prototype.addText = function(x, y, textValue,transform)
        {
            var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
            textElement.setAttribute("x", x);
            textElement.setAttribute("y", y);
            textElement.innerHTML = textValue;
            textElement.setAttribute("transform",transform);
            this.chartId.appendChild(textElement);
            //console.log(x +' xvalue' + y + ' yvalue' + textValue + 'textValue');

        };
        tip.prototype.drawXAxis = function() {
            var chartNo = this.chartNo;
            var x1 = widthEachChart / 5; // distance from the origin to the yaxis
            console.log(widthEachChart + 'widthEachChart');
            var x2 = widthEachChart + (widthEachChart / 5) + (widthEachChart / 20); //the extra divided by 20 added to keep some extra space
            var y1 = (heightEachChart / 4) + (heightEachChart * chartNo) + (chartNo - 1) * (heightEachChart / 8);
            var y2 = (heightEachChart / 4) + (heightEachChart * chartNo) + (chartNo - 1) * (heightEachChart / 8);
            var style = "stroke:rgb(255,0,0);stroke-width:1;fill:black";
            var className = "drawXAxis";
            this.drawLine(x1, y1, x2, y2, style,className);

            //drawTicks
            var numberOfTicks = obj.data.length;

            //console.log(numberOfTicks + 'numberOfTicks');
            var temp_x1 = x1 + (widthEachChart / 70);
            this.lowLimitXAxis = temp_x1; //setting the limits from the tip value
            //var widthEachChart = this.widthEachChart;
            /*
            */
           
            this.noofXTips = this.storeValue.length;
            console.log(this.noofXTips + 'noofXTips' + this.storeValue.length);
            for (i = 0; i < this.noofXTips; i++) {

                x1 = temp_x1 + (widthEachChart / this.noofXTips) * (i);
                x2 = temp_x1 + (widthEachChart / this.noofXTips) * (i);
                this.upLimitXAxis = x1;
                y1 = (heightEachChart / 4) + (heightEachChart * chartNo) - 4 + (chartNo - 1) * (heightEachChart / 8);
                y2 = (heightEachChart / 4) + (heightEachChart * chartNo) + 4 + (chartNo - 1) * (heightEachChart / 8);
                var style = "stroke:rgb(0,0,230);stroke-width:1";
                //
                var className = "axisTicks";
                this.drawLine(x1, y1, x2, y2, style,className);

                //put x-axis label 
                //console.log(obj.month[i] + 'monthValue');
                

                if (chartNo == obj.y_axis_map.length) {
                    this.chartDivLabelX(obj.month[i], x1, y2);
                }
                


            }
           


        };
        tip.prototype.drawYAxis = function()

        {
            var chartNo = this.chartNo;
            var x1 = widthEachChart / 5;
            var x2 = widthEachChart / 5;
            //console.log(chartNo + 'chartNo');
            var y1 = (heightEachChart / 4) + (heightEachChart * (chartNo - 1)) + (chartNo - 1) * (heightEachChart / 8); //15 used to give space between charts
            var y2 = (heightEachChart / 4) + (heightEachChart * chartNo) + (chartNo - 1) * (heightEachChart / 8);
            var style = "stroke:rgb(255,0,0);stroke-width:1;fill:black";
            var className = "axisDraw";
            this.drawLine(x1, y1, x2, y2, style, className);

            //draw ticks
            var noOfYTips = this.noOfYTips;
            //var heightEachChart = this.heightEachChart;
            var temp_y1 = y1;
            this.upLimitYAxis = y1; //setting the top limit value of y axis
            //console.log(this.upLimitYAxis + 'upLimitYAxis');
            var temp_x1 = x1;
            var temp_x2 = x2;
            //assigning label text to divs + assigning tics and division draw
            this.textLabelId = document.getElementById("text");
            for (i = 0; i < noOfYTips; i++) {
                x1 = temp_x1 - 4;
                x2 = temp_x2 + 4;
                y1 = temp_y1 + (heightEachChart / noOfYTips) * (i);
                y2 = temp_y1 + (heightEachChart / noOfYTips) * (i);

                //drawing ticks
                var style = "stroke:rgb(0,0,230);stroke-width:1";
                var className = "axisTicks";
                this.drawLine(x1, y1, x2, y2, style, className);
                //drawing divs
                var style = "stroke:rgb(0,0,230);stroke-width:1";
                className = "divLines";
                this.drawLine(x1, y1, widthEachChart + (widthEachChart / 5) + (widthEachChart / 20), y2, style,className);
                //writing the labels



            }
            this.lowLimitYAxis = y1 + (heightEachChart / noOfYTips); //one extra added for temporary purpose
            //this.lowLimitYAxis = y1;
            //console.log(this.lowLimitYAxis + 'lowLimitYAxis');
            for (i = 0; i <= noOfYTips; i++) {
                y2 = temp_y1 + (heightEachChart / noOfYTips) * (i); //+ i * 15;
                this.chartDivLabelY(y2, i);
            }




        };
        tip.prototype.calculateMappingPoint = function(value) {
            var a = this.minTipValue;
            var b = this.maxTipValue;
            //console.log(a + ' '+ b);
            var c = this.upLimitYAxis;
            var d = this.lowLimitYAxis;
            return (d - (value - a) / (b - a) * (d - c));

        };
        tip.prototype.plotTipCirle = function(xPointPlot, yPointPlot) {
            var circleTip = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            //var style = "stroke:rgb(255,0,0);stroke-width:1;fill:black";
            circleTip.setAttribute("cx", xPointPlot); // setting circle 
            circleTip.setAttribute("cy", yPointPlot); // coordinates
            circleTip.setAttribute("r", 3);
            circleTip.setAttribute("class", circleTip);
            //circleTip.setAttribute("style", style);
            this.chartId.appendChild(circleTip);

        };
        tip.prototype.plotGraph = function() {
            var flagFirstPoint = 0;
            for (i = 0; i < 12; i++) {   /*to be changed later '12' for any number of data i.e. find the last index of the storevalue array*/
                var value = this.storeValue[i];
                //console.log(this.lastPlottedPointX + ' ' + this.lastPlottedPointY + ' ' + this.tempMap + ' lastpoint ');
                if (typeof value != 'undefined')
                {
                    var yPointPlot = this.calculateMappingPoint(value);
                    //var widthEachChart = this.widthEachChart;
                    //var numberOfTicks = obj.data.length;
                    var xPointPlot = this.lowLimitXAxis + (widthEachChart / this.noofXTips) * (i);
                    //console.log(xPointPlot + ' xPointPlot ');
                    //this.lastPlottedPointY = this.lowLimitYAxis - this.lastPlottedPointY;
                    //yPointPlot = this.lowLimitYAxis - yPointPlot;
                    this.plotTipCirle(xPointPlot, yPointPlot);

                    if (flagFirstPoint != 0) //skipping the first plot
                    {

                        //console.log(this.lowLimitYAxis);


                        //console.log(this.lastPlottedPointX + ' ' + this.lastPlottedPointY + ' ' + this.tempMap + ' lastpoint ');
                        //console.log(xPointPlot + ' ' + yPointPlot + ' ' + this.tempMap);
                        var style = "stroke:rgb(105,105,105);stroke-width:3;";
                        var className  = "plotGraph";
                        this.drawLine(this.lastPlottedPointX, this.lastPlottedPointY, xPointPlot, yPointPlot, style,className);



                    }
                    this.lastPlottedPointX = xPointPlot;
                    this.lastPlottedPointY = yPointPlot;
                    flagFirstPoint = 1;
                    //skipping the 2D array for storing x-y w.r.t month and instead storing the previous x-y coordinates

                }
                


            }
            //this.lastPlottedPointY = undefined;
            //this.lastPlottedPointX = undefined;



        };
        tip.prototype.addChartName = function(chartNo)
        {
            var chartName = obj.y_axis_map[chartNo];
            var x = widthEachChart / 70;
            var y = (this.upLimitYAxis + this.lowLimitYAxis) / 2;
            
            var transform = "rotate(270 " + x + "," + y + ")";
            this.addText(x, y, chartName, transform);

            
            //console.log('addChartName');

        };
        tip.prototype.drawChart = function(chartNo) {
            this.chartId = document.getElementById("chart");
            this.chartNo = chartNo + 1;

            this.drawXAxis();
            this.drawYAxis();
            this.plotGraph();
            this.addChartName(chartNo); //this chartNo is the index value of the array 



        };/*
        tip.prototype.drawCrossHair = function(x, upLimitYAxis, x, lowLimitYAxis){
            var className = "drawCrossHair";
            var style = "stroke:rgb(0,0,230);stroke-width:1";

            this.drawLine(x, upLimitYAxis, x, lowLimitYAxis, style, className);
        };*/
       
    //end of tip object
    function clearCoor(event){

        var elements = document.getElementsByClassName("drawCrossHair");
        for(var i = 0; i<elements.length; i++){
                elements[i].setAttribute("visibility","hidden");
            }

    };
    function showCoords(event){
        var x = event.clientX;
        var y = event.clientY;
        var coor = "X coords: " + x + ", Y coords: " + y;
        //console.log(coor);
        var draw = new tip();
        var numberOfGraphs = obj.y_axis_map.length;
        draw.chartId = document.getElementById("chart"); /* the chart id will be accessed from another object  */
        //console.log(draw.chartId + ' chartId');
        //drawCrossHair.drawLine();
        for(i = 0; i < numberOfGraphs; i++){

            var upLimitYAxis = range[i].upLimitYAxis;
            var lowLimitYAxis = range[i].lowLimitYAxis;
            console.log(upLimitYAxis + 'axis show '+ lowLimitYAxis);
            var className = "drawCrossHair";
            var style = "stroke:rgb(0,0,230);stroke-width:1";
            console.log(range[i].lowLimitXAxis+ ' x range'+ range[i].upLimitXAxis);
            if(range[i].lowLimitXAxis< x < range[i].upLimitXAxis)
            {
                draw.drawLine(x, upLimitYAxis, x, lowLimitYAxis, style, className);
            }
            
            //console.log(range[0].upLimitYAxis + 'crosshair '+range[0].lowLimitYAxis );
            //drawCrossHair.drawCrossHair(x, range[1].upLimitYAxis, x, range[1].lowLimitYAxis);
            //console.log(range[1].upLimitYAxis + ' '+range[1].lowLimitYAxis );




        }
    
        };


var range = [];

    function parseData(input) {
        obj = input;
        //var range = [];
        //console.log(obj.data[1]["revenue"]);
        //console.log(obj.y_axis_map.length);
        widthEachChart = obj.chart.width - (obj.chart.width / 2) ;
        heightEachChart = obj.chart.height / obj.y_axis_map.length;
        /*var range = new tip();
        var tempMap = obj.y_axis_map[0];
        range.findMinAndSetDataValue(tempMap);
*/
       




        for (var i = 0; i < obj.y_axis_map.length; i++) {
            var tempMap = obj.y_axis_map[i];
            range[i] = new tip();
            range[i].min = range[i].findMinAndSetDataValue(tempMap);
            //console.log(range[i].min + 'minimum calculated from different data values');
            range[i].max = range[i].findMax(tempMap);
            //console.log(range[i].max + 'maximum ' + tempMap);
            range[i].findRange();
            //range[i].positionValues();
            //range[i].findYTips();

            range[i].drawChart(i);
            //range[i].listener();




            //range.push(obj.data[i][tempMap])
            //console.log(obj.data[i][tempMap]);
        }
        




    }
    parseData(jsonData);        
