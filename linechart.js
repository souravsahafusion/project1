
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
                    "revenue": 3600.75,      //value for month june
                    "sales":25,
                    "visited":72,
                    "profit":5,
                    "date":"25/6/2016"

                },
                {
                    "revenue": 5600,      // value for month april
                    "sales":15,
                    "visited":600,
                    "profit":3,
                    "date":"25/4/2016"

                },
                {
                    "revenue": 75000,      //value for month march
                    "sales":250,
                    "visited":300,
                    "date":"05/3/2016"

                }


          ]        
};

var obj={};
var tip={

    min:0,
    max:0,
    range:0,
    stringValue:'',
    maxTipValue:0,
    minTipValue:0,
    diffBwTips:0,
    findMin:function(tempMap){
        if ( typeof tempMap !==undefined )
        {
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
      }else{

      }
        
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

    },
    findRange:function(tempMap)
    {
        var minValue = Math.floor(this.min);
        var lastTwoMinDigit = minValue % 100;
        this.minTipValue = minValue - lastTwoMinDigit;
        var maxValue = Math.ceil(this.max);
        var lastTwoMaxDigit = maxValue % 100;
        if(lastTwoMaxDigit !== 0)
        {
            this.maxTipValue = this.max + ( 100 - lastTwoMaxDigit );
        }else{
            this.maxTipValue = this.max + ( lastTwoMaxDigit );
        }
        
        this.diffBwTips = this.maxTipValue - this.minTipValue;
        console.log(this.minTipValue);
        console.log(this.maxTipValue);
        console.log(this.diffBwTips);
        //console.log(minValue);


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
            //console.log(range[i].min);
            range[i].max = range[i].findMax(tempMap);
            //console.log(range[i].max);
            range[i].findRange(tempMap);





            //range.push(obj.data[i][tempMap])
            //console.log(obj.data[i][tempMap]);
          }
}

parseData(jsonData);