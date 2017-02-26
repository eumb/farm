/*import { Template } from 'meteor/templating';

import { Sensors } from '../imports/collections/sensors.js';



Tracker.autorun(function()
{
   

	var sensordata=Sensors.find({nodename:Session.get('senzor')},{limit:1}).fetch(); //mandatory ' ' not " "
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



Template.sensorHumid.helpers({
 
	
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
    	
});



Template.sensorTemp.helpers({

sensortemp() {
    //console.log(Sensors.find({}).fetch());
    var temp=Session.get('sensortempsoil_t');
    console.log(temp);

    return temp;
    //return Sensors.find({nodename:"Senzor_3"},{sort: {'created_at' : -1},limit:1}).fetch(); //mandatory ' ' not " "
    //console.log(Sensors.find({},{sort: {'created_at' : -1},limit:1}));
   },
});*/