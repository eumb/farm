import { Template } from 'meteor/templating';
import { SensorNames } from '../imports/collections/sensors.js';
import { Sensors } from '../imports/collections/sensors.js';
import { Meteor } from 'meteor/meteor'; 



  
Template.body.onCreated(function () {
    var self = this;

  
    self.autorun(function() {
        self.subscribe('sensorvalues',Session.get('senzor'));

    });
      Session.set("itemMenu","Home");//default value

      


});

/*if (Meteor.isClient){

  //export const Impact=DDP.connect('http://bucurila.go.ro:4000');
  
  //console.log(Impact);

  
  
  
}*/
//set Session in order to have the senzor name for which to create the graph
Template.body.events({
    'click .senzor_name':function(){
    	var senzor= $(this).attr("data-nodename");
      var description= SensorNames.find({nodename:senzor}).fetch();
    	   var description_data=description.map(function(d){
          //console.log(d.description);
        return d.description;
    })


      console.log(description);
    	Session.set("senzor",senzor);

      Session.set("tempdisplay", "24hdata");
      
      Session.set("humiddisplay", "24hdata");
      
      Session.set("precipdisplay", "24hdata");
      
      Session.set("airHumidDisplay", "24hdata");
      
      Session.set("airPressDisplay", "24hdata");
     
      Session.set("airTempDisplay", "24hdata"); 


      Session.set('SenzorDescription',description_data);
    },
  /*  'click .senzor_menu':function(){
      $(".senzor_menu_items").show();
    },*/
      'click .administration':function(){
      $(".senzor_menu_items").hide();
    },
    'click .item_menu':function(){
      var item=$(this).text();
      console.log(item);
      return Session.set("itemMenu",item);
    }

});

Meteor.Spinner.options = {
    lines: 13, // The number of lines to draw
    length: 10, // The length of each line
    width: 5, // The line thickness
    radius: 15, // The radius of the inner circle
    corners: 0.7, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#fff', // #rgb or #rrggbb
    speed: 2, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    //top: 'auto', // Top position relative to parent in px
    //left: 'auto' // Left position relative to parent in px
};


