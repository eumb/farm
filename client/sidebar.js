import { Template } from 'meteor/templating';
import { SensorNames } from '../imports/collections/sensors.js';
import { Sensors } from '../imports/collections/sensors.js';



/*Template.dashboard.onCreated(function () {
    var self = this;
    

    self.autorun(function() {
        self.subscribe("sensorvalues",function(){
         
        });
          
    });
});*/

Tracker.autorun(function()
{
	    //console.log(Sensors.find({}).fetch());
	    var distinctNames= _.uniq(Sensors.find({},
	    					{sort:{nodename:1},fields:{nodename:1}}).map(function(x) {
    				return x.nodename;
	    }), true);
		
		console.log(distinctNames);
		Session.set('distinctNames',distinctNames);
  	
});


Template.sidebar.helpers({
	sensorsname() {
		return Session.get('distinctNames');
	}
});

Template.sidebar.onRendered(function(){
  $('.ui.dropdown')
  .dropdown()
;
});


//set Session in order to have the senzor name for which to create the graph
Template.body.events({
    'click .senzor_name':function(){
    	var senzor= $(this).html();
    	console.log(senzor);
    	Session.set("senzor",senzor);
    }
});

