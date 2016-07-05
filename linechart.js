
var jsonData={
        

          
            "chart":{
                "caption": "caption",
                "subCaption": "subCaption",
                "width":500,
                "height":300
                ""

            },

           
            
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

function parseData(user_input)
{
obj.chart=user_input.chart;
alert(obj.chart.caption);

}
parseData(jsonData);