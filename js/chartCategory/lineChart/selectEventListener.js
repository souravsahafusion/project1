



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
            //console.log(parameter);
            //this.svg.appendChild(rect);
            
        } else {


            var columnElement = document.getElementsByClassName("ancorTipCicle");
            //console.log(flagRemoveColor + 'flagRemoveColor');
            for (var i = 0; i < columnElement.length; i++) {

                columnElement[i].style.fill = "white";
                columnElement[i].style.stroke = "rgb(30, 122, 205)";

            }
            flagRemoveColor = 0;

        }

};
function dragLineRect(event) {
   

    if (flag == 1) {
            var rect = this.selectRectIns;
            var xC = event.clientX % obj.chart.width - 10;
            var yC = event.pageY % obj.chart.height - heightEachChart * chartModel[0].yShift - 45 ;
            var xBeg = rect.getAttribute("x");
            var yBeg = rect.getAttribute("y");
            var width = Math.abs(xC - xBeg);
            var height = Math.abs(yBeg - yC);
            flagRemoveColor = 1;
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



                if (testX <= xC && testX >= xBeg && testY <= yC && testY >= yBeg) {

                    columnElement[i].style.fill = "red";
                    columnElement[i].style.stroke = "red";

                }


                //console.log(xPrev+ 'xPrev ' + yPrev + " yPrev ");  

            }



        }
};
function releaseLineRect(event) {
    console.log("releaseLineRect");
    var rect = this.selectRectIns;

    rect.setAttributeNS(null, 'height', 0);
    rect.setAttributeNS(null, 'width', 0);
    
    flag = 0;


};


function outLineRect(event) {
    console.log("releaseLineRect");
    var rect = this.selectRectIns;

    rect.setAttributeNS(null, 'height', 0);
    rect.setAttributeNS(null, 'width', 0);
    
    flag = 0;


};