import { Template } from 'meteor/templating';
import { SensorNames } from '../imports/collections/sensors.js';
import { Sensors } from '../imports/collections/sensors.js';

var subscriptions = new SubsManager();
Template.sidebar.onCreated(function () {
    var self = this;

    self.autorun(function() {
        //self.subscribe("sensornames",function(){
           //});
         subscriptions.subscribe('sensornames');
      
          
    });




});

Tracker.autorun(function()
{
	    //console.log(Sensors.find({}).fetch());
	
  	
});


Template.sidebar.onRendered(function(){
  $(".senzor_menu_items").hide();
      

 $('.ui.accordion').accordion('refresh');
/*      $(window).scroll(function() {
    var windowHeight = $(window).height();
    console.log(windowHeight);
    $("#sidebar").css("height", windowHeight);
});
*/    

});

Template.sidebar.helpers({
	sensorsname() {
		 
      if(Meteor.user().username==="administrator"){
        var distinctNamesFromNames= _.uniq(SensorNames.find({},
                {sort:{nodename:1},fields:{nodename:1,description:1}}).map(function(x) {
           return x;
           //return names=_.pluck(distinctNames, 'description');
      }), true);
      }else {
        var distinctNamesFromNames= _.uniq(SensorNames.find({'role':'live'},
                {sort:{nodename:1},fields:{nodename:1,description:1}}).map(function(x) {
           return x;
           //return names=_.pluck(distinctNames, 'description');
      }), true);
      }
      

    /*  var distinctNamesfromValues= _.uniq(Sensors.find({},
                {sort:{nodename:1}  ,fields:{nodename:1}}).map(function(y) {
           return y;
           //return names=_.pluck(distinctNames, 'description');
      }), true);*/

//    console.log(_.uniq(SensorNames.find({},{sort:{nodename:1},fields:{nodename:1,description:1}})));
      
    //console.log("distinctFromNames: "+distinctNamesFromNames.nodename);
    //console.log("distinctFromValues: "+distinctNamesfromValues.nodename);


    Session.set('distinctNamesFromNames',distinctNamesFromNames);
  
    return Session.get('distinctNamesFromNames');
	},

    userInfo: function () {
    //return Meteor.user().emails[0].address;
    console.log(Meteor.user().username)
    return Meteor.user().username;
  }

});

/*Template.sidebar.onRendered(function(){
  $('.ui.dropdown')
  .dropdown();
});*/



