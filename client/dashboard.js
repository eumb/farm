import { Template } from 'meteor/templating';

import { Sensors } from '../imports/collections/sensors.js';



Template.dashboard.onCreated(function () {
    var self = this;
    
	Session.set('senzor',"Senzor_3")
    self.autorun(function() {
        self.subscribe("sensorvalues",function(){
          //showChart(); //show chart only after subscribtion ok

        });
          
    });
});




Tracker.autorun(function()
{
   
	chartNode=Session.get('senzor')
	var sensordata=Sensors.find({nodename:chartNode},{sort: {'created_at' : -1},limit:1}).fetch(); //mandatory ' ' not " "		//must have it like this for reactivity
    	//console.log(sensorhumiditydata);
    	var w1 = sensordata.map(function(d){
      			var rsw1=(d.w_1*8.19-150390)/(1-d.w_1*0.021);
    			swt1=(rsw1-550)/137.5;
      			return Math.round(swt1);
      			//return Math.round(d.w_1);
     	});
    	Session.set('sensorw1',w1);
    
    
    //console.log(Sensors.find({},{sort: {'created_at' : -1},limit:2}));

     //var sensorhumiditydata=Sensors.find({nodename:Session.get('senzor')},{limit:1}).fetch(); //mandatory ' ' not " "
    	//console.log(sensorhumiditydata);
    	var w2 = sensordata.map(function(d){
      			var rsw2=(d.w_2*8.19-150390)/(1-d.w_2*0.021);
    			swt2=(rsw2-550)/137.5;
      			return Math.round(swt2);
      			//return Math.round(d.w_2);
     	});
    Session.set('sensorw2',w2);
		var w3 = sensordata.map(function(d){
	      			var rsw3=(d.w_3*8.19-150390)/(1-d.w_3*0.021);
	    			swt3=(rsw3-550)/137.5;
	      			return Math.round(swt3);
	      			//return Math.round(d.w_3);
	     	});
	Session.set('sensorw3',w3);
	
	var sensortemps=sensordata.map(function(d){
        return d.soil_t;
    })

    //console.log(sensortemps);
    Session.set('sensortempsoil_t',sensortemps);
	
	
});




 
	




Template.dashboard.helpers({

	sensorw_1() {
    
    var w_1=Session.get('sensorw1');
   	console.log(Session.get('sensorw1'));
    return w_1;

  },

   sensorw_2() {
    
    var w_2=Session.get('sensorw2');
    console.log(Session.get('sensorw2'));
    return w_2;
  },
   sensorw_3() {
    
    var w_3=Session.get('sensorw3');
    console.log(Session.get('sensorw3'));
    return w_3;
  },
    	





	sensortemp() {
    //console.log(Sensors.find({}).fetch());
    var temp=Session.get('sensortempsoil_t');
    console.log(temp);

    return temp;
    //return Sensors.find({nodename:"Senzor_3"},{sort: {'created_at' : -1},limit:1}).fetch(); //mandatory ' ' not " "
    //console.log(Sensors.find({},{sort: {'created_at' : -1},limit:1}));
   },
  
  
  
  
  "myChartDataHumid": function() {
   
				var chartNode=Session.get('senzor');
			    console.log(chartNode);
			    dataset = Sensors.find({nodename:chartNode},{sort: {'created_at' : -1},limit:15}).fetch();
			  
			    var theDataw_1 = [];
			    var theDataw_2 = [];
			    var theDataw_3 = [];
			    var xScale=[];
			    
			    
			    var dataw_1 = dataset.map(function(d){
			      
			      var rsw1=(d.w_1*8.19-150390)/(1-d.w_1*0.021);
			      var swt1=(rsw1-550)/137.5;
			      return Math.round(swt1);
			    });
			
			    var dataw_2 = dataset.map(function(d){
			      
			      var rsw2=(d.w_2*8.19-150390)/(1-d.w_2*0.021);
			      var swt2=(rsw2-550)/137.5;
			      return Math.round(swt2);
			    });
			
			    var dataw_3 = dataset.map(function(d){
			      
			      var rsw3=(d.w_3*8.19-150390)/(1-d.w_3*0.021);
			      var swt3=(rsw3-550)/137.5;
			      return Math.round(swt3);
			    });
			    
			    //dataw_1=_.pluck(dataset, 'w_1');
			    //dataw_2=_.pluck(dataset, 'w_2');
			    //dataw_3=_.pluck(dataset, 'w_3');
			    scale=_.pluck(dataset, 'created_at');
			
			    theDataw_1=['10cm'].concat(dataw_1);
			    theDataw_2=['30cm'].concat(dataw_2);
			    theDataw_3=['50cm'].concat(dataw_3);
			    xScale=['x'].concat(scale);   
    
    return {
  
      data: {
        x:'x',
        
        columns: [
          xScale,
          theDataw_1,
          theDataw_2,
          theDataw_3
          
        ],

         type: 'spline',
      },
      axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d %H:%M:%S'
            }
        }
      },

        zoom: {
        enabled: true,
        rescale: true
        }
    };
  },


  "myChartDataTemp": function() {
  	
   var chartNode=Session.get('senzor');
	console.log(chartNode);
    dataset = Sensors.find({nodename:chartNode},{limit:15}).fetch();
  
    var theDatasoil_t = [];
    var xScale=[];
  


    datasoil_t=_.pluck(dataset, 'soil_t');
    scale=_.pluck(dataset, 'created_at');

    
    //console.log(dataw_1);

    theDatasoil_t=['temperatura'].concat(datasoil_t);
    xScale=['x'].concat(scale);
    return {
     
      data: {
        x:'x',
        
        columns: [
          xScale,
          theDatasoil_t
        
          
        ],

         type: 'spline',
      },
      axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d %H:%M:%S'
            }
        }
      },

        zoom: {
        enabled: true,
        rescale: true
        }
    };
  }

});








