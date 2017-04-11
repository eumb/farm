import { Template } from 'meteor/templating';
import { Modules } from 'meteor/modules';
import { Sensors } from '../imports/collections/sensors.js';
import { SensorNames} from '../imports/collections/sensors.js';
import { SensorTelemetry} from '../imports/collections/sensors.js';

Meteor.startup(function() {  
  GoogleMaps.load({ v: '3', key: 'AIzaSyCOronufACD2bgiBIhOZBGETSsn78xXgkk', libraries: 'geometry,places' });

});



Template.administration.onCreated(function() {
 
    var self = this;
    
  
    self.autorun(function() {
        //self.subscribe('sensorvalues',Session.get('senzor'));
        self.subscribe('sensornames');
        self.subscribe('sensortelemetries')
    });
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('sensorMap', function(map) {
       // Add a marker to the map once it's ready
    

 var isDate1=Session.get('senzor1date');
 if (isDate1==="nottoday"){
  $('#card1').css('background-color','lightgray');
 };
 var isDate2=Session.get('senzor2date');
 if (isDate2==="nottoday"){
  $('#card2').css('background-color','lightgray');
 };
 var isDate3=Session.get('senzor3date');
 if (isDate3==="nottoday"){
  $('#card3').css('background-color','lightgray');
 };
 var isDate4=Session.get('senzor4date');
 if (isDate4==="nottoday"){
  $('#card4').css('background-color','lightgray');
 };
  var isDate5=Session.get('senzor5date');
 if (isDate5==="nottoday"){
  $('#card4').css('background-color','lightgray');
 }
       
    Tracker.autorun(function() {

      ///TO DO 
      // do not hardcode
        //var locationS1 = SensorTelemetry.findOne({nodename:"Senzor_1",'lat':{$exists:true}});
        //console.log("locationS1 " +locationS1);
        var locationS2 = SensorTelemetry.findOne({nodename:"Senzor_2",'lat':{$exists:true}});
       // var locationS3 = SensorTelemetry.findOne({nodename:"Senzor_3",'lat':{$exists:true}});
        var locationS4 = SensorTelemetry.findOne({nodename:"Senzor_4",'lat':{$exists:true}});
        var locationS5 = SensorTelemetry.findOne({nodename:"Senzor_5",'lat':{$exists:true}});
        //console.log("Getting telemerty long/lat");
        
   /*     var latS1 = locationS1.lat;
        var longS1= locationS1.long;*/
        var latS2 = locationS2.lat;
        var longS2= locationS2.long;
/*        var latS3 = locationS3.lat;
        var longS3= locationS3.long;*/
        var latS4 = locationS4.lat;
        var longS4= locationS4.long;
        var latS5 = locationS5.lat;
        var longS5= locationS5.long;

        //console.log ("latS5 "+latS5);
        //console.log ("longS5 "+longS5);
      


     /*  var marker = new google.maps.Marker({
         position: new google.maps.LatLng(latS1, longS1),
         title:"Senzor_1",
         map: map.instance
       });*/
       var marker2 = new google.maps.Marker({
          position: new google.maps.LatLng(latS2, longS2),
          title:"Senzor_2",
          map: map.instance
      });
   /*    var marker3 = new google.maps.Marker({
          position: new google.maps.LatLng(latS3, longS3),
          title:"Senzor_3",
          map: map.instance
      });*/
         var marker4 = new google.maps.Marker({
          position: new google.maps.LatLng(latS4, longS4),
          title:"Senzor_4",
          map: map.instance
      });
          var marker5 = new google.maps.Marker({
          position: new google.maps.LatLng(latS5, longS5),
          title:"Senzor_5",
          map: map.instance
      });
    });
});
});
  




Template.administration.helpers({

	 userInfo: function () {
    //return Meteor.user().emails[0].address;
    console.log(Meteor.user().username)
    return Meteor.user().username;
  },
  sensornames:function(){

		return SensorNames.find({});
	},
  
    sensordescriptionS3:function(){
      
      var data=SensorTelemetry.findOne({nodename:"Senzor_3",'batt_level':{$exists:true}},{sort: {'created_at' : -1}});
      var sensorname=SensorNames.findOne({nodename:"Senzor_3"});
      var description=sensorname.description;
      //console.log("description: "+description);
      return description;      

  },

  
  sensortelemetrybateryS3:function(){


    //console.log(SensorTelemetry.find({'nodename':"Senzor_3",'batt_level':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch());
    

    return SensorTelemetry.find({'nodename':"Senzor_3",'batt_level':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch();
  },

  sensortelemetrydateS3:function(){


    //console.log(SensorTelemetry.find({'nodename':"Senzor_1",'lat':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch());
    var data=SensorTelemetry.findOne({nodename:"Senzor_3",'batt_level':{$exists:true}},{sort: {'created_at' : -1}});
    
    //formated_data=data.created_at.toLocaleFormat('%d-%b-%Y');
    var today=data.created_at;
    var notToday="nottoday";
    //console.log("date:"+data.created_at);
    var options = { year: 'numeric', month: 'long', day: 'numeric'/*,hour:'numeric',minute:'numeric' */};

    var todaysDate = new Date();
    
    if(today.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
    // Date equals today's date
    console.log("data e azi");

    return today.toLocaleDateString("en-US",options);

    }else{
      console.log("data nu e azi");
     Session.set('senzor3date',notToday);
      return today.toLocaleDateString("en-US",options);
      
    }
    
    //console.log("formated date: "+formatted);
    //console.log(formated_data);
  },

  sensortelemetrymemS3:function(){


    //console.log(SensorTelemetry.find({'nodename':"Senzor_3",'free_mem':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch());
    return SensorTelemetry.find({nodename:"Senzor_3",'free_mem':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch();
  },
  sensortelemetrygpsS3:function(){


    //console.log(SensorTelemetry.find({'nodename':"Senzor_3",'lat':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch());
    return SensorTelemetry.find({nodename:"Senzor_3",'lat':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch();
  },




  sensordescriptionS1:function(){
      
      var data=SensorTelemetry.findOne({nodename:"Senzor_1",'batt_level':{$exists:true}},{sort: {'created_at' : -1}});
      var sensorname=SensorNames.findOne({nodename:"Senzor_1"});
      var description=sensorname.description;
      //console.log("description: "+description);
      return description;      

  },


    sensortelemetrybateryS1:function(){


   //console.log(SensorTelemetry.find({'nodename':"Senzor_1",'batt_level':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch());
    return SensorTelemetry.find({'nodename':"Senzor_1",'batt_level':{$exists:true}},{sort: {'created_at' : -1},limit:1});
  },


    sensortelemetrydateS1:function(){


    //console.log(SensorTelemetry.find({'nodename':"Senzor_1",'lat':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch());
    var data=SensorTelemetry.findOne({nodename:"Senzor_1",'batt_level':{$exists:true}},{sort: {'created_at' : -1}});
    
    //formated_data=data.created_at.toLocaleFormat('%d-%b-%Y');
    var today=data.created_at;
    var notToday="nottoday";
    //console.log("date:"+data.created_at);
    var options = { year: 'numeric', month: 'long', day: 'numeric'/*,hour:'numeric',minute:'numeric' */};

    var todaysDate = new Date();
    
    if(today.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
    // Date equals today's date
    console.log("data e azi");

    return today.toLocaleDateString("en-US",options);

    }else{
      console.log("data nu e azi");
     Session.set('senzor1date',notToday);
      return today.toLocaleDateString("en-US",options);
      
    }
    
    //console.log("formated date: "+formatted);
    //console.log(formated_data);
  },

  sensortelemetrymemS1:function(){


    //console.log(SensorTelemetry.find({'nodename':"Senzor_1",'free_mem':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch());
    return SensorTelemetry.find({nodename:"Senzor_1",'free_mem':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch();
    
  },
  sensortelemetrygpsS1:function(){


    //console.log(SensorTelemetry.find({'nodename':"Senzor_1",'lat':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch());
    return SensorTelemetry.find({nodename:"Senzor_1",'lat':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch();
  },



    sensordescriptionS2:function(){
      
      var data=SensorTelemetry.findOne({nodename:"Senzor_2",'batt_level':{$exists:true}},{sort: {'created_at' : -1}});
      var sensorname=SensorNames.findOne({nodename:"Senzor_2"});
      var description=sensorname.description;
      //console.log("description: "+description);
      return description;      

  },

  
  sensortelemetrybateryS2:function(){


    //console.log(SensorTelemetry.find({'nodename':"Senzor_2",'batt_level':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch());
    return SensorTelemetry.find({'nodename':"Senzor_2",'batt_level':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch();
  },

   sensortelemetrydateS2:function(){


    //console.log(SensorTelemetry.find({'nodename':"Senzor_1",'lat':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch());
    var data=SensorTelemetry.findOne({nodename:"Senzor_2",'batt_level':{$exists:true}},{sort: {'created_at' : -1}});
    
    //formated_data=data.created_at.toLocaleFormat('%d-%b-%Y');
     var today=data.created_at;
    var notToday="nottoday";
    //console.log("date:"+data.created_at);
    var options = { year: 'numeric', month: 'long', day: 'numeric'/*,hour:'numeric',minute:'numeric' */};

    var todaysDate = new Date();
    
    if(today.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
    // Date equals today's date
    console.log("data e azi");

    return today.toLocaleDateString("en-US",options);

    }else{
      console.log("data nu e azi");
     Session.set('senzor2date',notToday);
      return today.toLocaleDateString("en-US",options);
      
    }
    
    //console.log("formated date: "+formatted);
    //console.log(formated_data);
  },


  sensortelemetrymemS2:function(){


    //console.log(SensorTelemetry.find({'nodename':"Senzor_2",'free_mem':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch());
    return SensorTelemetry.find({nodename:"Senzor_2",'free_mem':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch();
  },
  sensortelemetrygpsS2:function(){


    //console.log(SensorTelemetry.find({'nodename':"Senzor_2",'lat':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch());
    return SensorTelemetry.find({nodename:"Senzor_2",'lat':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch();
  },
  




  sensordescriptionS4:function(){
      
      var data=SensorTelemetry.findOne({nodename:"Senzor_4",'batt_level':{$exists:true}},{sort: {'created_at' : -1}});
      var sensorname=SensorNames.findOne({nodename:"Senzor_4"});
      var description=sensorname.description;
      //console.log("description: "+description);
      return description;      

  },


    sensortelemetrybateryS4:function(){


   //console.log(SensorTelemetry.find({'nodename':"Senzor_4",'batt_level':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch());
    return SensorTelemetry.find({'nodename':"Senzor_4",'batt_level':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch();
  },


  sensortelemetrydateS4:function(){


    //console.log(SensorTelemetry.find({'nodename':"Senzor_1",'lat':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch());
    var data=SensorTelemetry.findOne({nodename:"Senzor_4",'batt_level':{$exists:true}},{sort: {'created_at' : -1}});
    
    //formated_data=data.created_at.toLocaleFormat('%d-%b-%Y');
    var today=data.created_at;
    var notToday="nottoday";
    //console.log("date:"+data.created_at);
    var options = { year: 'numeric', month: 'long', day: 'numeric'/*,hour:'numeric',minute:'numeric' */};

    var todaysDate = new Date();
    
    if(today.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
    // Date equals today's date
    console.log("data e azi");

    return today.toLocaleDateString("en-US",options);

    }else{
      console.log("data nu e azi");
     Session.set('senzor4date',notToday);
      return today.toLocaleDateString("en-US",options);
      
    }
    
    //console.log("formated date: "+formatted);
    //console.log(formated_data);
  },

  sensortelemetrymemS4:function(){


    //console.log(SensorTelemetry.find({'nodename':"Senzor_4",'free_mem':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch());
    return SensorTelemetry.find({nodename:"Senzor_4",'free_mem':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch();
  },
  sensortelemetrygpsS4:function(){


    //console.log(SensorTelemetry.find({'nodename':"Senzor_4",'lat':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch());
    return SensorTelemetry.find({nodename:"Senzor_4",'lat':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch();
  },



  sensordescriptionS5:function(){
      
      var data=SensorTelemetry.findOne({nodename:"Senzor_5",'batt_level':{$exists:true}},{sort: {'created_at' : -1}});
      var sensorname=SensorNames.findOne({nodename:"Senzor_5"});
      var description=sensorname.description;
      //console.log("description: "+description);
      return description;      

  },

  
  sensortelemetrybateryS5:function(){


    //console.log(SensorTelemetry.find({'nodename':"Senzor_3",'batt_level':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch());
    

    return SensorTelemetry.find({'nodename':"Senzor_5",'batt_level':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch();
  },

  sensortelemetrydateS5:function(){


    //console.log(SensorTelemetry.find({'nodename':"Senzor_1",'lat':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch());
    var data=SensorTelemetry.findOne({nodename:"Senzor_5",'batt_level':{$exists:true}},{sort: {'created_at' : -1}});
    
    //formated_data=data.created_at.toLocaleFormat('%d-%b-%Y');
    var today=data.created_at;
    var notToday="nottoday";
    //console.log("date:"+data.created_at);
    var options = { year: 'numeric', month: 'long', day: 'numeric'/*,hour:'numeric',minute:'numeric' */};

    var todaysDate = new Date();
    
    if(today.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
    // Date equals today's date
    console.log("data e azi");

    return today.toLocaleDateString("en-US",options);

    }else{
      console.log("data nu e azi");
     Session.set('senzor5date',notToday);
      return today.toLocaleDateString("en-US",options);
      
    }
    
    //console.log("formated date: "+formatted);
    //console.log(formated_data);
  },

  sensortelemetrymemS5:function(){


    //console.log(SensorTelemetry.find({'nodename':"Senzor_3",'free_mem':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch());
    return SensorTelemetry.find({nodename:"Senzor_5",'free_mem':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch();
  },
  sensortelemetrygpsS5:function(){


    //console.log(SensorTelemetry.find({'nodename':"Senzor_3",'lat':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch());
    return SensorTelemetry.find({nodename:"Senzor_5",'lat':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch();
  },

  
  sensorMapOptions:function(){
    //console.log(SensorTelemetry.find({'nodename':"Senzor_1",'lat':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch());
    
    if (GoogleMaps.loaded()) {
      // Map initialization options
      //console.log("Rendering map");
      return {
        center: new google.maps.LatLng(44.4, 26.09),
        zoom: 10
      };
    }
},  




	
});

Template.administration.events({
  'submit form':function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    var descriptionVar = event.target.description.value;
    //console.log(descriptionVar);
    console.log(this);
    SensorNames.update(this._id, {
      $set: { description:descriptionVar},
    });
  }
});


Template.administration.onRendered(function(){


});


