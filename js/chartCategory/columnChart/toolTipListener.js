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



function removeToolTip(event) {
    var object = chartModel;
    if (flagRemoveColor !== 1) {
        var columnElement = document.getElementsByClassName("plotColumnGraph");
        for (var i = 0; i < columnElement.length; i++) {

            columnElement[i].style.fill = "rgb(30, 122, 205)";
            columnElement[i].style.stroke = "rgb(30, 122, 205)";

        }
    }

    for (var i = 0; i < object.length; i++) {
        //console.log("removed");
        var toolTipRect = object[i].toolTipBoxIns;
        toolTipRect.setAttribute("visibility", "hidden");
        var textElement = object[i].toolTipTextIns;
        textElement.setAttribute("visibility", "hidden");


    }



};