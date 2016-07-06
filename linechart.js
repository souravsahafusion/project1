
var jsonData={
        

          
            "chart":{
                "caption": "caption",
                "subCaption": "subCaption",
                "width":500,
                "height":300
                

            },

           "y_axis_tick":[5,4,3],
            "y_axis_map":["revenue","sales","visited"],
            "data": [
                {
                    "revenue": 3600,      //value for month june
                    "sales":25,
                    "visited":70,
                    "profit":5,
                    "date":"25/6/2016"

                },
                {
                    "revenue": 5600,      // value for month april
                    "sales":15,
                    "visited":60,
                    "profit":3,
                    "date":"25/4/2016"

                },
                {
                    "revenue": 5000,      //value for month march
                    "sales":25,
                    "visited":30,
                    "date":"05/3/2016"

                }


          ]        
};

var obj={};
var tip={

    min:0,
    max:0,
    range:0,
    findMin:function(tempMap){
        var minimum = obj.data[0][tempMap];



          for(var i=0;i<obj.y_axis_map.length;i++)
          {
            if(obj.data[i][tempMap] < minimum)
            {
                minimum = obj.data[i][tempMap];

            }
            //console.log(obj.data[i][tempMap]);
            
          }
          return minimum;
    },
    findMax:function(tempMap)
    {
        var maximum = obj.data[0][tempMap];



          for(var i=0;i<obj.y_axis_map.length;i++)
          {
            if(obj.data[i][tempMap] > maximum)
            {
                maximum = obj.data[i][tempMap];

            }
            //console.log(obj.data[i][tempMap]);
            
          }
          return maximum;

    }
};
function parseData(input)
{
obj = input;
var range = [];
//console.log(obj.data[1]["revenue"]);
//console.log(obj.y_axis_map.length);
for(var i = 0; i<obj.y_axis_map.length;i++)
          {
            var tempMap=obj.y_axis_map[i];
            range[i] = new Object(tip);
            range[i].min = range[i].findMin(tempMap);
            console.log(range[i].min);
            range[i].max = range[i].findMax(tempMap);
            console.log(range[i].max);




            //range.push(obj.data[i][tempMap])
            //console.log(obj.data[i][tempMap]);
          }
}

parseData(jsonData);