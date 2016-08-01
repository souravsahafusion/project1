function arrangeOnMin() {
    var minValueArray = [];
    
    object = range2;
    for (var i = 0; i < obj.y_axis_map.length; i++) {
        minValueArray.push(object[i].min);

    }
    var length = minValueArray.length;

    for (var i = 0; i < length - 1; i++) { //Number of passes
        var min = i; //min holds the current minimum number position for each pass; i holds the Initial min number
        for (var j = i + 1; j < length; j++) { //Note that j = i + 1 as we only need to go through unsorted array
            if (minValueArray[j] < minValueArray[min]) { //Compare the numbers
                min = j; //Change the current min number position if a smaller num is found
            }
        }
        if (min != i) { //After each pass, if the current min num != initial min num, exchange the position.
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