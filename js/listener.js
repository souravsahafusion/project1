function entercoordinates(parameter, event) {
    //console.log(parameter+ 'parameter');
    //console.log(this);

    var cArr = document.getElementsByClassName(parameter);
    var rollover = new CustomEvent("syncCrossHair", {
        "detail": {
            x: event.clientX,
            y: event.clientY,
            ins: this
        }
    });
    for (var i = 0; i < cArr.length; i++) {
        if (cArr[i] != event.target)
            cArr[i].dispatchEvent(rollover);
    }

};

function removeToolTip(event) {
    var object = chartModel;
    if (flagRemoveColor !== 1) {
        var columnElement = document.getElementsByClassName("plotColumnGraph");
        for (var i = 0; i < columnElement.length; i++) {

            columnElement[i].style.fill = "rgb(30, 122, 205)";
            columnElement[i].style.stroke = "rgb(30, 122, 205)";

        }
    }

    for (var i = 0; i < obj.data.length; i++) {
        //console.log("removed");
        var toolTipRect = object[i].toolTipBoxIns;
        toolTipRect.setAttribute("visibility", "hidden");
        var textElement = object[i].toolTipTextIns;
        textElement.setAttribute("visibility", "hidden");


    }



};

function clearcoor(event) {

    var lineElement = document.getElementsByClassName("drawCrossHairLines");
    var object = chartModel;
    for (var i = 0; i < lineElement.length; i++) {
        lineElement[i].setAttribute("visibility", "hidden");
        var toolTipRect = object[i].toolTipBoxIns;
        toolTipRect.setAttribute("visibility", "hidden");
        var textElement = object[i].toolTipTextIns;
        textElement.setAttribute("visibility", "hidden");


    }
};

function columnTrigger(event) {
    var x = event.detail.x % obj.chart.width;

    x = x - 8;
    var index = -1;
    //console.log(x);
    var posScale = obj.scaleColChartFactor / 100 * widthEachChart;

    for (var i = posScale; i > 0; i--) {
        //console.log(i);
        //console.log(x+i);
        storeAncorPointsX.indexOf(x + i);

        if (storeAncorPointsX.indexOf(x + i) !== -1 || storeAncorPointsX.indexOf(x - i) !== -1) {
            //index = 0;  //find better way for choosing index
            //console.log(x+i);
            if (storeAncorPointsX.indexOf(x + i) !== -1) {
                // console.log(x+posScale);
                index = storeAncorPointsX.indexOf(x + i);
                x = x + i;
            }
            if (storeAncorPointsX.indexOf(x - i) !== -1) {
                //console.log(x-posScale);
                index = storeAncorPointsX.indexOf(x - i);
                x = x - i;
            }
            //console.log(index);

        }

    }

    var object = chartModel;
    var value = 0;
    //console.log(index);
    if (index !== -1) {
        var columnElement = document.getElementsByClassName("plotColumnGraph");
        for (var i = 0; i < columnElement.length; i++) {
            var test = Math.floor(columnElement[i].getAttribute("x"));
            test = test + widthEachChart * obj.scaleColChartFactor / 100;

            if (test == x) {
                //console.log(x);
                columnElement[i].style.fill = "red";
                columnElement[i].style.stroke = "red";

            }

        }

        for (var i = 0; i < obj.y_axis_map.length; i++) {
            //for(var j = 0; j < obj.data.length; j++){
            if (typeof object[i].storeAncorPointsY[index] !== 'undefined') {

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
                toolTipRect.setAttributeNS(null, 'x', x + widthEachChart * shiftXTipLine);
                toolTipRect.setAttributeNS(null, 'y', y - heightEachChart * .1);
                toolTipRect.setAttributeNS(null, 'height', heightEachChart * .1);
                toolTipRect.setAttributeNS(null, 'width', widthEachChart * .25);
                toolTipRect.setAttribute("class", "toolTipRect");
                toolTipRect.setAttribute("style", "stroke:rgb(157, 119, 106);fill:rgb(255, 217, 204)");


                object[i].svg.appendChild(toolTipRect);
                toolTipRect.setAttribute("visibility", "visible");

                y = y - heightEachChart * .05;
                textElement.setAttribute("x", x + widthEachChart * .05);
                textElement.setAttribute("y", y);
                textElement.innerHTML = value;
                var fontSize = heightEachChart * .05;
                textElement.setAttribute("font-size", fontSize);
                textElement.setAttribute("transform", transform);
                textElement.setAttribute("style", "rgb(197, 159, 146)");
                object[i].svg.appendChild(textElement);
                textElement.setAttribute("visibility", "visible");

            }
        }
    } else {
        /* for(var i = 0; i < obj.y_axis_map.length; i++){
          
                   
                    var className = "toolTipText";
                    var textElement = object[i].toolTipTextIns;                        
                   textElement.setAttribute("visibility","hidden");
             
        }*/

    }



};

function showCoords(event) {
    //console.log(this);
    var x = event.detail.x % obj.chart.width;
    x = x - 8;
    var index = -1;

    //for loop might not be the best solution for finding the range
    for (var i = 5; i > 0; i--) {

        if (storeAncorPointsX.indexOf(x + i) !== -1 || storeAncorPointsX.indexOf(x - i) !== -1) {
            //index = 0;  //find better way for choosing index
            if (storeAncorPointsX.indexOf(x + i) !== -1) {
                index = storeAncorPointsX.indexOf(x + i);
                x = x + i;
            }
            if (storeAncorPointsX.indexOf(x - i) !== -1) {
                index = storeAncorPointsX.indexOf(x - i);
                x = x - i;
            }
            //console.log(index);

        }

    }

    var object = chartModel;
    if (index !== -1) {
        //className = "circleTip"+index;
        //var colorCirle = event.currentTarget.getElementsByClassName(className).style.fill="red";
        //console.log(colorCirle);
        //console.log(index);
        /*var columnElement = document.getElementsByClassName("circleTip");
        console.log(columnElement);
        for(var i = 0; i < columnElement.length; i++){
            var test = Math.floor(columnElement[i].getAttribute("cx")); 
            test = test 
            if(test == x){
                
                columnElement[i].style.fill = "red"; 
                columnElement[i].style.stroke = "red";
            }
            
           
        }*/
        var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
        for (var i = 0; i < obj.y_axis_map.length; i++) {

            if (typeof object[i].storeAncorPointsY[index] !== 'undefined') {
                value = object[i].storeValue[index];
                var y = object[i].storeAncorPointsY[index];

                var transform = "rotate(0 " + x + "," + y + ")";
                var className = "toolTipText";
                var textElement = object[i].toolTipTextIns;
                var toolTipRect = object[i].toolTipBoxIns;

                //object[i].addText(x, y, value, transform, className, textElement);
                //function call is costly hence avoided
                toolTipRect.setAttributeNS(null, 'x', x + widthEachChart * shiftXTipLine); //for setting the bound offset of the tooltip
                toolTipRect.setAttributeNS(null, 'y', y - heightEachChart * .1);
                toolTipRect.setAttributeNS(null, 'height', heightEachChart * .1);
                toolTipRect.setAttributeNS(null, 'width', widthEachChart * .25);
                toolTipRect.setAttribute("class", "toolTipRect");
                toolTipRect.setAttribute("style", "stroke:rgb(157, 119, 106);fill:rgb(255, 217, 204)");


                object[i].svg.appendChild(toolTipRect);
                toolTipRect.setAttribute("visibility", "visible");

                y = y - heightEachChart * .05;
                textElement.setAttribute("x", x + widthEachChart * .05);
                textElement.setAttribute("y", y);
                textElement.innerHTML = value;
                var fontSize = heightEachChart * .05;
                textElement.setAttribute("font-size", fontSize);
                textElement.setAttribute("transform", transform);
                textElement.setAttribute("style", "rgb(197, 159, 146)");
                object[i].svg.appendChild(textElement);
                textElement.setAttribute("visibility", "visible");
            }


        }
    } else {
        for (var i = 0; i < obj.y_axis_map.length; i++) {

            var toolTipRect = object[i].toolTipBoxIns;
            toolTipRect.setAttribute("visibility", "hidden");
            var textElement = object[i].toolTipTextIns;
            textElement.setAttribute("visibility", "hidden");

        }

    }

    var lineElement = document.getElementsByClassName("drawCrossHairLines");
    for (var i = 0; i < lineElement.length; i++) {
        lineElement[i].setAttribute("visibility", "visible");
        //console.log(x + 'crossHairLine');
        lineElement[i].setAttribute("x1", x);
        lineElement[i].setAttribute("x2", x);

    }
};

function instantiateDragLine(event) {
    if (flagRemoveColor !== 1) {
        var xC = event.clientX % obj.chart.width - 10;
        var yC = event.pageY % obj.chart.height - heightEachChart * chartModel[0].yShift - 45;
        console.log(xC + 'x ' + 'y ' + yC, obj.chart.width);
        console.log(event.clientX + 'clientX' + event.clientY + 'clientY');

        var rect = this.selectRectIns;
        rect.setAttributeNS(null, 'x', xC);
        rect.setAttributeNS(null, 'y', yC);
        rect.setAttributeNS(null, 'height', 1);
        rect.setAttributeNS(null, 'width', 1);
        rect.setAttribute("class", "selectRect");
        rect.setAttribute("style", "fill:transparent;stroke:rgb(0,0,0)");
        flag = 1;
        flagRemoveColor = 1;
        //console.log(parameter);
        //this.svg.appendChild(rect);
    } else {

        var columnElement = document.getElementsByClassName("ancorTipCicle");
        console.log(columnElement.length);
        for (var i = 0; i < columnElement.length; i++) {

            columnElement[i].style.fill = "white";
            columnElement[i].style.stroke = "rgb(30, 122, 205)";

        }
        flagRemoveColor = 0;

    }

};

function instantiateDragCol(event) {
    if (flagRemoveColor !== 1) {
        var xC = event.clientX % obj.chart.width - 10;
        var yC = event.pageY % obj.chart.height - heightEachChart * chartModel[0].yShift - 45;
        console.log(xC + 'x ' + 'y ' + yC, obj.chart.width);
        console.log(event.clientX + 'clientX' + event.clientY + 'clientY');

        var rect = this.selectRectIns;
        rect.setAttributeNS(null, 'x', xC);
        rect.setAttributeNS(null, 'y', yC);
        rect.setAttributeNS(null, 'height', 1);
        rect.setAttributeNS(null, 'width', 1);
        rect.setAttribute("class", "selectRect");
        rect.setAttribute("style", "fill:transparent;stroke:rgb(0,0,0)");
        flag = 1;
        flagRemoveColor = 1;
        //console.log(parameter);
        //this.svg.appendChild(rect);
    } else {

        var columnElement = document.getElementsByClassName("plotColumnGraph");
        for (var i = 0; i < columnElement.length; i++) {

            columnElement[i].style.fill = "rgb(30, 122, 205)";
            columnElement[i].style.stroke = "rgb(30, 122, 205)";

        }
        flagRemoveColor = 0;

    }




};

function dragColRect(event) {
    if (flag == 1) {
        var rect = this.selectRectIns;
        var xC = event.clientX % obj.chart.width - 10;
        var yC = event.pageY % obj.chart.height - heightEachChart * chartModel[0].yShift - 45;
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
        //console.log(columnElement);
        for (var i = 0; i < columnElement.length; i++) {
            var testX = Math.floor(columnElement[i].getAttribute("x"));
            //console.log(testX + testX);
            testX = testX + widthEachChart * obj.scaleColChartFactor / 100;
            var testY = Math.floor(columnElement[i].getAttribute("y"));
            //console.log(testY + 'y');

            if (testX <= xC && testX >= xBeg && testY <= yC) {
                //console.log(x);
                columnElement[i].style.fill = "red";
                columnElement[i].style.stroke = "red";

            }


            //console.log(xPrev+ 'xPrev ' + yPrev + " yPrev ");  

        }



    }
};

function dragLineRect(event) {
    if (flag == 1) {
        var rect = this.selectRectIns;
        var xC = event.clientX % obj.chart.width /*- 10*/ ;
        var yC = event.pageY % obj.chart.height - heightEachChart * chartModel[0].yShift /* - 45*/ ;
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
        var columnElement = document.getElementsByClassName("ancorTipCicle");
        console.log(columnElement.length + 'length');
        for (var i = 0; i < columnElement.length; i++) {
            var testX = Math.floor(columnElement[i].getAttribute("cx"));
            var testR = columnElement[i].getAttribute("r");

            testX = testX + widthEachChart * obj.scaleColChartFactor / 100;
            var testY = Math.floor(columnElement[i].getAttribute("cy"));
            //console.log(testY + 'y');
            console.log(xC + 'xc' + testR + 'testR' + testY + 'testY');



            if (testX <= xC && testX >= xBeg && testY <= yC) {

                columnElement[i].style.fill = "red";
                columnElement[i].style.stroke = "red";

            }


            //console.log(xPrev+ 'xPrev ' + yPrev + " yPrev ");  

        }



    }
};

function releaseLineRect(event) {
    var rect = this.selectRectIns;

    rect.setAttributeNS(null, 'height', 0);
    rect.setAttributeNS(null, 'width', 0);

    flag = 0;


};

function releaseColRect(event) {
    var rect = this.selectRectIns;

    rect.setAttributeNS(null, 'height', 0);
    rect.setAttributeNS(null, 'width', 0);

    flag = 0;


};