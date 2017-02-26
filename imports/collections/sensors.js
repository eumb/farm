import { Mongo } from 'meteor/mongo';


export const Sensors = new Mongo.Collection('sensorvalues');
export const SensorNames = new Mongo.Collection('sensornames');


if (Meteor.isServer) {
  // This code only runs on the server

/*  	Meteor.publish('sensorvalues', function sensorsPublication() {
 	
    return Sensors.find({});
  	});*/
  
	Meteor.publish('sensornames', function sensorsPublication() {
 		console.log("subscribed to sensornames");
    	return Sensors.find({});
  	});
  
    Meteor.publish('sensorvalues', function sensorsPublication() {
 		//console.log("subscribed to sensornames");
 		//console.log(Sensors.find({}));	
    	return Sensors.find({},{sort: {'created_at' : -1}});
  	});
  
   /* Meteor.publish('senzor_4', function sensorsPublication() {
    	console.log("subscribed to senzor IMEI");
	    return Sensors.find({'nodename':"359852051269299"},{limit:10});
  	});
  
    Meteor.publish('senzor_1', function sensorsPublication() {
 		console.log("subscribed to senzor 1");
    //	console.log(Sensors.find({nodename:"Senzor_1"},{limit:10}));
    	return Sensors.find({nodename:"Senzor_1"},{limit:10});
    	
  	});
  
    Meteor.publish('senzor_3', function sensorsPublication() {
	    console.log("subscribed to senzor 3");
	    return Sensors.find({nodename:"Senzor_3"},{limit:10});
  	});
  
    Meteor.publish('senzor_2', function sensorsPublication() {
	    console.log("subscribed to senzor 2");
	    return Sensors.find({nodename:"Senzor_2"},{limit:10});
  	});
 
  */
  
}


