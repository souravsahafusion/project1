    
    function Tip() {
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
        
    }
        Tip.prototype.findMinAndSetDataValue = function(tempMap) {
           
                
                var minimum = obj.data[0][tempMap];
                 var i = 0;
                if(typeof minimum == 'undefined'){                    
                
                while(true){
                    i++;
                    minimum = obj.data[i][tempMap];
                    if(typeof minimum !== 'undefined'){
                        break;
                    }
                                    
                }
                }
                this.tempMap = tempMap;

                for (var i = 0; i < obj.data.length; i++) {
                    //setting value to the object
                    var monthValue = this.findMonth(i);
                    this.storeValue[monthValue] = obj.data[i][tempMap];
                    if (obj.data[i][tempMap] < minimum) {
                        minimum = obj.data[i][tempMap];

                    }
                }
                return minimum;           

        };
        Tip.prototype.findMax = function(tempMap) {
          
                 var maximum = obj.data[0][tempMap];
                var i = 0;
                if(typeof maximum == 'undefined'){                    
                
                while(true){
                    i++;
                    maximum = obj.data[i][tempMap];
                    if(typeof maximum !== 'undefined'){
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
        
        Tip.prototype.checkingForNegative = function(){

            if(this.min < 0 ){ //checking for negative values of min and max
                    this.changeFactorMin++;  // 1 if only the min is negative
                                    
            }
            if(this.max < 0){
                this.changeFactorMax++;
            }
              
        };
        Tip.prototype.createSVG = function(){
            this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            var chartNo = this.chartNo;
            this.svg.setAttribute("height", obj.chart.height);   
            this.svg.setAttribute("width", obj.chart.width);
            chartId = document.getElementById("chart");
            this.svg.setAttribute("class","chartSVG");
            chartId.appendChild(this.svg);
 
        };
        Tip.prototype.findRangeModified = function(){
            
            var minValue = this.min;
            var lastDigit = minValue % 10;
            if(lastDigit < 0){
                lastDigit = 10 + lastDigit;
            }
       
            minValue = minValue - lastDigit ;
            var maxValue = this.max;
            var lastDigit = maxValue % 10;
            
            if(lastDigit < 0){
                lastDigit = 10 - lastDigit;
            }
            if (lastDigit !== 0) {
                
                maxValue = maxValue + (10 - lastDigit) * Math.pow(-1,this.changeFactorMax);
                
            }
    
            var diffBwTips = (maxValue - minValue); // difference negative for negative values
            var padding = diffBwTips / 10;
            var diffTenthPow = 0;
            
            while(true){
                if(Math.pow(10,diffTenthPow) < padding){
                    
                    diffTenthPow++;
                    
                }else{
                        diffTenthPow--;
                        break;
                }                
            }
                       
            if( padding < 10){
                diffTenthPow = 1;
            }else if(padding < 1){
                diffTenthPow = 0;
            }
            
            var remMinValue  = minValue % (Math.pow(10,diffTenthPow));
            this.minTipValue = minValue - remMinValue * Math.pow(-1,this.changeFactorMin);
            var remMaxValue = maxValue % (Math.pow(10,diffTenthPow));
            
            if(remMaxValue !== 0){
                
                this.maxTipValue = maxValue + ((Math.pow(10,diffTenthPow)) - remMaxValue) * Math.pow(-1,this.changeFactorMax);
                
            }else{
                this.maxTipValue = maxValue;
            }
            
            this.diffBwTips = this.maxTipValue - this.minTipValue;
            this.findYTipsModified(diffTenthPow);            
        };

        Tip.prototype.scaleValues = function(){
            
            this.min = this.min * this.mulTiplyFactor;
            this.max = this.max * this.mulTiplyFactor;
            this.checkingForNegative();
            if(this.changeFactorMin == 1){
                this.min = Math.ceil(this.min);
            }else{
                this.min = Math.floor(this.min);
            }
            
            if(this.changeFactorMax == 1){
                this.max = Math.floor(this.max);
            }else{
                this.max = Math.ceil(this.max);
            }
        };
        Tip.prototype.positionValues =  function(){

            var min  = this.min;
            var max = this.max;
            if((max - min)<0.1){ 
                // checking decimal values for four digit precision
               this.mulTiplyFactor = 10000;
               this.scaleValues();
               

            }else if((max - min)<= 2 ){   
                //checking decimal values for two digit precision
                this.mulTiplyFactor = 100;
                this.scaleValues();
             
      
            } else if((max - min)<10){
                
                this.mulTiplyFactor = 10;
                this.scaleValues();
              

            }else{
              
                this.scaleValues();
                
            }
        };
        
        Tip.prototype.findYTipsModified = function(diffTenthPow){
          
            var minValue = this.minTipValue;
            var maxValue = this.maxTipValue;
            var diff = this.diffBwTips;
        
            for(i = 0; i < 10; i++){
                var flag  = 0;
                if(((diff / 5) % (Math.pow(10,diffTenthPow))) == 0){
                    
                    this.noOfYTips = 5;
                    flag = 1;
                    break;
                    
                }else if(((diff / 3) % (Math.pow(10,diffTenthPow))) == 0){
                    
                    this.noOfYTips = 3;
                    flag = 1;
                    break;
                    
                }else if(((diff / 4) % (Math.pow(10,diffTenthPow))) == 0){
                    
                    this.noOfYTips = 4;
                    flag = 1;
                    break;
                    
                }else if(((diff / 6) % (Math.pow(10,diffTenthPow))) == 0){
                    
                    this.noOfYTips = 6;
                    flag = 1;
                    break;
                    
                }else if(((diff / 7) % (Math.pow(10,diffTenthPow))) == 0){
                    
                    this.noOfYTips = 7;
                    flag = 1;
                    break;
                    
                }
                
                diff = diff + Math.pow(10,diffTenthPow);
            }
            this.maxTipValue = (this.maxTipValue + (diff - this.diffBwTips)) / this.mulTiplyFactor;
            this.diffBwTips = diff / this.mulTiplyFactor;
            this.minTipValue = this.minTipValue / this.mulTiplyFactor;
        };

        Tip.prototype.findMonth = function(index) {

            var date = obj.data[index]["date"];
            dateObject = new Date(date);
            return dateObject.getMonth();
        };

        Tip.prototype.drawLine = function(x1, y1, x2, y2, style,className,visibility,strokedasharray) {
            var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x1);
            line.setAttribute("y1", y1);
            line.setAttribute("x2", x2);
            line.setAttribute("y2", y2);
            line.setAttribute("class",className);
            line.setAttribute("stroke-dasharray", strokedasharray);
            line.setAttribute("style", style);
            if(typeof visibility !== 'undefined'){
                line.setAttribute("visibility", "hidden");
               
            }
          
            this.svg.appendChild(line);

        };
        Tip.prototype.chartDivLabelY = function(y, index) {
            var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
            var x = widthEachChart / 16;
            var y = y;
            var fontSize  = widthEachChart * .04;
            var textValue = this.maxTipValue - (this.diffBwTips * index / this.noOfYTips);
            if(this.mulTiplyFactor == 10000){
                textValue = parseFloat(textValue).toFixed(3);
            }else if(this.mulTiplyFactor == 100){
                 textValue = parseFloat(textValue).toFixed(1);
            }
            textElement.setAttribute("x", x);
            textElement.setAttribute("y", y);
            textElement.innerHTML = textValue;
            textElement.setAttribute("font-size",fontSize);
            this.svg.appendChild(textElement);

        };
        /*Tip.prototype.addXLabel = function(){
            var x = (this.upLimitXAxis + this.lowLimitXAxis)/ 2;
            var y = obj.chart.height - obj.chart.height * .015;
            var style = '';
            var className = "textAdd";
            this.addText(x, y, obj.chart.caption, style,className);
        };*/
        Tip.prototype.chartDivLabelX = function(textValue, x, y, check) {
            var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
            var x = x - (widthEachChart / 70);
            var y = y + (heightEachChart / 40);
            
            var transform = '';
            textElement.innerHTML = textValue;
            if(check !== 2){
                y = y - 20;
                transform = "rotate(0 " + x + "," + y + ")";

            }else{
                transform = "rotate(90 " + x + "," + y + ")";
            }
            textElement.setAttribute("x", x);
            textElement.setAttribute("y", y);
            
            var fontSize  = heightEachChart * .05;
            textElement.setAttribute("font-size",fontSize);
            textElement.setAttribute("transform",transform);
            this.svg.appendChild(textElement);

        };
        Tip.prototype.addText = function(x, y, textValue, transform, className,textElement, fontSize,style){
        
            if(typeof textElement == 'undefined' ){
                 textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");

            }
           
            textElement.setAttribute("x", x);
            textElement.setAttribute("y", y);
            textElement.innerHTML = textValue;
            //var fontSize  = heightEachChart * .04;
            textElement.setAttribute("font-size",fontSize);
            textElement.setAttribute("transform",transform);
            textElement.setAttribute("style",style);
            this.svg.appendChild(textElement);

        };
        Tip.prototype.drawXAxis = function(check, numberOfColCharts, numberOfCharts) {
            var chartNo = this.chartNo;
            
            
            var x1 = widthEachChart * 0.2; // distance from the origin to the yaxis
            this.chartLowBoundXCoor = x1;

            var x2 = widthEachChart + (widthEachChart * 0.2)+ (widthEachChart / 20); //the extra divided by 20 added to keep some extra space
            this.chartUpBoundXCoor = x2;
            var y1 = 0;
            var y2 = 0;
            if(check !== 2){ //check is being calculated many number of times
                this.yShift = .25;
                var yShift = this.yShift;
                y1 = (heightEachChart * yShift);
                y2 = (heightEachChart * yShift);
            }else{
                this.yShift = .25;
                var yShift = this.yShift;
                y1 = (heightEachChart * yShift) + (heightEachChart );
                y2 = (heightEachChart * yShift) + (heightEachChart );
            }
            var style = "stroke:rgb(237, 237, 237);stroke-width:1;";
            var className = "drawXAxis";
            this.drawLine(x1, y1, x2, y2, style,className);
            //drawTicks
            var numberOfTicks = obj.data.length;
            if(obj.chartType == "line"){
                var temp_x1 = x1 + (.01 * widthEachChart ); /*this variable is used to set the distance from y-axis to the first plotting point*/
            }else if(obj.chartType == "column"){
                var temp_x1 = x1 + (.07 * widthEachChart );
            }
            
            this.lowLimitXAxis = temp_x1; //setting the limits from the Tip value
            //var widthEachChart = this.widthEachChart;
            /*
            */
            this.noofXTips = this.storeValue.length;
            for (i = 0; i < this.noofXTips; i++) {
                x1 = temp_x1 + (widthEachChart / this.noofXTips) * (i);
                x2 = temp_x1 + (widthEachChart / this.noofXTips) * (i);
                this.upLimitXAxis = x1;
                if(check !== 2){
                    y1 = (heightEachChart * yShift) - 4;
                    y2 = (heightEachChart * yShift) + 4;
                }else{
                    y1 = (heightEachChart * yShift) + (heightEachChart ) - 4 ;
                    y2 = (heightEachChart * yShift) + (heightEachChart ) + 4 ;
                }
                if(obj.chartType == "line"){
                    var style = "stroke:rgb(237, 237, 237);stroke-width:1;";                
                    var className = "axisTicks";
                    this.drawLine(x1, y1, x2, y2, style,className);

                }
                
                //put x-axis label 
                if(check !== 2 && chartNo <= numberOfColCharts){
                    this.chartDivLabelX(obj.month[i], x1, y2, check);

                }

                if (check == 2 && chartNo > (numberOfCharts - numberOfColCharts)) {
                    this.chartDivLabelX(obj.month[i], x1, y2, check);
                }               
            }
        };
        Tip.prototype.drawYAxis = function(){
      
            var chartNo = this.chartNo;
            var yShift = this.yShift;
            var x1 = widthEachChart * 0.2;
            var x2 = widthEachChart * 0.2;
            //console.log(chartNo + 'chartNo');
            var y1 = (heightEachChart * yShift) ; 
            var y2 = (heightEachChart * yShift) + (heightEachChart );
            var style = "stroke:rgb(237, 237, 237);stroke-width:1;";
            var className = "axisDraw";
            this.drawLine(x1, y1, x2, y2, style, className);

            //draw ticks
            var noOfYTips = this.noOfYTips;
            
            
            //var heightEachChart = this.heightEachChart;
            var temp_y1 = y1;
            this.upLimitYAxis = y1; //setting the top limit value of y axis
        
            var temp_x1 = x1;
            var temp_x2 = x2;
            /*assigning label text to divs + assigning tics and division draw + rectangle for coloring*/
            this.textLabelId = document.getElementById("text");
            var xl = this.chartLowBoundXCoor;
            var width = this.chartUpBoundXCoor - this.chartLowBoundXCoor;
            var height = heightEachChart / noOfYTips;
            for (i = 0; i < noOfYTips; i++) {
                x1 = temp_x1 - 4;
                x2 = temp_x2 + 4;
                y1 = temp_y1 + (heightEachChart / noOfYTips) * (i);
                y2 = temp_y1 + (heightEachChart / noOfYTips) * (i);

                //drawing ticks
                var style = "";
                var className = "axisTicks";
                this.drawLine(x1, y1, x2, y2, style, className);
                //drawing divs
                var style = "stroke:rgb(237, 237, 237);stroke-width:1;";
                className = "divLines";
                this.drawLine(x1, y1, widthEachChart + (widthEachChart * 0.2) + (widthEachChart / 20), y2, style,className);
                //writing the labels
                
                //drawing the rect
                if((i % 2 == 1)){

                    className = "designRect";
                    style = "fill:rgb(247,247,247);";
                    this.drawRectangle(xl, y1, height, width, className, style);
                }

            }
            this.lowLimitYAxis = y1 + (heightEachChart / noOfYTips);
            for (i = 0; i <= noOfYTips; i++) {
                y2 = temp_y1 + (heightEachChart / noOfYTips) * (i); 
                this.chartDivLabelY(y2, i);
            }

        };
        Tip.prototype.calculateMappingPoint = function(value) {
            var a = this.minTipValue;
            var b = this.maxTipValue;
            var c = this.upLimitYAxis;
            var d = this.lowLimitYAxis;
            return (d - (value - a) / (b - a) * (d - c));

        };
        Tip.prototype.plotTipCirle = function(xPointPlot, yPointPlot, className) {
            var circleTip = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circleTip.setAttribute("cx", xPointPlot ); // setting circle 
            circleTip.setAttribute("cy", yPointPlot); // coordinates
            circleTip.setAttribute("r", 5);
            circleTip.setAttribute("class", "circleTip");
            style = "";
            circleTip.setAttribute("style", style);
            this.svg.appendChild(circleTip);

        };

        Tip.prototype.plotColumnChart = function(){
           
            for (i = 0; i < obj.data.length; i++) {   /*to be changed later '12' for any number of data i.e. find the last index of the storevalue array*/
                var value = this.storeValue[i];
                if (typeof value != 'undefined')
                {
                    scaleColChartFactor = obj.scaleColChartFactor / 100;
                    
                    var yPointPlot = this.calculateMappingPoint(value);
                    //console.log(range.length); need to debug
                    this.storeAncorPointsY[i] = yPointPlot;
                    var xPointPlot = this.lowLimitXAxis + (widthEachChart / this.noofXTips) * (i);
                    storeAncorPointsX[i] = Math.floor(xPointPlot);
                    var x = xPointPlot - widthEachChart * scaleColChartFactor;
                    var y = this.lowLimitYAxis;
                    var heightRect = y - yPointPlot;
                    var widthRect = widthEachChart * scaleColChartFactor * 2;
                    var style = "fill:rgb(30, 122, 205);stroke-width:3;stroke:rgb(30, 122, 205)";
                    var className  = "plotColumnGraph";
                    
                    var rectIns = this.drawColumnRectangle(x, yPointPlot, heightRect, widthRect, className, style);
                    this.columnChartListener(rectIns, className);
                    this.lastPlottedPointX = xPointPlot;
                    this.lastPlottedPointY = yPointPlot;
                    
                    //skipping the 2D array for storing x-y w.r.t month and instead storing the previous x-y coordinates

                }
            }

        };

        Tip.prototype.plotLineChart = function() {
            var flagFirstPoint = 0;
            for (i = 0; i < obj.data.length; i++) {   /*to be changed later '12' for any number of data i.e. find the last index of the storevalue array*/
                var value = this.storeValue[i];
                if (typeof value != 'undefined')
                {
                    var yPointPlot = this.calculateMappingPoint(value);
                    //console.log(range.length); need to debug
                    this.storeAncorPointsY[i] = yPointPlot;
                    var xPointPlot = this.lowLimitXAxis + (widthEachChart / this.noofXTips) * (i);
                    storeAncorPointsX[i] = Math.floor(xPointPlot);
                   
                    if (flagFirstPoint != 0) //skipping the first plot
                    {
                        var style = "stroke:rgb(29, 121, 204);stroke-width:6";
                        var className  = "plotGraph";
                        this.drawLine(this.lastPlottedPointX, this.lastPlottedPointY, xPointPlot, yPointPlot, style,className);
                        className = "circleTip";
                        
                        this.plotTipCirle(this.lastPlottedPointX, this.lastPlottedPointY, className);
   
                    }
                    this.lastPlottedPointX = xPointPlot;
                    this.lastPlottedPointY = yPointPlot;
                    
                    flagFirstPoint = 1;
                    //skipping the 2D array for storing x-y w.r.t month and instead storing the previous x-y coordinates

                }

            }
            this.plotTipCirle(xPointPlot, yPointPlot);

        };
        Tip.prototype.drawRectangle = function(x, y, height, width, className,style){
            var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttributeNS(null, 'x', x);
            rect.setAttributeNS(null, 'y', y);
            rect.setAttributeNS(null, 'height', height);
            rect.setAttributeNS(null, 'width', width);
            rect.setAttribute("class",className);
            rect.setAttribute("style",style);
            this.svg.appendChild(rect);
            
            
        };
        Tip.prototype.addChartName = function(chartNo, check)
        {
            var chartName = obj.y_axis_map[chartNo];
            var x = this.chartLowBoundXCoor;
            var y = 0;
            if(check !== 2){
                y = this.lowLimitYAxis + heightEachChart * .02;
            }else{
                 y =  this.upLimitYAxis - heightEachChart * .02 - heightEachChart * .15;
            }
            
            var height = heightEachChart * .15;
            var width = this.chartUpBoundXCoor - this.chartLowBoundXCoor;
            var className = "chartName";
            var style = "fill:rgb(245,250,255);stroke:rgb(190,223,254);stroke-width:1;";
            this.drawRectangle(x, y, height, width, className, style);
            y = y + (height) * .6;
            x = (this.chartLowBoundXCoor + this.chartUpBoundXCoor) / 2 * .8;
            style = "stroke:rgb(6,48,86);"
            var fontSize = heightEachChart * .1;
            var transform = "rotate(0 " + x + "," + y + ")";
            var className = "textAdd";
            var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");;
            //
            this.addText(x, y, chartName, transform,className,textElement,fontSize,style);

        };
       /* Tip.prototype.addCaption = function(){
            var x = (this.upLimitXAxis + this.lowLimitXAxis)/ 2;
            var y = obj.chart.height * .015;
            var style = '';
            var className = "textAdd";
            this.addText(x, y, obj.chart.caption, style,className);
        };
        Tip.prototype.addSubCaption = function(){
            var x = (this.upLimitXAxis + this.lowLimitXAxis)/ 2;
            var y = obj.chart.height * .025;
            var style = '';
            var className = "textAdd";
            this.addText(x, y, obj.chart.subCaption, style,className);
        };*/
        Tip.prototype.drawChartOutline = function(chartNo, numberOfCharts, numberOfColCharts) {
            this.chartId = document.getElementById("chart");
            this.chartNo = chartNo + 1;

            var check = 1;

            if(numberOfCharts % 2 == 0){
                check = 2; //even
            }     
            this.drawXAxis(check, numberOfColCharts, numberOfCharts);
            this.drawYAxis();
            this.addChartName(chartNo,check); //this chartNo is the index value of the array 
           
            //this.addXLabel();

        };
        Tip.prototype.drawCrossHair = function(){
            var className = "drawCrossHairLines";
            var x = this.lowLimitXAxis ;
            var y1 = this.lowLimitYAxis;
            var y2 = this.upLimitYAxis;
            var style = "stroke:rgb(255, 0 , 0);stroke-width:1;";
            var strokedasharray = "3, 2";
            var visibility = "hidden";  
            this.drawLine(x, y1, x, y2, style, className,visibility,strokedasharray);
         };


         Tip.prototype.selectChartListener = function(rectIns){
            this.selectRectIns = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            var _this = this;
            this.svg.appendChild(this.selectRectIns )

            rectIns.addEventListener("mousedown",instantiateDragCol.bind(_this));
            rectIns.addEventListener("mousemove",dragColRect.bind(_this));
            rectIns.addEventListener("mouseup",releaseColRect.bind(_this));

         };
         Tip.prototype.columnChartListener = function(rectIns,className){

            rectIns.addEventListener("mousemove", entercoordinates.bind(this, className));
            /*rectIns.addEventListener("mousemove", function () {
                entercoordinates.call(this, className);  
            });*/
            
            rectIns.addEventListener("syncCrossHair", columnTrigger);
             rectIns.addEventListener("mouseout", removeToolTip);
             
             //divNames[i].addEventListener("mousemove", showCoords,false);
            //rect.addEventListener("mouseleave", clearcoor,false);
            this.toolTipTextIns = document.createElementNS("http://www.w3.org/2000/svg", "text");
            this.toolTipBoxIns = document.createElementNS("http://www.w3.org/2000/svg", "rect"); 

         };
         Tip.prototype.drawColumnRectangle = function(x, y, heightRect, widthRect, className, style){


            var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttributeNS(null, 'x', x);
            rect.setAttributeNS(null, 'y', y);
            rect.setAttributeNS(null, 'height', heightRect);
            rect.setAttributeNS(null, 'width', widthRect);
            rect.setAttribute("class", className);
            rect.setAttribute("style",style);
            this.svg.appendChild(rect);
            return rect; 
            

         };
         Tip.prototype.drawBoundRectangle = function(className){
            var rectBound = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            var widthRect = this.chartUpBoundXCoor - this.chartLowBoundXCoor;
            var heightRect = this.lowLimitYAxis - this.upLimitYAxis;
            var y = this.upLimitYAxis;
             rectBound.setAttributeNS(null, 'x', this.chartLowBoundXCoor);
             rectBound.setAttributeNS(null, 'y', y);
             rectBound.setAttributeNS(null, 'height', heightRect);
             rectBound.setAttributeNS(null, 'width', widthRect);
             rectBound.setAttribute("class",className);
             rectBound.setAttribute("style","stroke:rgb(237, 237, 237);stroke-width:1;fill:transparent");
             this.svg.appendChild(rectBound);
             return rectBound;

         };

         Tip.prototype.drawDivRectangle = function(index){
             var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
             var x = this.lowLimitXAxis;
             var y = this.upLimitYAxis;
             var heightRect = this.lowLimitYAxis - this.upLimitYAxis;
             var widthRect = this.upLimitXAxis - this.lowLimitXAxis;
             var rectangleId = 'svgDivs';
             //plotted rectangle div
             rect.setAttributeNS(null, 'x', x);
             rect.setAttributeNS(null, 'y', y);
             rect.setAttributeNS(null, 'height', heightRect);
             rect.setAttributeNS(null, 'width', widthRect);
             rect.setAttribute("class",rectangleId);
             rect.setAttribute("style","fill:transparent");
             //rect.setAttribute("visibility","hidden");
             this.svg.appendChild(rect);
              rect.addEventListener("mousemove", entercoordinates.bind(this, rectangleId));
             /*rect.addEventListener("mousemove", function () {
                entercoordinates.call(this, rectangleId);  
            });*/
             rect.addEventListener("syncCrossHair", showCoords, false);
             //divNames[i].addEventListener("mousemove", showCoords,false);
            rect.addEventListener("mouseleave", clearcoor,false);
            this.toolTipTextIns = document.createElementNS("http://www.w3.org/2000/svg", "text");//might need to be added in column as well
            this.toolTipBoxIns = document.createElementNS("http://www.w3.org/2000/svg", "rect"); 

            this.selectRectIns = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            var _this = this;
            this.svg.appendChild(this.selectRectIns )

            rect.addEventListener("mousedown",instantiateDragLine.bind(_this));
            rect.addEventListener("mousemove",dragLineRect.bind(_this));
            rect.addEventListener("mouseup",releaseLineRect.bind(_this));


             //svg chart area bound with x y axis
           /**/

         };

         Tip.prototype.printValues = function(){
            var object = {};
            object = range;
            /*for(var i = 0; i < obj.y_axis_map.length; i++){
                for(var j = 0; j < obj.data.length; j++){
                    if(typeof object[i].storeAncorPointsY[j] !== 'undefined'){
                        console.log(object[i].storeAncorPointsY[j]);
                    }
                    
                }
                //console.log(object[0].storeAncorPointsY.length);
            }*/
            /*for(var i = 0; i < obj.y_axis_map.length; i++){
              
                        console.log(object[i].storeValue[j]);
                    
                //console.log(object[0].storeAncorPointsY.length);
            }*/

             /*for(var j = 0; j < 12; j++){
                     console.log(this.storeAncorPointsX[j]);
                 }*/

         };
 
     //end of maxTipValue object
     /**/
 
     function entercoordinates(parameter, event ){
        //console.log(parameter+ 'parameter');
        //console.log(this);
         
 var cArr = document.getElementsByClassName(parameter);
        var rollover = new CustomEvent("syncCrossHair",{
            "detail":{x:event.clientX,y:event.clientY,ins:this}
        });
        for( var i=0;i<cArr.length;i++){
            if(cArr[i]!=event.target)
                cArr[i].dispatchEvent(rollover);
        }
 
     };
     function removeToolTip(event){
         var object = range; 
         if(flagRemoveColor !== 1){
            var columnElement = document.getElementsByClassName("plotColumnGraph");
            for(var i = 0; i < columnElement.length; i++){
                
                    columnElement[i].style.fill = "rgb(30, 122, 205)"; 
                    columnElement[i].style.stroke = "rgb(30, 122, 205)";
               
            }
         }
           
                 for(var i = 0; i<obj.data.length; i++){     
                    //console.log("removed");
                     var toolTipRect = object[i].toolTipBoxIns;
                     toolTipRect.setAttribute("visibility","hidden");
                     var textElement  = object[i].toolTipTextIns;
                     textElement.setAttribute("visibility","hidden");
                     
                     
                  }
 
                

     };
     function clearcoor(event){

        var lineElement = document.getElementsByClassName("drawCrossHairLines"); 
        var object = range; 
                 for(var i = 0; i<lineElement.length; i++){     
                     lineElement[i].setAttribute("visibility","hidden");
                     var toolTipRect = object[i].toolTipBoxIns;
                     toolTipRect.setAttribute("visibility","hidden");
                     var textElement  = object[i].toolTipTextIns;
                     textElement.setAttribute("visibility","hidden");
                     
                     
                  }   
     };
     function columnTrigger(event){
         var x = event.detail.x % obj.chart.width;
        
        x = x - 8;
        var index = -1;
        //console.log(x);
        var posScale = obj.scaleColChartFactor / 100 * widthEachChart;

        for(var i = posScale;i >0; i--){
            //console.log(i);
            //console.log(x+i);
            storeAncorPointsX.indexOf(x+i);

            if(storeAncorPointsX.indexOf(x+i)!== -1 || storeAncorPointsX.indexOf(x-i)!== -1){
                 //index = 0;  //find better way for choosing index
                 //console.log(x+i);
                if(storeAncorPointsX.indexOf(x+i)!== -1){
                    // console.log(x+posScale);
                    index = storeAncorPointsX.indexOf(x+i);
                    x = x+i;
                }
                if(storeAncorPointsX.indexOf(x-i)!== -1){
                     //console.log(x-posScale);
                    index = storeAncorPointsX.indexOf(x-i);
                     x = x-i;
                }
                //console.log(index);

            }

         }

         var object = range;
         var value = 0;
         //console.log(index);
         if(index !== -1){
             var columnElement = document.getElementsByClassName("plotColumnGraph");
            for(var i = 0; i < columnElement.length; i++){
                var test = Math.floor(columnElement[i].getAttribute("x")); 
                test = test + widthEachChart * obj.scaleColChartFactor / 100;

                if(test == x){
                    //console.log(x);
                    columnElement[i].style.fill = "red"; 
                    columnElement[i].style.stroke = "red";

                }
               
            }
           
            for(var i = 0; i < obj.y_axis_map.length; i++){
                //for(var j = 0; j < obj.data.length; j++){
                    if(typeof object[i].storeAncorPointsY[index] !== 'undefined'){
                        
                        value = object[i].storeValue[index];
                        var y = object[i].storeAncorPointsY[index];
                        /*var transform = "rotate(0 " + x + "," + y + ")";
                        var className = "toolTipText";
                        var textElement = object[i].toolTipTextIns;
                        object[i].addText(x, y,value, transform,className,textElement);
                        textElement.setAttribute("visibility","visible");*/
                        var transform = "rotate(0 " + x + "," + y + ")";
                        var className = "toolTipText";
                        var textElement = object[i].toolTipTextIns;
                        var toolTipRect = object[i].toolTipBoxIns; 
                        
                        //object[i].addText(x, y, value, transform, className, textElement);
                        //function call is costly hence avoided
                        toolTipRect.setAttributeNS(null, 'x', x + widthEachChart * .01);
                        toolTipRect.setAttributeNS(null, 'y', y - heightEachChart * .1);
                        toolTipRect.setAttributeNS(null, 'height', heightEachChart * .1);
                        toolTipRect.setAttributeNS(null, 'width', widthEachChart * .25);
                        toolTipRect.setAttribute("class","toolTipRect");
                        toolTipRect.setAttribute("style","stroke:rgb(157, 119, 106);fill:rgb(255, 217, 204)");
                        
                        
                        object[i].svg.appendChild(toolTipRect);
                        toolTipRect.setAttribute("visibility","visible");
                        
                        y = y - heightEachChart * .05;
                        textElement.setAttribute("x", x + widthEachChart * .05);
                        textElement.setAttribute("y", y);
                        textElement.innerHTML = value;
                        var fontSize  = heightEachChart * .05;
                        textElement.setAttribute("font-size",fontSize);
                        textElement.setAttribute("transform",transform);
                        textElement.setAttribute("style","rgb(197, 159, 146)");
                        object[i].svg.appendChild(textElement);
                        textElement.setAttribute("visibility","visible");
                        
                    }
            }
         }else{
            /* for(var i = 0; i < obj.y_axis_map.length; i++){
              
                       
                        var className = "toolTipText";
                        var textElement = object[i].toolTipTextIns;                        
                       textElement.setAttribute("visibility","hidden");
                 
            }*/

         }

     

     };
     function showCoords(event){
        //console.log(this);
        var x = event.detail.x % obj.chart.width;
        x = x -8;
         var index = -1;

         //for loop might not be the best solution for finding the range
         for(var i = 5;i >0; i--){

            if(storeAncorPointsX.indexOf(x+i)!== -1 || storeAncorPointsX.indexOf(x-i)!== -1){
                 //index = 0;  //find better way for choosing index
                if(storeAncorPointsX.indexOf(x+i)!== -1){
                    index = storeAncorPointsX.indexOf(x+i);
                    x = x+i;
                }
                if(storeAncorPointsX.indexOf(x-i)!== -1){
                    index = storeAncorPointsX.indexOf(x-i);
                     x = x-i;
                }
                //console.log(index);

            }

         }

         var object = range;
         if(index !== -1){
            //className = "circleTip"+index;
            //var colorCirle = event.currentTarget.getElementsByClassName(className).style.fill="red";
            //console.log(colorCirle);
            //console.log(index);
            var columnElement = document.getElementsByClassName("circleTip");
            console.log(columnElement);
            for(var i = 0; i < columnElement.length; i++){
                var test = Math.floor(columnElement[i].getAttribute("cx")); 

                test = test 
                if(test == x){
                    
                    columnElement[i].style.fill = "red"; 
                    columnElement[i].style.stroke = "red";

                }
                
               
            }
            var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
            for(var i = 0; i < obj.y_axis_map.length; i++){
               
                    if(typeof object[i].storeAncorPointsY[index] !== 'undefined'){
                        value = object[i].storeValue[index];
                        var y = object[i].storeAncorPointsY[index];
                        
                        var transform = "rotate(0 " + x + "," + y + ")";
                        var className = "toolTipText";
                        var textElement = object[i].toolTipTextIns;
                        var toolTipRect = object[i].toolTipBoxIns; 
                        
                        //object[i].addText(x, y, value, transform, className, textElement);
                        //function call is costly hence avoided
                        toolTipRect.setAttributeNS(null, 'x', x + widthEachChart * .01);
                        toolTipRect.setAttributeNS(null, 'y', y - heightEachChart * .1);
                        toolTipRect.setAttributeNS(null, 'height', heightEachChart * .1);
                        toolTipRect.setAttributeNS(null, 'width', widthEachChart * .25);
                        toolTipRect.setAttribute("class","toolTipRect");
                        toolTipRect.setAttribute("style","stroke:rgb(157, 119, 106);fill:rgb(255, 217, 204)");
                        
                        
                        object[i].svg.appendChild(toolTipRect);
                        toolTipRect.setAttribute("visibility","visible");
                        
                        y = y - heightEachChart * .05;
                        textElement.setAttribute("x", x + widthEachChart * .05);
                        textElement.setAttribute("y", y);
                        textElement.innerHTML = value;
                        var fontSize  = heightEachChart * .05;
                        textElement.setAttribute("font-size",fontSize);
                        textElement.setAttribute("transform",transform);
                        textElement.setAttribute("style","rgb(197, 159, 146)");
                        object[i].svg.appendChild(textElement);
                        textElement.setAttribute("visibility","visible");
                    }
                    
             
            }
         }else{
             for(var i = 0; i < obj.y_axis_map.length; i++){
                 
                 var toolTipRect = object[i].toolTipBoxIns;
                 toolTipRect.setAttribute("visibility","hidden");
                 var textElement = object[i].toolTipTextIns;                        
                 textElement.setAttribute("visibility","hidden");
                 
            }
    
         }
    
         var lineElement = document.getElementsByClassName("drawCrossHairLines");          
                 for(var i = 0; i<lineElement.length; i++){     
                     lineElement[i].setAttribute("visibility","visible");
                     //console.log(x + 'crossHairLine');
                     lineElement[i].setAttribute("x1",x);
                     lineElement[i].setAttribute("x2",x);

                  }    
         };
         function instantiateDragLine(event){
            if(flagRemoveColor !== 1){
                var xC = event.clientX % obj.chart.width - 10;
                var yC = event.pageY % obj.chart.height - heightEachChart * range[0].yShift - 45;
                console.log(xC + 'x ' + 'y '+ yC , obj.chart.width);
                console.log(event.clientX + 'clientX' + event.clientY + 'clientY');

                var rect = this.selectRectIns;
                rect.setAttributeNS(null, 'x', xC );
                rect.setAttributeNS(null, 'y', yC );
                rect.setAttributeNS(null, 'height', 1);
                rect.setAttributeNS(null, 'width', 1);
                rect.setAttribute("class","selectRect");
                rect.setAttribute("style","fill:transparent;stroke:rgb(0,0,0)");
                flag = 1;
                flagRemoveColor = 1;
                //console.log(parameter);
                //this.svg.appendChild(rect);
            }else{

                var columnElement = document.getElementsByClassName("circleTip");
            for(var i = 0; i < columnElement.length; i++){
                
                    columnElement[i].style.fill = "white"; 
                    columnElement[i].style.stroke = "rgb(30, 122, 205)";
               
            }
            flagRemoveColor = 0;
                
            }

         };
         function instantiateDragCol(event){
            if(flagRemoveColor !== 1){
                var xC = event.clientX % obj.chart.width - 10;
                var yC = event.pageY % obj.chart.height - heightEachChart * range[0].yShift - 45;
                console.log(xC + 'x ' + 'y '+ yC , obj.chart.width);
                console.log(event.clientX + 'clientX' + event.clientY + 'clientY');

                var rect = this.selectRectIns;
                rect.setAttributeNS(null, 'x', xC );
                rect.setAttributeNS(null, 'y', yC );
                rect.setAttributeNS(null, 'height', 1);
                rect.setAttributeNS(null, 'width', 1);
                rect.setAttribute("class","selectRect");
                rect.setAttribute("style","fill:transparent;stroke:rgb(0,0,0)");
                flag = 1;
                flagRemoveColor = 1;
                //console.log(parameter);
                //this.svg.appendChild(rect);
            }else{

                var columnElement = document.getElementsByClassName("plotColumnGraph");
            for(var i = 0; i < columnElement.length; i++){
                
                    columnElement[i].style.fill = "rgb(30, 122, 205)"; 
                    columnElement[i].style.stroke = "rgb(30, 122, 205)";
               
            }
            flagRemoveColor = 0;
                
            }


            


         };
         function dragColRect( event){
            if(flag == 1){
                var rect = this.selectRectIns;
                var xC = event.clientX % obj.chart.width - 10;
                var yC = event.pageY % obj.chart.height - heightEachChart * range[0].yShift - 45;
                var xBeg = rect.getAttribute("x");
                var yBeg = rect.getAttribute("y");
                var width = Math.abs(xC - xBeg);
                var height = Math.abs(yBeg - yC);
                /*if(xBeg < x){
                    rect.setAttributeNS(null, 'x', xC );
                    rect.setAttributeNS(null, 'y', yC );
                }*/
                /*if((xC - xPrev) < 0){
                    rect.setAttributeNS(null, 'x', xC );

                }
                if((yc - yPrev) < 0){
                    rect.setAttributeNS(null, 'y', yC );
                }   */
               
                rect.setAttributeNS(null, 'width', width);
                rect.setAttributeNS(null, 'height', height);
                 var columnElement = document.getElementsByClassName("plotColumnGraph");
              for(var i = 0; i < columnElement.length; i++){
                var testX = Math.floor(columnElement[i].getAttribute("x")); 
                testX = testX + widthEachChart * obj.scaleColChartFactor / 100;
                var testY = Math.floor(columnElement[i].getAttribute("y")); 
                //console.log(testY + 'y');

                if(testX <= xC && testX >= xBeg && testY <= yC){
                    //console.log(x);
                    columnElement[i].style.fill = "red"; 
                    columnElement[i].style.stroke = "red";

                }
                

                //console.log(xPrev+ 'xPrev ' + yPrev + " yPrev ");  
                
            }
              


         }
        };
        function dragLineRect( event){
            if(flag == 1){
                var rect = this.selectRectIns;
                var xC = event.clientX % obj.chart.width - 10;
                var yC = event.pageY % obj.chart.height - heightEachChart * range[0].yShift - 45;
                var xBeg = rect.getAttribute("x");
                var yBeg = rect.getAttribute("y");
                var width = Math.abs(xC - xBeg);
                var height = Math.abs(yBeg - yC);
                /*if(xBeg < x){
                    rect.setAttributeNS(null, 'x', xC );
                    rect.setAttributeNS(null, 'y', yC );
                }*/
                /*if((xC - xPrev) < 0){
                    rect.setAttributeNS(null, 'x', xC );

                }
                if((yc - yPrev) < 0){
                    rect.setAttributeNS(null, 'y', yC );
                }   */
               
                rect.setAttributeNS(null, 'width', width);
                rect.setAttributeNS(null, 'height', height);
                 var columnElement = document.getElementsByClassName("circleTip");
              for(var i = 0; i < columnElement.length; i++){
                var testX = Math.floor(columnElement[i].getAttribute("x")); 
                testX = testX + widthEachChart * obj.scaleColChartFactor / 100;
                var testY = Math.floor(columnElement[i].getAttribute("y")); 
                //console.log(testY + 'y');

                if(testX <= xC && testX >= xBeg && testY <= yC){
                    //console.log(x);
                    columnElement[i].style.fill = "red"; 
                    columnElement[i].style.stroke = "red";

                }
                

                //console.log(xPrev+ 'xPrev ' + yPrev + " yPrev ");  
                
            }
              


         }
        };
        function releaseLineRect(event){
            var rect = this.selectRectIns;
           
            rect.setAttributeNS(null, 'height', 0);
            rect.setAttributeNS(null, 'width', 0);
            
            flag = 0;


         };

         function releaseColRect(event){
            var rect = this.selectRectIns;
           
            rect.setAttributeNS(null, 'height', 0);
            rect.setAttributeNS(null, 'width', 0);
            
            flag = 0;


         };
         
        function arrangeOnMax(){
            var maxValueArray = [];
            object = range2;
            for (var i = 0; i < obj.y_axis_map.length; i++) {
                maxValueArray.push(object[i].max);

            }
            var length = maxValueArray.length;
          
          for (var i = 0; i < length-1; i++) { //Number of passes
            var max = i; //min holds the current minimum number position for each pass; i holds the Initial min number
            for (var j = i+1; j < length; j++) { //Note that j = i + 1 as we only need to go through unsorted array
              if(maxValueArray[j] > maxValueArray[max]) { //Compare the numbers
                max = j; //Change the current min number position if a smaller num is found
              }
            }
            if(max != i) { //After each pass, if the current min num != initial min num, exchange the position.
              //Swap the numbers
              var y_map_tmp = obj.y_axis_map[i];
              var tmp = maxValueArray[i];
              obj.y_axis_map[i] = obj.y_axis_map[max];
              maxValueArray[i] = maxValueArray[max];
              obj.y_axis_map[max] = y_map_tmp;
              maxValueArray[max] = tmp;
            }
          }

          for (var i = 0; i < length; i++) {
             //console.log(maxValueArray[i]);
             //console.log(obj.y_axis_map[i]);
          }

        };
         function arrangeOnMin(){
            var minValueArray = [];
            object = range2;
            for (var i = 0; i < obj.y_axis_map.length; i++) {
                minValueArray.push(object[i].min);

            }
            var length = minValueArray.length;
          
          for (var i = 0; i < length-1; i++) { //Number of passes
            var min = i; //min holds the current minimum number position for each pass; i holds the Initial min number
            for (var j = i+1; j < length; j++) { //Note that j = i + 1 as we only need to go through unsorted array
              if(minValueArray[j] < minValueArray[min]) { //Compare the numbers
                min = j; //Change the current min number position if a smaller num is found
              }
            }
            if(min != i) { //After each pass, if the current min num != initial min num, exchange the position.
              //Swap the numbers
              var y_map_tmp = obj.y_axis_map[i];
              var tmp = minValueArray[i];
              obj.y_axis_map[i] = obj.y_axis_map[min];
              minValueArray[i] = minValueArray[min];
              obj.y_axis_map[min] = y_map_tmp;
              minValueArray[min] = tmp;
            }
          }

          for (var i = 0; i < length; i++) {
             //console.log(minValueArray[i]);
             //console.log(obj.y_axis_map[i]);
          }


         };



 
var range = [];
var range2 = [];
var obj = {};
var heightEachChart = 400; 
var widthEachChart = 300;
var crossHairInstance = '';
var storeAncorPointsX = [];
var flag = 0;
var flagRemoveColor = 0;


    function parseData(input) {
        obj = input;
        
      
        var noOfDatas = obj.data.length;
   
        if(obj.y_axis_map.length < 1){
           var arr = [];
           for (var i = 0; i < noOfDatas; i++) {
               arr[i] = Object.keys(obj.data[i]);

           }
            for (var i = 0; i < noOfDatas; i++) {
                for (var j = 0;j<arr[i].length - 1;j++){
                    var value = arr[i][j];
                    if(obj.y_axis_map.indexOf(value) < 0){
                        obj.y_axis_map.push(arr[i][j]);
                         
                    }
         
                }

           }
            
        }
        var numberOfCharts = obj.y_axis_map.length;
        widthEachChart = obj.chart.width - (obj.chart.width * .5);
        heightEachChart = obj.chart.height * 0.65;
        /*for (var i = 0; i < obj.y_axis_map.length; i++) {
            //console.log(obj.y_axis_map[i]);
        }*/

        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var chartWidth = obj.chart.width;
        var chartHeight = obj.chart.height;
        var numberOfColCharts = Math.floor(windowWidth / chartWidth);
        for (var i = 0; i < numberOfCharts; i++) {
            var tempMap = obj.y_axis_map[i];
            //console.log(tempMap+ 'first step');
            range2[i] = new Tip();
            range2[i].min = range2[i].findMinAndSetDataValue(tempMap);
            //console.log(range[i].min + 'minimum calculated from different data values');
            range2[i].max = range2[i].findMax(tempMap, i);
        }
         var expression = obj.chart_order_func;
                switch(expression) {
                    case "minimum":
                    arrangeOnMin();                          
                        break;
                    case "maximum":
                    arrangeOnMax();    
                        break;
                    
                }

        for (var i = 0; i < numberOfCharts; i++) {
            var tempMap = obj.y_axis_map[i];
            //console.log(tempMap+ 'first step');
            range[i] = new Tip();
            range[i].min = range[i].findMinAndSetDataValue(tempMap);
            //console.log(range[i].min + 'minimum calculated from different data values');
            range[i].max = range[i].findMax(tempMap, i);
        }
            //console.log(range[i].max + 'maximum ' + tempMap);
           
             for (var i = 0; i < numberOfCharts; i++) {
            if(range[i].max !== range[i].min){ //skipping if there is only one value
                
               range[i].positionValues();
               range[i].createSVG();
               range[i].findRangeModified();
                //console.log("calling cross hair");
                
                //range[i].findYTips();
     
                range[i].drawChartOutline(i, numberOfCharts, numberOfColCharts); 
      
                if(obj.chartType == "line"){
                    var className = "lineBound";
                    var rectIns = range[i].drawBoundRectangle(className);
                    range[i].chartType = "line";
                    range[i].plotLineChart();
                    range[i].drawDivRectangle(i); /*rectangle is not required since we don't need to restrict the crooshair, infact no crosshair is there*/
                    range[i].drawCrossHair();
                    //range[i].selectLineListener(rectIns);

                }else if(obj.chartType == "column"){
                    className = "plotColumnBound"
                    var rectIns = range[i].drawBoundRectangle(className);
                    range[i].chartType = "column";
                    range[i].plotColumnChart();
                    range[i].selectChartListener(rectIns);
                    
     
                }
     
            }
   
        }
        
        /*for (var i = 0; i < obj.y_axis_map.length; i++) {
            range[i].printValues();
        }*/
   
    }
    parseData(jsonData);        
    