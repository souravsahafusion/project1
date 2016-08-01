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

        var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
        for (var i = 0; i < object.length; i++) {

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
        for (var i = 0; i < object.length; i++) {

            var toolTipRect = object[i].toolTipBoxIns;
            toolTipRect.setAttribute("visibility", "hidden");
            var textElement = object[i].toolTipTextIns;
            textElement.setAttribute("visibility", "hidden");

        }

    }


};

function clearcoor(event) {


    var object = chartModel;
    for (var i = 0; i < object.length; i++) {

        var toolTipRect = object[i].toolTipBoxIns;
        toolTipRect.setAttribute("visibility", "hidden");
        var textElement = object[i].toolTipTextIns;
        textElement.setAttribute("visibility", "hidden");


    }
};