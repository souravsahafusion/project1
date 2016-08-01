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