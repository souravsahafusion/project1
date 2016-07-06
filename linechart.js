
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
                    "revenue": 3600,
                    "sales":25,
                    "visited":70,
                    "profit":5,
                    "date":"25/6/2016"

                },
                {
                    "revenue": 5600,
                    "sales":15,
                    "visited":60,
                    "profit":3,
                    "date":"25/4/2016"

                },
                {
                    "revenue": 5000,
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
    findMin:function(){
          
    },
    findMax:function()
    {

    }
};
function parseData(user_input)
{
obj=user_input;
tip.min
console.log(obj.data[1]["revenue"]);

}
parseData(jsonData);