
var jsonData='{
        
            
            "chart":{
                 "caption": "caption",
                "subCaption": "subCaption",

            },

            "y_axis_name": ["items_sold","revenue","visited"],
            


            "x_axis_name":["Jan","Feb","Mar","Apr","May","Jun"],
            
            "data": [
                

            {

               "y-axis_value":[500,5.6,700]
                    
            }, {
                
                   
                   "y-axis_value":[500,5.6,700]
            }, {
                "y-axis_value":[500,5.6,700]
            }, {
               "y-axis_value":[500,5.6,700]
            }, {
                "y-axis_value":[500,5.6,700]
            }, {
                "y-axis_value":[500,5.6,700]
            }]

            
        
}',
obj=JSON.parse(jsonData);
alert(obj);


   