import { Mongo } from 'meteor/mongo';


export const Sensors = new Mongo.Collection('sensorvalues');
export const SensorNames = new Mongo.Collection('sensornames');
export const SensorTelemetry = new Mongo.Collection('sensortelemetries');

if (Meteor.isServer) {
    Meteor.publish('sensortelemetries', function sensorsPublication() {
    console.log("subscribed to sensortelemetries");
      return SensorTelemetry.find({},{sort: {'created_at' : -1}});
    }); 
    Meteor.publish('sensornames', function sensorsPublication() {
    console.log("subscribed to sensornames");
      return SensorNames.find({});
    }); 
    Meteor.publish('sensorvalues', function sensorsPublication(senzor) {
    	return Sensors.find({'nodename':senzor},{sort: {'created_at' : -1},'limit':10000});
  	});
}


