function displayCrossHair(event) {
    var x = event.detail.x % obj.chart.width;
    x = x - 8;
    var lineElement = document.getElementsByClassName("drawCrossHairLines");
    for (var i = 0; i < lineElement.length; i++) {
        lineElement[i].setAttribute("visibility", "visible");
        //console.log(x + 'crossHairLine');
        lineElement[i].setAttribute("x1", x);
        lineElement[i].setAttribute("x2", x);

    }
};

function removeCrossHair(event) {
    var lineElement = document.getElementsByClassName("drawCrossHairLines");
    for (var i = 0; i < lineElement.length; i++) {
        lineElement[i].setAttribute("visibility", "hidden");

    }
};