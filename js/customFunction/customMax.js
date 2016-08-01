function arrangeOnMax() {
        var maxValueArray = [];
        object = range2;
        for (var i = 0; i < obj.y_axis_map.length; i++) {
            maxValueArray.push(object[i].max);

        }
        var length = maxValueArray.length;

        for (var i = 0; i < length - 1; i++) { //Number of passes
            var max = i; //min holds the current minimum number position for each pass; i holds the Initial min number
            for (var j = i + 1; j < length; j++) { //Note that j = i + 1 as we only need to go through unsorted array
                if (maxValueArray[j] > maxValueArray[max]) { //Compare the numbers
                    max = j; //Change the current min number position if a smaller num is found
                }
            }
            if (max != i) { //After each pass, if the current min num != initial min num, exchange the position.
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