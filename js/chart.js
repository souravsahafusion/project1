    var obj = {};
    var tip = {

        min: 0,
        max: 0,
        range: 0,
        //stringValue:'',
        maxTipValue: 0,
        minTipValue: 0,
        diffBwTips: 0,
        noOfYTips: 0,
        heightEachChart: 400,
        widthEachChart: 800,
        chartId: '',
        chartNo: 0,
        upLimitXAxis: 0,
        lowLimitXAxis: 0,
        upLimitYAxis: 0,
        lowLimitYAxis: 0,
        storeValue: [],
        tempMap: '',
        lastPlottedPointX: 0,
        lastPlottedPointY: 0,
        textLabelId: '',
        findMinAndSetDataValue: function(tempMap) {
            if (typeof tempMap !== undefined) {
                var minimum = obj.data[0][tempMap];
                this.tempMap = tempMap;




                for (var i = 0; i < obj.data.length; i++) {
                    //setting value to the object
                    var monthValue = this.findMonth(i);
                    this.storeValue[monthValue] = obj.data[i][tempMap];
                    //console.log(this.storeValue[monthValue]);
                    if (obj.data[i][tempMap] < minimum) {
                        minimum = obj.data[i][tempMap];

                    }
                    //console.log(obj.data[i][tempMap]);

                }
                return minimum;
            } else {

            }

        },
        findMax: function(tempMap) {
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

        },
        findRange: function() {
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


            console.log(this.minTipValue);
            console.log(this.maxTipValue);
            console.log(this.diffBwTips + 'diffBwTips actual');
            //console.log(minValue);


        },
        findYTips: function() {
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
            console.log(this.diffBwTips + ' diffBwtips modified');
            console.log(this.maxTipValue + 'maxTipValue modified');
            console.log(this.noOfYTips);
            console.log(this.diffBwTips / this.noOfYTips + 'eachdivrange');
            console.log(this.diffBwTips / this.noOfYTips + 'each tip range');

        },
        findMonth: function(index) {

            var date = obj.data[index]["date"];
            console.log(date);
            dateObject = new Date(date);
            return dateObject.getMonth();
            //console.log(month[this.monthValue]);
        },
        drawLine: function(x1, y1, x2, y2, style) {
            var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x1);
            line.setAttribute("y1", y1);
            line.setAttribute("x2", x2);
            line.setAttribute("y2", y2);
            line.setAttribute("style", style);
            console.log(this.chartId);
            this.chartId.appendChild(line);



        },
        chartDivLabelY: function(y, index) {
            var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
            var x = 60;
            var y = y;
            var textValue = this.maxTipValue - (this.diffBwTips * index / this.noOfYTips);
            textElement.setAttribute("x", x);
            textElement.setAttribute("y", y);
            textElement.innerHTML = textValue;
            var style = "transform: rotate(90deg);transform-origin: left top 0;"
            textElement.setAttribute("style", style);
            //console.log(y + 'label');
            this.chartId.appendChild(textElement);




        },
        chartDivLabelX: function(textValue, x, y) {
            var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
            var x = x - 10;
            var y = y + 10;
            textElement.setAttribute("x", x);
            textElement.setAttribute("y", y);
            textElement.innerHTML = textValue;
            this.chartId.appendChild(textElement);




        },
        addText:function(x, y, textValue,style)
        {
            var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
            textElement.setAttribute("x", x);
            textElement.setAttribute("y", y);
            textElement.innerHTML = textValue;
            this.chartId.appendChild(textElement);
            console.log(x +' xvalue' + y + ' yvalue' + textValue + 'textValue');

        },
        drawXAxis: function() {
            var chartNo = this.chartNo;
            var x1 = 100;
            var x2 = 800;
            var y1 = 100 + (this.heightEachChart * chartNo) + (chartNo - 1) * 35;
            var y2 = 100 + (this.heightEachChart * chartNo) + (chartNo - 1) * 35;
            var style = "stroke:rgb(255,0,0);stroke-width:1;fill:black";
            this.drawLine(x1, y1, x2, y2, style);

            //drawTicks
            var numberOfTicks = obj.data.length;

            //console.log(numberOfTicks + 'numberOfTicks');
            var temp_x1 = x1 + 10;
            this.lowLimitXAxis = temp_x1; //setting the limits from the tip value
            var widthEachChart = this.widthEachChart;
            for (i = 0; i < numberOfTicks; i++) {

                x1 = temp_x1 + (widthEachChart / numberOfTicks) * (i);
                x2 = temp_x1 + (widthEachChart / numberOfTicks) * (i);
                this.upLimitXAxis = x1;
                y1 = 100 + (this.heightEachChart * chartNo) - 4 + (chartNo - 1) * 35;
                y2 = 100 + (this.heightEachChart * chartNo) + 4 + (chartNo - 1) * 35;
                var style = "stroke:rgb(0,0,230);stroke-width:1";
                this.drawLine(x1, y1, x2, y2, style);

                //put x-axis label 
                console.log(obj.month[i] + 'monthValue');


                if (chartNo == obj.y_axis_map.length) {
                    this.chartDivLabelX(obj.month[i], x1, y2);
                }


            }


        },
        drawYAxis: function()

        {
            var chartNo = this.chartNo;
            var x1 = 100;
            var x2 = 100;
            console.log(chartNo + 'chartNo');
            var y1 = 100 + (this.heightEachChart * (chartNo - 1)) + (chartNo - 1) * 35; //15 used to give space between charts
            var y2 = 100 + (this.heightEachChart * chartNo) + (chartNo - 1) * 35;
            var style = "stroke:rgb(255,0,0);stroke-width:1;fill:black";
            this.drawLine(x1, y1, x2, y2, style);

            //draw ticks
            var noOfYTips = this.noOfYTips;
            var heightEachChart = this.heightEachChart;
            var temp_y1 = y1;
            this.upLimitYAxis = y1; //setting the top limit value of y axis
            console.log(this.upLimitYAxis + 'upLimitYAxis');
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
                this.drawLine(x1, y1, x2, y2, style);
                //drawing divs
                var style = "stroke:rgb(0,0,230);stroke-width:1";
                this.drawLine(x1, y1, this.widthEachChart, y2, style);
                //writing the labels



            }
            this.lowLimitYAxis = y1 + (heightEachChart / noOfYTips); //one extra added for temporary purpose
            //this.lowLimitYAxis = y1;
            console.log(this.lowLimitYAxis + 'lowLimitYAxis');
            for (i = 0; i <= noOfYTips; i++) {
                y2 = temp_y1 + (heightEachChart / noOfYTips) * (i); //+ i * 15;
                this.chartDivLabelY(y2, i);
            }




        },
        calculateMappingPoint: function(value) {
            var a = this.minTipValue;
            var b = this.maxTipValue;
            //console.log(a + ' '+ b);
            var c = this.upLimitYAxis;
            var d = this.lowLimitYAxis;
            return (d - (value - a) / (b - a) * (d - c));

        },
        plotTipCirle: function(xPointPlot, yPointPlot) {
            var circleTip = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            var style = "stroke:rgb(255,0,0);stroke-width:1;fill:black";
            circleTip.setAttribute("cx", xPointPlot); // setting circle 
            circleTip.setAttribute("cy", yPointPlot); // coordinates
            circleTip.setAttribute("r", 3);
            circleTip.setAttribute("style", style);
            this.chartId.appendChild(circleTip);

        },
        plotGraph: function() {
            for (i = 0; i < 12; i++) {   /*to be changed later '12' for any number of data i.e. find the last index of the storevalue array*/
                var value = this.storeValue[i];
                console.log(this.lastPlottedPointX + ' ' + this.lastPlottedPointY + ' ' + this.tempMap + ' lastpoint ');
                if (typeof value != 'undefined')
                {
                    var yPointPlot = this.calculateMappingPoint(value);
                    var widthEachChart = this.widthEachChart;
                    var numberOfTicks = obj.data.length;
                    var xPointPlot = this.lowLimitXAxis + (widthEachChart / numberOfTicks) * (i);
                    //this.lastPlottedPointY = this.lowLimitYAxis - this.lastPlottedPointY;
                    //yPointPlot = this.lowLimitYAxis - yPointPlot;
                    this.plotTipCirle(xPointPlot, yPointPlot);

                    if (i != 0) //skipping the first plot
                    {

                        //console.log(this.lowLimitYAxis);


                        //console.log(this.lastPlottedPointX + ' ' + this.lastPlottedPointY + ' ' + this.tempMap + ' lastpoint ');
                        //console.log(xPointPlot + ' ' + yPointPlot + ' ' + this.tempMap);
                        var style = "stroke:rgb(105,105,105);stroke-width:3;";
                        this.drawLine(this.lastPlottedPointX, this.lastPlottedPointY, xPointPlot, yPointPlot, style);



                    }
                    this.lastPlottedPointX = xPointPlot;
                    this.lastPlottedPointY = yPointPlot;
                    //skipping the 2D array for storing x-y w.r.t month and instead storing the previous x-y coordinates

                }
                


            }



        },
        addChartName: function(chartNo)
        {
            var chartName = obj.y_axis_map[chartNo];
            var x = obj.chart.width - 70;
            var y = (this.upLimitYAxis + this.lowLimitYAxis) / 2;
            var style = '';
            this.addText(x, y, chartName, style);

            
            //console.log('addChartName');

        },
        drawChart: function(chartNo) {
            this.chartId = document.getElementById("chart");
            this.chartNo = chartNo + 1;

            this.drawXAxis();
            this.drawYAxis();
            this.plotGraph();
            this.addChartName(chartNo); //this chartNo is the index value of the array 



        }
    };

    function parseData(input) {
        obj = input;
        var range = [];
        //console.log(obj.data[1]["revenue"]);
        //console.log(obj.y_axis_map.length);
        for (var i = 0; i < obj.y_axis_map.length; i++) {
            var tempMap = obj.y_axis_map[i];
            range[i] = new Object(tip);
            range[i].min = range[i].findMinAndSetDataValue(tempMap);
            console.log(range[i].min + 'minimum calculated from different data values');
            range[i].max = range[i].findMax(tempMap);
            console.log(range[i].max + 'maximum ' + tempMap);
            range[i].findRange();
            range[i].findYTips();

            range[i].drawChart(i);




            //range.push(obj.data[i][tempMap])
            //console.log(obj.data[i][tempMap]);
        }
         



    }
    parseData(jsonData);