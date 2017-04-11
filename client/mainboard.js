import { Template } from 'meteor/templating';

import { Sensors } from '../imports/collections/sensors.js';



Template.mainboard.onCreated(function () {
    var self = this;
    
  
    self.autorun(function() {
        self.subscribe('sensorvalues','Senzor_4');

    });

 //chartNode='Senzor_4';


  var sensorairdata=Sensors.find({'nodename':'Senzor_4','air_t':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch(); //mandatory ' ' not " "   //must have it like this for reactivity


   var sensorair_temp=sensorairdata.map(function(d){
        return d.air_t;
    })
    console.log(sensorair_temp);
    Session.set('sensorair_temp',sensorair_temp);
  
    var sensorair_humid=sensorairdata.map(function(d){
     
        return d.humid;
    })

    //console.log(sensortemps);
    Session.set('sensorair_humid',sensorair_humid);
  
    



    var sensorair_pressure_mmhg=sensorairdata.map(function(d){
        //console.log(sensortemps);Formula exacta este 760 mm Hg = 101325 Pa = 1 atm. Adica P[mm Hg] = P[Pa] * 760 / 101325.
        var press_mmhg=d.press*760/101325;
       return Math.round(press_mmhg);
    })

    Session.set('sensorair_pressure_mmhg',sensorair_pressure_mmhg);



    var sensormeteodata=Sensors.find({'nodename':'Senzor_4','ane':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch(); //mandatory ' ' not " "   //must have it like this for reactivity

    var sensormeteo_vane=sensormeteodata.map(function(d){
        return d.vane;
    })
    Session.set('sensormeteo_vane',sensormeteo_vane);

    var sensormeteo_pluv1=sensormeteodata.map(function(d){
        return d.pluv1;
    })
    Session.set('sensormeteo_pluv1',sensormeteo_pluv1);

   
    var sensormeteo_ane=sensormeteodata.map(function(d){
        return d.ane;
    })
    Session.set('sensormeteo_ane',sensormeteo_ane);
  
});


/*Template.mainboard.helpers({

  
     sensorair_temp() {
    
    var air_temp=Session.get('sensorair_temp');
    //console.log(Session.get('sensorair_temp'));
    return air_temp;
  },
     sensor_humid() {
    
    var air_humid=Session.get('sensorair_humid');
    //console.log(Session.get('sensorair_humid'));
    return air_humid;
  },
     sensor_press_mmhg() {
    
    var air_press_mmhg=Session.get('sensorair_pressure_mmhg');
    //console.log(Session.get('sensorair_pressure'));
    return air_press_mmhg;
  },
   sensor_meteo_vane(){
    var meteo_vane=Session.get('sensormeteo_vane');
    //console.log(Session.get('sensorair_pressure'));
    return meteo_vane;
  },
  sensor_meteo_pluv1(){
   var meteo_pluv1=Session.get('sensormeteo_pluv1');
    //console.log(Session.get('sensorair_pressure'));
    return meteo_pluv1;
  },
  sensor_meteo_ane(){
  var meteo_ane=Session.get('sensormeteo_ane');
    console.log(Session.get('sensorair_pressure'));
    return meteo_ane;
  }
});




*/

