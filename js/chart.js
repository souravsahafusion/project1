    var obj = {};
    var heightEachChart = 0; 
    var widthEachChart = 0;
    var crossHairInstance = '';
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
        this.changeFactorMin = 0;
        this.changeFactorMax = 0;
        this.multiplyFactor = 1;
        this.crossHairLineIns = '';
    }
        tip.prototype.findMinAndSetDataValue = function(tempMap) {
            if (typeof tempMap !== undefined) {
                
                var minimum = obj.data[0][tempMap];
                 var i = 0;
                if(typeof minimum == 'undefined'){
                    
                
                while(true){
                    i++;
                    minimum = obj.data[i][tempMap];
                    if(typeof minimum !== 'undefined'){
                        console.log(minimum + 'initial minimum value');
                        break;
                    }
                                    
                }
                }
                //console.log(minimum + 'initial minimum value');
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

            
            if(this.min < 0 ){ //checking for negative values of min and max
                    this.changeFactorMin++;  // 1 if only the min is negative
                    
                    
            }
            if(this.max < 0){
                this.changeFactorMax++;
            }
              
        };
        tip.prototype.findRangeModified = function(){
            
            var minValue = this.min;
            var lastDigit = minValue % 10;
            if(lastDigit < 0){
                lastDigit = 10 + lastDigit;
            }
            //console.log(lastDigit+' '+minValue + ' before transforming');
            //console.log( lastDigit * Math.pow(-1,this.changeFactorMin));
            minValue = minValue - lastDigit ;
            var maxValue = this.max;
            var lastDigit = maxValue % 10;
            //console.log(minValue + ' after transforming');
            if(lastDigit < 0){
                lastDigit = 10 - lastDigit;
            }
            if (lastDigit !== 0) {
                
                maxValue = maxValue + (10 - lastDigit) * Math.pow(-1,this.changeFactorMax);
                
            }
            //console.log(maxValue+ 'after transforming');
            var diffBwTips = (maxValue - minValue); // difference negative for negative values
            var padding = diffBwTips / 10;
            var diffTenthPow = 0;
            
            while(true){
                //console.log(Math.pow(10,diffTenthPow) + ' padding' +padding );
                if(Math.pow(10,diffTenthPow) < padding){
                    
                    diffTenthPow++;
                    
                }else{
                        diffTenthPow--;
                        break;
                }               
               //console.log(diffTenthPow + ' tenthpow');     
            }
                       
            if( padding < 10){
                diffTenthPow = 1;
                //console.log(diffTenthPow+ 'inside if loop');
            }else if(padding < 1){
                diffTenthPow = 0;
            }
            //console.log(diffBwTips);
            //console.log(diffTenthPow + ' tenthpow outside loop');
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
            //console.log(this.minTipValue);
            //console.log('test entering');
            //console.log(this.maxTipValue);
            //console.log(this.diffBwTips + 'diffBwTips actual');
            
        };
        tip.prototype.scaleValues = function(){
            
            this.min = this.min * this.multiplyFactor;
            this.max = this.max * this.multiplyFactor;
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
        tip.prototype.positionValues =  function(){

            var min  = this.min;
            var max = this.max;
            if((max - min)<0.1){ 
                // checking decimal values for four digit precision
               this.multiplyFactor = 10000;
               this.scaleValues();
                //console.log(this.multiplyFactor +'multiplyFactor');




            }else if((max - min)<= 2 ){   
                //checking decimal values for two digit precision
                this.multiplyFactor = 100;
                this.scaleValues();
                //console.log(this.multiplyFactor+'multiplyFactor');
               

            } else if((max - min)<10){
                
                this.multiplyFactor = 10;
                this.scaleValues();
                //console.log(this.multiplyFactor+'multiplyFactor');

            }else{
               //console.log(this.multiplyFactor+'multiplyFactor');

                this.scaleValues();
                

            }
            //this.diffBwTips = this.maxTipValue - this.minTipValue;
            

        };
        
        tip.prototype.findYTipsModified = function(diffTenthPow){
          
            var minValue = this.minTipValue;
            var maxValue = this.maxTipValue;
            var diff = this.diffBwTips;
            //console.log(minValue + 'inside drawing');
            //console.log(maxValue + '');
            //console.log(diff);
            //console.log(diffTenthPow);
            for(i = 0; i < 10; i++){
                var flag  = 0;
                //console.log(diff+'difference'+Math.pow(10,diffTenthPow));
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
            this.maxTipValue = (this.maxTipValue + (diff - this.diffBwTips)) / this.multiplyFactor;
            this.diffBwTips = diff / this.multiplyFactor;
            this.minTipValue = this.minTipValue / this.multiplyFactor;
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
            if(this.multiplyFactor == 10000){
                textValue = parseFloat(textValue).toFixed(3);
            }else if(this.multiplyFactor == 100){
                 textValue = parseFloat(textValue).toFixed(1);
            }
            textElement.setAttribute("x", x);
            textElement.setAttribute("y", y);
            textElement.innerHTML = textValue;
            textElement.setAttribute("font-size",fontSize);
            //textElement.setAttribute("style", style);
            //console.log(y + 'label');
            this.chartId.appendChild(textElement);




        };
        tip.prototype.addXLabel = function(){
            var x = (this.upLimitXAxis + this.lowLimitXAxis)/ 2;
            var y = obj.chart.height - obj.chart.height * .015;
            var style = '';
            this.addText(x, y, obj.chart.caption, style);
        };
        tip.prototype.chartDivLabelX = function(textValue, x, y) {
            var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
            var x = x - (widthEachChart / 70);
            var y = y + (heightEachChart / 40);
            textElement.setAttribute("x", x);
            textElement.setAttribute("y", y);
            textElement.innerHTML = textValue;
            var transform = "rotate(90 " + x + "," + y + ")";
            var fontSize  = widthEachChart / 25;
            textElement.setAttribute("font-size",fontSize);
            textElement.setAttribute("transform",transform);
            this.chartId.appendChild(textElement);




        };
        tip.prototype.addText = function(x, y, textValue,transform)
        {
            var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
            textElement.setAttribute("x", x);
            textElement.setAttribute("y", y);
            textElement.innerHTML = textValue;
            var fontSize  = widthEachChart * .030;
            textElement.setAttribute("font-size",fontSize);
            textElement.setAttribute("transform",transform);
            this.chartId.appendChild(textElement);
            //console.log(x +' xvalue' + y + ' yvalue' + textValue + 'textValue');

        };
        tip.prototype.drawXAxis = function() {
            var chartNo = this.chartNo;
            var x1 = widthEachChart / 5; // distance from the origin to the yaxis
            //console.log(widthEachChart + 'widthEachChart');
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
            //console.log(this.noofXTips + 'noofXTips' + this.storeValue.length);
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
            var x = widthEachChart / 40;
            var y = (this.upLimitYAxis + this.lowLimitYAxis) / 2;
            
            var transform = "rotate(270 " + x + "," + y + ")";
            this.addText(x, y, chartName, transform);

            
            //console.log('addChartName');

        };
        tip.prototype.addCaption = function(){
            var x = (this.upLimitXAxis + this.lowLimitXAxis)/ 2;
            var y = obj.chart.height * .015;
            var style = '';
            this.addText(x, y, obj.chart.caption, style);
        };
        tip.prototype.addSubCaption = function(){
            var x = (this.upLimitXAxis + this.lowLimitXAxis)/ 2;
            var y = obj.chart.height * .025;
            var style = '';
            this.addText(x, y, obj.chart.subCaption, style);
        };
        tip.prototype.drawChart = function(chartNo) {
            this.chartId = document.getElementById("chart");
            this.chartNo = chartNo + 1;

            this.drawXAxis();
            this.drawYAxis();
            this.plotGraph();
            this.addChartName(chartNo); //this chartNo is the index value of the array 
            this.addCaption();
            this.addSubCaption();
            //this.addXLabel();
            



        };
        tip.prototype.drawCrossHair = function(x, upLimitYAxis, x, lowLimitYAxis, style, className){
  
 
             var line  = this.crossHairLineIns;
             console.log(line);
 
             line.setAttribute("x1", x);
             line.setAttribute("y1", upLimitYAxis);
             line.setAttribute("x2", x);
             line.setAttribute("y2", lowLimitYAxis);
             line.setAttribute("class",className);
             line.setAttribute("style", style);
             //console.log(this.chartId);
             this.chartId.appendChild(line);
 
 
 
 
 
         };
         tip.prototype.drawRectangle = function(index){
             var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
             var x = this.lowLimitXAxis;
             var y = this.upLimitYAxis;
             var heightRect = this.lowLimitYAxis - this.upLimitYAxis;
             var widthRect = this.upLimitXAxis - this.lowLimitXAxis;
             var rectangleId = 'svgDivs';
             console.log(rectangleId);
             rect.setAttributeNS(null, 'x', x);
             rect.setAttributeNS(null, 'y', y);
             rect.setAttributeNS(null, 'height', heightRect);
             rect.setAttributeNS(null, 'width', widthRect);
             rect.setAttribute("class",rectangleId);
             rect.setAttribute("style","fill:transparent;")
             this.chartId.appendChild(rect);
 
         };
 
        
     //end of maxTipValue object
     function createSync(event)
     {
         var x = event.detail.x;
         //console.log('syncCrossHair');
         var draw = crossHairInstance;
 
         var elements = document.getElementsByClassName("svgDivs");
                 for(var i = 0; i<elements.length; i++){
                     
                     var upLimitYAxis = range[i].upLimitYAxis;
                     var lowLimitYAxis = range[i].lowLimitYAxis;
                      var style = "stroke:rgb(255,0,0);stroke-width:1;fill:black";
                     draw.drawLine(x, lowLimitYAxis, x, upLimitYAxis,style, "drawCrossHairLines");
                     console.log(elements[i] + 'rectangleId'+ upLimitYAxis+'lowLimitYAxis'+lowLimitYAxis);
 
 
         }
 
 
     };
 
     function addedEventListener(){
         var divNames = document.getElementsByClassName("svgDivs");
         for( var i=0;i<divNames.length;i++){
             divNames[i].addEventListener("mouseenter", entercordinates,false);
             divNames[i].addEventListener("mouseleave", clearcoor,false);
             //divNames[i].addEventListener("mousemove", showCoords,false);
 
 
 
                 divNames[i].addEventListener("syncCrossHair", createSync , false);
                 console.log("instance created");
             
         }
 
     };
     function entercordinates(event){
         crossHairInstance = new tip();
         var lineElement = document.createElementNS("http://www.w3.org/2000/svg", "line");
         console.log("instance created");
         crossHairInstance.crossHairLineIns = lineElement;
         crossHairInstance.chartId = document.getElementById("chart");
 
         var x = event.clientX;
         var y = event.clientY;
         var className = event.currentTarget.id;
         console.log(className);
         
 
         var carr = document.getElementsByClassName("svgDivs");
 
         console.log(carr.length+' number of divs');
         var cEvent = new CustomEvent("syncCrossHair",{
             "detail":{x:event.clientX}
         });
         for( var i=0;i<carr.length;i++){
             if(carr[i]!=event.target)
                 carr[i].dispatchEvent(cEvent);
         }
 
             
         
         
 
 
 
 
     };
     function clearcoor(event){
 
 
 
         var elements = document.getElementsByClassName("svgDivs");
         console.log(elements);
         for(var i = 0; i<elements.length; i++){
             console.log("clr");
             var lineElement = elements[i].parentNode.getElementsByClassName("drawCrossHairLines");
             console.log(lineElement);
             for(var j = 0; j<lineElement.length;j++){
 
                 lineElement[j].setAttribute("visibility","hidden");
             }
             }
 
     };
     function showCoords(event){
 
         
         var x = event.detail.x;
         console.log(x);
         var draw = crossHairInstance;
         draw.crossHairLineIns = crossHairInstance.crossHairLineIns;
 
 
 
         var elements = document.getElementsByClassName("svgDivs");
                 
                 for(var i = 0; i<elements.length; i++){
                     var lineElement = elements[i].parentNode.getElementsByClassName("drawCrossHairLines");
                     for(var j = 0; j<lineElement.length;j++){
 
                     lineElement[j].setAttribute("visibility","visible");
                     lineElement[j].setAttribute("x1",x);
                     lineElement[j].setAttribute("x2",x);
                  }
                    
                     
          }
 
 
         
 
         };
 
   
  
  
var range = [];

    function parseData(input) {
        obj = input;
        
        //console.log(obj.data[1]["revenue"]);
        //console.log(obj.y_axis_map.length);
     
        
        if(obj.y_axis_map.length < 1){
           var arr = [];
           for (var i = 0; i < obj.data.length; i++) {
               arr[i] = Object.keys(obj.data[i]);
               //console.log(Object.keys(obj.data[i]));

           }
            for (var i = 0; i < obj.data.length; i++) {
                for (var j = 0;j<arr[i].length - 1;j++){
                    var value = arr[i][j];
                    //var valueData = obj.data[i][value];
                    //console.log(value+ ' '+valueData);
                    if(obj.y_axis_map.indexOf(value) < 0){
                        obj.y_axis_map.push(arr[i][j]);
                         
                    }

                   
                }



           }
            
        }
        
        widthEachChart = obj.chart.width - (obj.chart.width / 2) ;
        heightEachChart = obj.chart.height / obj.y_axis_map.length;
        for (var i = 0; i < obj.y_axis_map.length; i++) {
            //console.log(obj.y_axis_map[i]);
        }
        




        for (var i = 0; i < obj.y_axis_map.length; i++) {
            var tempMap = obj.y_axis_map[i];
            //console.log(tempMap+ 'first step');
            range[i] = new tip();
            range[i].min = range[i].findMinAndSetDataValue(tempMap);
            //console.log(range[i].min + 'minimum calculated from different data values');
            range[i].max = range[i].findMax(tempMap, i);
            //console.log(range[i].max + 'maximum ' + tempMap);
            if(range[i].max !== range[i].min){
                //console.log(this.min);
               range[i].positionValues();
            range[i].findRangeModified();
            
            //range[i].findYTips();

            range[i].drawChart(i); 
            range[i].drawRectangle(i);

            }
            
            //range[i].listener();




            //range.push(obj.data[i][tempMap])
            //console.log(obj.data[i][tempMap]);
        }
        




    }
    parseData(jsonData);        
    addedEventListener(); 
