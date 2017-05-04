import { Template } from "meteor/templating";

import { Sensors } from "../imports/collections/sensors.js";
TempValues = new Mongo.Collection("sensorvalue"); //subscription for cumulated soil temp

//var subscriptions = new SubsManager();

Template.body.events({
  "submit .new_comment": function(event) {
    // Prevent default browser form submit
    event.preventDefault();
    //console.log("inserting");
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
    //console.log("New comment " + text);

    // Insert a task into the collection
    //console.log(Session.get('comment_id'));
    /*id=Session.get('comment_id').toString();
    console.log(id);*/
    id = Session.get("comment_id").toHexString();
    //console.log(id);
    /*   var regex = /[^"\]]+(?=")/;
    var match = regex.exec(id);
    console.log(match);
    matchhex=match.toHexString();*/
    var newID = new Mongo.ObjectID(id);
    //console.log(newID);
    Sensors.update(newID, { $set: { comment_soil_t: text } });

    // Clear form
    target.text.value = "";
    $("#comment_modal").modal("hide");
  }
});
Template.dashboard.events({
  "click .toggle_soilTempData1": function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    Session.set("tempdisplay", "1hdata");
    $(".toggle_soilTempData24").removeClass('active');
    $(".toggle_soilTempData1").addClass('active');
  },
  "click .toggle_soilTempData24": function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    Session.set("tempdisplay", "24hdata");
    $(".toggle_soilTempData1").removeClass('active');
    $(".toggle_soilTempData24").addClass('active');
  },
  "click .toggle_humidData1": function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    Session.set("humiddisplay", "1hdata");
    $(".toggle_humidData24").removeClass('active');
    $(".toggle_humidData1").addClass('active');
  },
  "click .toggle_humidData24": function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    Session.set("humiddisplay", "24hdata");
    $(".toggle_humidData1").removeClass('active');
    $(".toggle_humidData24").addClass('active');
  },
  "click .toggle_precipData1": function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    Session.set("precipdisplay", "1hdata");
    $(".toggle_precipData24").removeClass('active');
    $(".toggle_precipData1").addClass('active');
  },
  "click .toggle_precipData24": function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    Session.set("precipdisplay", "24hdata");
    $(".toggle_precipData1").removeClass('active');
    $(".toggle_precipData24").addClass('active');
  },
  "click .toggle_airTempData1": function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    Session.set("airTempDisplay", "1hdata");
    $(".toggle_airTempData24").removeClass('active');
    $(".toggle_airTempData1").addClass('active');
  },
  "click .toggle_airTempData24": function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    Session.set("airTempDisplay", "24hdata");
    $(".toggle_airTempData1").removeClass('active');
    $(".toggle_airTempData24").addClass('active');
  },
  "click .toggle_airHumidData1": function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    Session.set("airHumidDisplay", "1hdata");
    $(".toggle_airHumidData24").removeClass('active');
    $(".toggle_airHumidData1").addClass('active');
  },
  "click .toggle_airHumidData24": function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    Session.set("airHumidDisplay", "24hdata");
    $(".toggle_airHumidData1").removeClass('active');
    $(".toggle_airHumidData24").addClass('active');
  },
  "click .toggle_airPressData1": function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    Session.set("airPressDisplay", "1hdata");
      $(".toggle_airPressData24").removeClass('active');
    $(".toggle_airPressData1").addClass('active');
  },
  "click .toggle_airPressData24": function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    Session.set("airPressDisplay", "24hdata");
      $(".toggle_airPressData1").removeClass('active');
    $(".toggle_airPressData24").addClass('active');
  }
});

Template.dashboard.onRendered(function(){
       
       $(".toggle_airTempData24").addClass('active');
       $(".toggle_airPressData24").addClass('active');
       $(".toggle_airHumidData24").addClass('active');
       $(".toggle_precipData24").addClass('active');
       $(".toggle_humidData24").addClass('active');
       $(".toggle_soilTempData24").addClass('active'); 
});

Template.dashboard.onCreated(function() {
  var self = this;

  //cache subscription

  //self.ready = new ReactiveVar();
  self.autorun(function() {
    //self.subscribe("sensorvalues", Session.get("senzor"));
    self.subscribe("sensorvalue", Session.get("senzor"));
    //console.log("soiltemp"+JSON.stringify(soiltemp));
    self.subscribe("sensorvalues", Session.get("senzor"));
    //self.ready.set(handle.ready());
});
    

  //classic meteor style subs

/*  self.autorun(function() {
    self.subscribe("sensorvalue", Session.get("senzor"));
    self.subscribe("sensorvalues", Session.get("senzor"));
  });*/

  $("#comment_modal").modal("hide");

  $("#comment_modal").modal({
    selector: {
      close: ".button"
    }
  });

 
  //Use the filter below to filter out unwanted data from the list
  /*.filter(function(d){
            if (d.w_1===null){
              return false; //skip
            }return true;

          }).map()
*/

  this.autorun(function() {
    //if realtime is required

    chartNode = Session.get("senzor");
    Session.set("chartFor", Session.get("senzor"));

    var sensormeteodata = Sensors.find(
      { nodename: chartNode, ane: { $exists: true } },
      { limit: 1 }
    ).fetch(); //mandatory ' ' not " "   //must have it like this for reactivity
    //console.log(sensormeteodata);
    console.log("returned ane data");

    
    //Get comments

    var sensortempcomments = Sensors.find({
      nodename: chartNode,
      comment_soil_t: { $exists: true }
    }).fetch();
    console.log("returned temp comments");

 /*   var sensorairdata = Sensors.find(
      { nodename: chartNode, air_t: { $exists: true } },
      { limit: 1 }
    ).fetch(); //mandatory ' ' not " "   //must have it like this for reactivity
    console.log("returned airdata");
*/
    /*var sensorhumiditydata = Sensors.find(
      {
        nodename: chartNode,
        w_1: { $exists: true }
      },
      { limit: 1 }
    ).fetch(); //mandatory ' ' not " "    //must have it like this for reactivity , 'readingdatehour':{$in:[6,18]}
    //console.log(sensorhumiditydata);
    console.log("returned humidity");*/

    //Mean temp cumulated

    //console.log(JSON.stringify(TempValues.find({nodename:chartNode})));



/*    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var currentDay = currentDate.getDate();

    dataSoilTempValuesMonth = _.pluck(soilTempValues, "month");
    //console.log(dataSoilTempValuesMonth);
    dataSoilTempValuesDay = _.pluck(soilTempValues, "day");
    //console.log(dataSoilTempValuesDay);
    dataSoilTempValues = _.pluck(soilTempValues, "temp");
    //console.log(dataSoilTempValues);
    dataSoilTempValuesDayHour = _.pluck(soilTempValues, "hour");
    //console.log(dataSoilTempValuesDayHour);

    var cumulated_mean_values = 0;
    var sprout_temp=0;
    
   
    for (var day = 15; day <= 30; day++) {
     
      var mean_temp = 0;
      var temp_total_day = 0;
      var counter = 0;
      for (i = 0; i <= dataSoilTempValuesDay.length; i++) {
        if (dataSoilTempValuesMonth[i] >= 4) {
          console.log("total temp month: "+dataSoilTempValuesMonth[i]);
          if (dataSoilTempValuesDay[i] >= day) {

            console.log("day: "+dataSoilTempValuesDay[i]);
            if (dataSoilTempValuesDayHour[i] >= 0) {
              console.log("recorded temp hour: "+ dataSoilTempValuesDayHour[i]);
              console.log("recorded temp: "+dataSoilTempValues[i]);
              temp_total_day = temp_total_day + dataSoilTempValues[i];
              counter++;
              //console.log("total temp/day: "+temp_total_day);
            }
            if (dataSoilTempValuesDayHour[i] === 23) {
              //console.log("total temp/day: "+temp_total_day);
              //console.log("counter: "+counter);
              mean_temp = temp_total_day / counter - 8;
              //console.log("mean temp day: "+mean_temp);
              break;
            }
          }

          

        }
      }
      //console.log("mean temp day: "+mean_temp);
      cumulated_mean_values = cumulated_mean_values + mean_temp;
      //console.log("cumulated_mean_values: "+cumulated_mean_values);
      sprout_temp = Math.round(cumulated_mean_values);
      Session.set("sprout_temp", sprout_temp);
 
    }
  */

  

    

    //console.log(Sensors.find({},{sort: {'created_at' : -1},limit:2}));

    //var sensorhumiditydata=Sensors.find({nodename:Session.get('senzor')},{limit:1}).fetch(); //mandatory ' ' not " "
    //console.log(sensorhumiditydata);

    

    var sensortempscomment = sensortempcomments.map(function(d) {
      var info = [];
      info.push(d.comment_soil_t);
      info.push(d.created_at);
      return info;
    });
    //console.log(sensortempscomment);
    Session.set("sensortempcommentsoil_t", sensortempcomments);
    ////

/*    var sensorair_temp = sensorairdata.map(function(d) {
      return d.air_t;
    });
    //console.log(sensortemps);
    Session.set("sensorair_temp", sensorair_temp);

    var sensorair_humid = sensorairdata.map(function(d) {
      return d.humid;
    });
    //console.log(sensortemps);
    Session.set("sensorair_humid", sensorair_humid);

    var sensorair_pressure_mmhg = sensorairdata.map(function(d) {
      //console.log(sensortemps);Formula exacta este 760 mm Hg = 101325 Pa = 1 atm. Adica P[mm Hg] = P[Pa] * 760 / 101325.
      var press_mmhg = d.press * 760 / 101325;
      return Math.round(press_mmhg);
    });
    Session.set("sensorair_pressure_mmhg", sensorair_pressure_mmhg);

    var sensorair_pressure_hPa = sensorairdata.map(function(d) {
      return Math.round(d.press / 100);
    });
    Session.set("sensorair_pressure_hPa", sensorair_pressure_hPa);

    
    var sensormeteo_pluv1 = sensormeteodata.map(function(d) {
      return d.pluv1;
    });
    Session.set("sensormeteo_pluv1", sensormeteo_pluv1);

    var sensormeteo_pluv2 = sensormeteodata.map(function(d) {
      return d.pluv2;
    });
    Session.set("sensormeteo_pluv2", sensormeteo_pluv2);

    var sensormeteo_pluv3 = sensormeteodata.map(function(d) {
      return d.pluv3;
    });
    Session.set("sensormeteo_pluv3", sensormeteo_pluv3);
*/

    var sensormeteo_vane = sensormeteodata.map(function(d) {
      return d.vane;
    });
    Session.set("sensormeteo_vane", sensormeteo_vane);

    var sensormeteo_ane = sensormeteodata.map(function(d) {
      return d.ane;
    });
    Session.set("sensormeteo_ane", sensormeteo_ane);

    var sensormeteo_ane_ms = sensormeteodata.map(function(d) {
      ms = d.ane * 0.27;
      ms_2dec = ms.toFixed(2);
      return ms_2dec;
    });
    Session.set("sensormeteo_ane_ms", sensormeteo_ane_ms);
  }); //end tracker function
});

Template.dashboard.helpers({
  //cached subscription
  subscriptionReady: function() {
    //https://kadira.io/academy/meteor-routing-guide/content/subscriptions-and-data-management/using-subs-manager
    return Template.instance().ready.get();
  },

  soilTempValues() {
    //return Session.get(soilTempMeanValue);
    
    var soilTempValues = TempValues.find({ nodename: chartNode }).fetch();
    console.log(soilTempValues);

    dataSoilTempValues = _.pluck(soilTempValues, "temp");
    var mean_temp = 0;
    var temp_total_day = 0;
    var cumulated_mean_values = 0;
    var sprout_temp=0;
    var i =0;
    while(i<=dataSoilTempValues.length){
      for(counter=1;counter<=24;counter++){
        console.log(dataSoilTempValues[i]);

   /*     if (typeof dataSoilTempValues[i] =="undefined"){//typeof d.comment_soil_t == "undefined")
         dataSoilTempValues[i]=0;
     }*/
        temp_total_day=temp_total_day+dataSoilTempValues[i];

        i++;
        console.log(`counter: ${counter}`);
       

      }
          console.log("day end");
          console.log(`temp total day: ${temp_total_day}`);
          if (isNaN(temp_total_day)){temp_total_day=0}
          mean_temp=temp_total_day/24 -8;

          console.log(`mean temp: ${mean_temp}`);
          //mean_temp=0;
          temp_total_day=0;
          //console.log("mean temp day: "+mean_temp);
      cumulated_mean_values = cumulated_mean_values + mean_temp;
      console.log("cumulated_mean_values: "+cumulated_mean_values);
      sprout_temp = Math.round(cumulated_mean_values);
      

      
    }
    

      
    return Math.round(sprout_temp+8);
  },

/*  sensorw_1() {
    return Session.get("sensorw1");
    //console.log(Session.get('sensorw1'));
  },

  sensorw_2() {
    return Session.get("sensorw2");
    //console.log(Session.get('sensorw2'));
  },
  sensorw_3() {
    return Session.get("sensorw3");
    //console.log(Session.get('sensorw3'));
  },

  sensortemp() {
    //console.log(Sensors.find({}).fetch());
    var temp = Session.get("sensortempsoil_t");
    //console.log(temp);

    return temp;
    //return Sensors.find({nodename:"Senzor_3"},{sort: {'created_at' : -1},limit:1}).fetch(); //mandatory ' ' not " "
    //console.log(Sensors.find({},{sort: {'created_at' : -1},limit:1}));
  },*/
  sensortempcommments() {
    //console.log(Sensors.find({}).fetch());
    var tempcomments = Session.get("sensortempcommentsoil_t");
    //console.log("tempcomments: "+ JSON.stringify(tempcomments));

    return tempcomments;
    //return Sensors.find({nodename:"Senzor_3"},{sort: {'created_at' : -1},limit:1}).fetch(); //mandatory ' ' not " "
    //console.log(Sensors.find({},{sort: {'created_at' : -1},limit:1}));
  },
/*  sensorair_temp() {
    var air_temp = Session.get("sensorair_temp");
    //console.log(Session.get('sensorair_temp'));
    return air_temp;
  },
  sensor_humid() {
    var air_humid = Session.get("sensorair_humid");
    //console.log(Session.get('sensorair_humid'));
    return air_humid;
  },
  sensor_press_mmhg() {
    var air_press_mmhg = Session.get("sensorair_pressure_mmhg");
    //console.log(Session.get('sensorair_pressure'));
    return air_press_mmhg;
  },
  sensor_press_hPa() {
    var air_press_hPa = Session.get("sensorair_pressure_hPa");
    //console.log(Session.get('sensorair_pressure'));
    return air_press_hPa;
  },
  sensor_meteo_pluv1() {
    var meteo_pluv1 = Session.get("sensormeteo_pluv1");
    //console.log(Session.get('sensorair_pressure'));
    return meteo_pluv1;
  },
  sensor_meteo_pluv2() {
    var meteo_pluv2 = Session.get("sensormeteo_pluv2");
    //console.log(Session.get('sensorair_pressure'));
    return meteo_pluv2;
  },
  sensor_meteo_pluv3() {
    var meteo_pluv3 = Session.get("sensormeteo_pluv3");
    //console.log(Session.get('sensorair_pressure'));
    return meteo_pluv3;
  },*/

  sensor_meteo_vane() {
    var meteo_vane = Session.get("sensormeteo_vane");
    //console.log(Session.get('sensorair_pressure'));
    return meteo_vane;
  },
  sensor_meteo_ane() {
    var meteo_ane = Session.get("sensormeteo_ane");
    //console.log(Session.get('sensorair_pressure'));
    return meteo_ane;
  },
  sensor_meteo_ane_ms() {
    var meteo_ane_ms = Session.get("sensormeteo_ane_ms");
    //console.log(Session.get('sensorair_pressure'));
    return meteo_ane_ms;
  },

  myChartDataHumid1h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    dataset = Sensors.find({
      nodename: chartNode,
      w_3: { $exists: true }
    }).fetch();
    console.log("returned humidity chart data");
    //dataset = Sensors.find({'nodename':chartNode },{sort: {'created_at' : -1},limit:28}).fetch() //, 'readingdatehour':{$in:[6,18]}
    //console.log("humidity chart dataset: "+dataset);
    var theDataw_1 = [];
    var theDataw_2 = [];
    var theDataw_3 = [];
    var xScale = [];




    var dataw_1 = dataset.map(function(d) {
      //console.log(d.w_1);
      var rsw1 = (d.w_1 * 8.19 - 150390) / (1 - d.w_1 * 0.021);
      var swt1 = (rsw1 - 550) / 137.5;
      return Math.round(swt1); //return cb value
      //return Math.round(d.w_1) // return frequency
    });
    //  console.log(dataw_1[0]);
    Session.set("sensorw1", dataw_1[0]);

    var dataw_2 = dataset.map(function(d) {
      var rsw2 = (d.w_2 * 8.19 - 150390) / (1 - d.w_2 * 0.021);
      var swt2 = (rsw2 - 550) / 137.5;
      return Math.round(swt2); //return cb value
      //return Math.round(d.w_2) // return frequency
    });
    Session.set("sensorw2", dataw_2[0]);

    var dataw_3 = dataset.map(function(d) {
      var rsw3 = (d.w_3 * 8.19 - 150390) / (1 - d.w_3 * 0.021);
      var swt3 = (rsw3 - 550) / 137.5;
      return Math.round(swt3); //return cb value
      //return Math.round(d.w_3) // return frequency
    });
    Session.set("sensorw3", dataw_3[0]);

    //dataw_1=_.pluck(dataset, 'w_1');
    //dataw_2=_.pluck(dataset, 'w_2');
    //dataw_3=_.pluck(dataset, 'w_3');
    scale = _.pluck(dataset, "created_at");

    theDataw_1 = ["10cm"].concat(dataw_1);
    //console.log("humidity chart dataset: "+theDataw_1);

    theDataw_2 = ["30cm"].concat(dataw_2);
    //onsole.log("humidity chart dataset: "+theDataw_2);
    theDataw_3 = ["50cm"].concat(dataw_3);
    //console.log("humidity chart dataset: "+theDataw_3);
    xScale = ["x"].concat(scale);

    return {
      data: {
        x: "x",

        columns: [
          xScale,
          theDataw_1,
          theDataw_2,
          theDataw_3 /*,
          ['data2', 10, 20, 45, 60,80]*/
        ],
        axes: {
          data2: "y2"
        },

        //type: 'spline',

        color: {
          pattern: ["#1f77b4", "#aec7e8", "#ff7f0e"]
        }
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%d-%m %H:%M",
            culling: {
              max: 5 // the number of tick texts will be adjusted to less than this value
            }
          }
        },
        y2: {
          //max: 80,
          //min:0
        },
        y2: {
          show: false
        }
      },
      regions: [
        { axis: "y", start: 10, end: 20, class: "regionYok" },
        { axis: "y", start: 20, end: 45, class: "regionYalmostok" },
        { axis: "y", start: 45, end: 60, class: "regionYnok" },
        { axis: "y", start: 60, end: 80, class: "regionYbad" }
      ],
      size: {
        height: 480
      },

      grid: {
        y: {
          lines: [
            {
              value: 0,
              class: "threshold",
              text: "sol saturat",
              position: "start"
            },
            {
              value: 10,
              class: "threshold",
              class: "threshold",
              text: "aprovizionare optimă cu apă",
              position: "start"
            },
            {
              value: 20,
              class: "threshold",
              text: "aprovizionare bună cu apă",
              position: "start"
            },
            {
              value: 45,
              class: "threshold",
              text: "aprovizionare necorespunzătoare cu apă",
              position: "start"
            },
            {
              value: 60,
              class: "threshold",
              text: "ofilire",
              position: "start"
            }
          ]
        }
      },
      point: {
        show: false
      },
      subchart: {
        show: true
      },
      zoom: {
        enabled: true,
        rescale: true
      }
    };
  },

  myChartDataHumid24h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    dataset = Sensors.find({
      nodename: chartNode,
      w_3: { $exists: true },
      readingdatehour: { $in: [13] }
    }).fetch();

    console.log("returned humidity chart data 24");

    //dataset = Sensors.find({'nodename':chartNode },{sort: {'created_at' : -1},limit:28}).fetch() //, 'readingdatehour':{$in:[6,18]}
    //console.log("humidity chart dataset: "+dataset);
    var theDataw_1 = [];
    var theDataw_2 = [];
    var theDataw_3 = [];
    var xScale = [];

    var dataw_1 = dataset.map(function(d) {
      //console.log(d.w_1);
      var rsw1 = (d.w_1 * 8.19 - 150390) / (1 - d.w_1 * 0.021);
      var swt1 = (rsw1 - 550) / 137.5;
      return Math.round(swt1); //return cb value
      //return Math.round(d.w_1) // return frequency
    });
    Session.set("sensorw1", dataw_1[0]);

    var dataw_2 = dataset.map(function(d) {
      var rsw2 = (d.w_2 * 8.19 - 150390) / (1 - d.w_2 * 0.021);
      var swt2 = (rsw2 - 550) / 137.5;
      return Math.round(swt2); //return cb value
      //return Math.round(d.w_2) // return frequency
    });
    Session.set("sensorw2", dataw_2[0]);

    var dataw_3 = dataset.map(function(d) {
      var rsw3 = (d.w_3 * 8.19 - 150390) / (1 - d.w_3 * 0.021);
      var swt3 = (rsw3 - 550) / 137.5;
      return Math.round(swt3); //return cb value
      //return Math.round(d.w_3) // return frequency
    });
    Session.set("sensorw3", dataw_3[0]);

    //dataw_1=_.pluck(dataset, 'w_1');
    //dataw_2=_.pluck(dataset, 'w_2');
    //dataw_3=_.pluck(dataset, 'w_3');
    scale = _.pluck(dataset, "created_at");

    theDataw_1 = ["10cm"].concat(dataw_1);
    //console.log("humidity chart dataset: "+theDataw_1);

    theDataw_2 = ["30cm"].concat(dataw_2);
    //onsole.log("humidity chart dataset: "+theDataw_2);
    theDataw_3 = ["50cm"].concat(dataw_3);
    //console.log("humidity chart dataset: "+theDataw_3);
    xScale = ["x"].concat(scale);

    return {
      data: {
        x: "x",

        columns: [
          xScale,
          theDataw_1,
          theDataw_2,
          theDataw_3 /*,
          ['data2', 10, 20, 45, 60,80]*/
        ],
        axes: {
          data2: "y2"
        },

        //type: 'spline',

        color: {
          pattern: ["#1f77b4", "#aec7e8", "#ff7f0e"]
        }
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%d-%m %H:%M",
            culling: {
              max: 5 // the number of tick texts will be adjusted to less than this value
            }
          }
        },
        y2: {
          //max: 80,
          //min:0
        },
        y2: {
          show: false
        }
      },
      regions: [
        { axis: "y", start: 10, end: 20, class: "regionYok" },
        { axis: "y", start: 20, end: 45, class: "regionYalmostok" },
        { axis: "y", start: 45, end: 60, class: "regionYnok" },
        { axis: "y", start: 60, end: 80, class: "regionYbad" }
      ],
      size: {
        height: 480
      },

      grid: {
        y: {
          lines: [
            {
              value: 0,
              class: "threshold",
              text: "sol saturat",
              position: "start"
            },
            {
              value: 10,
              class: "threshold",
              class: "threshold",
              text: "aprovizionare optimă cu apă",
              position: "start"
            },
            {
              value: 20,
              class: "threshold",
              text: "aprovizionare bună cu apă",
              position: "start"
            },
            {
              value: 45,
              class: "threshold",
              text: "aprovizionare necorespunzătoare cu apă",
              position: "start"
            },
            {
              value: 60,
              class: "threshold",
              text: "ofilire",
              position: "start"
            }
          ]
        }
      },
      point: {
        show: false
      },
      subchart: {
        show: true
      },
      zoom: {
        enabled: true,
        rescale: true
      }
    };
  },
  myChartDataTemp24h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    //dataset = Sensors.find({'nodename':chartNode ,'soil_t':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch(); //,'readingdatehour':{$in:[5,6,7,8,9,10,17]}
    dataset = Sensors.find({
      nodename: chartNode,
      soil_t: { $exists: true },
      readingdatehour: { $in: [8] }
    }).fetch();
    console.log("returned soil temp chart data 24");

    let sensortempdata = Sensors.find(
      {
        nodename: chartNode,
        soil_t: { $exists: true },
      readingdatehour: { $in: [8] }
      },
      { limit: 1 }
    ).fetch(); //mandatory ' ' not " "   //must have it like this for reactivity , 'readingdatehour':{$in:[6,18]}
    console.log("returned soil_temp");
    let sensortemps = sensortempdata.map(function(d) {
      return d.soil_t;
    });
    //console.log(sensortemps);
    Session.set("sensortempsoil_t", sensortemps);

    //console.log(JSON.stringify(dataset));

    var theDatasoil_t = [];
    var xScale = [];
    var theDatasoil_comment = [];

    datasoil_t = _.pluck(dataset, "soil_t");
    //datasoil_comment=_.pluck(dataset, 'comment_soil_t');
    datasoil_comment = _.map(dataset, function(d) {
      //console.log("d: "+ JSON.stringify(d));
      //console.log("comment: "+d.comment_soil_t);
      //console.log("typeof: "+typeof(d.comment_soil_t))
      if (typeof d.comment_soil_t == "undefined") {
        //must be in ''  not ""
        //console.log("no coment");
        return (d.comment_soil_t = "no comment");
      } else return d.comment_soil_t;
    });
    scale = _.pluck(dataset, "created_at");
    //console.log(datasoil_id);

    theDatasoil_t = ["temp"].concat(datasoil_t);
    theDatasoil_comment = ["comment"].concat(datasoil_comment);
    xScale = ["x"].concat(scale);
    //console.log(theDatasoil_comment);
    return {
      data: {
        x: "x",

        columns: [
          xScale,
          theDatasoil_comment,
          theDatasoil_t
          //theDatasoil_id
        ],

        onclick: function(d, element) {
          //console.log("element " + element);
          //console.log("d "  + JSON.stringify(d));
          //console.log("Valoarea " + d.value);
          //console.log(d._id);
          //console.log(Sensors.find({'created_at':d.x}).fetch());
          data = Sensors.find({ created_at: d.x }).fetch();
          var dataid = data.map(function(d) {
            return d._id;
          });

          Session.set("comment_id", dataid[0]);
          $("#comment_modal").modal("show");
        },

        //type: 'spline',
        color: function(color, d) {
          datacomments = Sensors.find({ created_at: d.x }).fetch();
          var datacomment = datacomments.map(function(d) {
            return d.comment_soil_t;
          });
          if (datacomment != "") {
            return "#d00";
          } else return "#2C7EB8";
        }
      },

      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%d-%m %H:%M",
            culling: {
              max: 5 // the number of tick texts will be adjusted to less than this value
            }
          }
        }
      },
      grid: {
        y: {
          lines: [
            { value: 0, class: "threshold", text: "Inghet", position: "start" }
          ]
        }
      },
      point: {
        show: true,
        enabled: true,
        focus: {
          expand: {
            r: 10
          }
        }
      },

      zoom: {
        enabled: true,
        rescale: true
      }
    };
  },

  myChartDataTemp1h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    //dataset = Sensors.find({'nodename':chartNode ,'soil_t':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch(); //,'readingdatehour':{$in:[5,6,7,8,9,10,17]}
    dataset = Sensors.find({
      nodename: chartNode,
      soil_t: { $exists: true }
    }).fetch();
    console.log("returned soil 1h chart data ");
    //console.log(dataset);

     let sensortempdata = Sensors.find(
      {
        nodename: chartNode,
        soil_t: { $exists: true }
      },
      { limit: 1 }
    ).fetch(); //mandatory ' ' not " "   //must have it like this for reactivity , 'readingdatehour':{$in:[6,18]}
    console.log("returned soil_temp");
    let sensortemps = sensortempdata.map(function(d) {
      return d.soil_t;
    });
    //console.log(sensortemps);
    Session.set("sensortempsoil_t", sensortemps);


    var theDatasoil_t = [];
    var xScale = [];


    datasoil_t = _.pluck(dataset, "soil_t");
    //datasoil_comment=_.pluck(dataset, 'comment_soil_t');
    /* datasoil_comment=_.map(dataset, function(d){
          //console.log("d: "+ JSON.stringify(d));
          //console.log("comment: "+d.comment_soil_t);
          //console.log("typeof: "+typeof(d.comment_soil_t))
          if (typeof(d.comment_soil_t) == 'undefined') {    //must be in ''  not ""
              //console.log("no coment");
              return d.comment_soil_t = "no comment";
          }else return d.comment_soil_t;
        }); */
    scale = _.pluck(dataset, "created_at");
    //console.log(datasoil_id);

    theDatasoil_t = ["temp"].concat(datasoil_t);
    /* theDatasoil_comment=['comment'].concat(datasoil_comment);*/
    xScale = ["x"].concat(scale);
    //console.log(theDatasoil_comment);
    return {
      data: {
        x: "x",

        columns: [
          xScale,
          /* theDatasoil_comment,*/
          theDatasoil_t
          //theDatasoil_id
        ],

        /*       onclick: function (d, element) { 
          
          //console.log("element " + element);
          //console.log("d "  + JSON.stringify(d));
          //console.log("Valoarea " + d.value);
          //console.log(d._id); 
          //console.log(Sensors.find({'created_at':d.x}).fetch());
          data=Sensors.find({'created_at':d.x}).fetch();
          var dataid=data.map(function(d){
            return d._id;
          })


          Session.set('comment_id',dataid[0]);
           $('#comment_modal').modal('show');
        },

        */

        type: "area-spline"
        /*        color: function (color, d) {
             datacomments=Sensors.find({'created_at':d.x}).fetch();
                var datacomment=datacomments.map(function(d){
                  return d.comment_soil_t;
                })
            if (datacomment != ""){
              return "#d00" }
              else return "#2C7EB8";
            
            
        }*/
      },

      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%d-%m %H:%M",
            culling: {
              max: 5 // the number of tick texts will be adjusted to less than this value
            }
          }
        }
      },
      grid: {
        y: {
          lines: [
            { value: 0, class: "threshold", text: "Inghet", position: "start" }
          ]
        }
      },
      point: {
        show: false,
        enabled: false
      },

      zoom: {
        enabled: true,
        rescale: true
      }
    };
  },

  myChartDataAirTemp24h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    //dataset = Sensors.find({'nodename':chartNode ,'air_t':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch();
    dataset = Sensors.find({
      nodename: chartNode,
      air_t: { $exists: true } /*, 'readingdatehour':{$in:[8,17]}*/,
      readingdatehour: { $in: [13] }
    }).fetch();
    console.log("returned air 24h chart data");
    var theDataair_t = [];
    var xScale = [];

    dataair_t = _.pluck(dataset, "air_t");
    scale = _.pluck(dataset, "created_at");
    Session.set("sensorair_temp", dataair_t[0]);
    //console.log(dataw_1);

    theDataair_t = ["temp"].concat(dataair_t);
    xScale = ["x"].concat(scale);
    return {
      data: {
        x: "x",

        columns: [xScale, theDataair_t],

        type: "area-spline"
      },
      regions: [{ axis: "y", start: 30, class: "regionYbad" }],
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%d-%m %H:%M",
            culling: {
              max: 5 // the number of tick texts will be adjusted to less than this value
            }
          }
        },
        y: {
          max: 40
          //min:0
        }
      },
      grid: {
        y: {
          lines: [
            {
              value: 30,
              class: "threshold",
              text: "Zona temperaturilor critice pentru plante",
              position: "start"
            }
          ]
        }
      },
      point: {
        show: false
      },

      zoom: {
        enabled: true,
        rescale: false
      }
    };
  },
  myChartDataAirTemp1h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    //dataset = Sensors.find({'nodename':chartNode ,'air_t':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch();
    dataset = Sensors.find({
      nodename: chartNode,
      air_t: { $exists: true }
    }).fetch();
    console.log("returned air 1h chart data");
    var theDataair_t = [];
    var xScale = [];

    dataair_t = _.pluck(dataset, "air_t");
    scale = _.pluck(dataset, "created_at");
    Session.set("sensorair_temp", dataair_t[0]);
    //console.log(dataw_1);

    theDataair_t = ["temp"].concat(dataair_t);
    xScale = ["x"].concat(scale);
    return {
      data: {
        x: "x",

        columns: [xScale, theDataair_t],

        type: "area-spline"
      },
      regions: [{ axis: "y", start: 30, class: "regionYbad" }],
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%d-%m %H:%M",
            culling: {
              max: 5 // the number of tick texts will be adjusted to less than this value
            }
          }
        },
        y: {
          max: 40
          //min:0
        }
      },
      grid: {
        y: {
          lines: [
            {
              value: 30,
              class: "threshold",
              text: "Zona temperaturilor critice pentru plante",
              position: "start"
            }
          ]
        }
      },
      point: {
        show: false
      },

      zoom: {
        enabled: true,
        rescale: false
      }
    };
  },

  myChartDataAirPress24h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    //dataset = Sensors.find({'nodename':chartNode ,'press':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch();
    dataset = Sensors.find({
      nodename: chartNode,
      press: { $exists: true },
      readingdatehour: { $in: [13] }
    }).fetch();
    console.log("returned pressure 24h chart data");
    var theDataair_pressmmhg = [];
    var theDataair_press = [];
    var xScale = [];

    //var press_mmhg=Math.round(dataset*760/101325);
    //console.log("press_mmhg: ", press_mmhg);

    dataair_pressmmhg = _.map(dataset, function(dataset) {
      return Math.round(dataset.press * 760 / 101325);
    });
    //console.log("air press mmhg: ",dataair_pressmmhg);
    dataair_press = _.map(dataset, function(dataset) {
      return Math.round(dataset.press);
    });
    scale = _.pluck(dataset, "created_at");


    Session.set("sensorair_pressure_mmhg", dataair_pressmmhg[0]);

  
    Session.set("sensorair_pressure_hPa", dataair_press[0]);


    //console.log(dataw_1);

    theDataair_pressmmhg = ["press mmhg"].concat(dataair_pressmmhg);
    //theDataair_press=['press hPa'].concat(dataair_press);
    xScale = ["x"].concat(scale);
    return {
      data: {
        x: "x",

        columns: [xScale, theDataair_pressmmhg],

        type: "spline"
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%d-%m %H:%M",
            culling: {
              max: 5 // the number of tick texts will be adjusted to less than this value
            }
          }
        }
      },
      point: {
        show: false
      },
      zoom: {
        enabled: true,
        rescale: true
      }
    };
  },
  myChartDataAirPress1h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    //dataset = Sensors.find({'nodename':chartNode ,'press':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch();
    dataset = Sensors.find({
      nodename: chartNode,
      press: { $exists: true }
    }).fetch();
    console.log("returned pressure 24h chart data");
    var theDataair_pressmmhg = [];
    var theDataair_press = [];
    var xScale = [];

    //var press_mmhg=Math.round(dataset*760/101325);
    //console.log("press_mmhg: ", press_mmhg);

    dataair_pressmmhg = _.map(dataset, function(dataset) {
      return Math.round(dataset.press * 760 / 101325);
    });
    //console.log("air press mmhg: ",dataair_pressmmhg);
    dataair_press = _.map(dataset, function(dataset) {
      return Math.round(dataset.press);
    });
    scale = _.pluck(dataset, "created_at");
    Session.set("sensorair_pressure_mmhg", dataair_pressmmhg[0]);

  
    Session.set("sensorair_pressure_hPa", dataair_press[0]);
    //console.log(dataw_1);

    theDataair_pressmmhg = ["press mmhg"].concat(dataair_pressmmhg);
    //theDataair_press=['press hPa'].concat(dataair_press);
    xScale = ["x"].concat(scale);
    return {
      data: {
        x: "x",

        columns: [xScale, theDataair_pressmmhg],

        type: "spline"
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%d-%m %H:%M",
            culling: {
              max: 5 // the number of tick texts will be adjusted to less than this value
            }
          }
        }
      },
      point: {
        show: false
      },
      zoom: {
        enabled: true,
        rescale: true
      }
    };
  },

  myChartDataRain24h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    //dataset = Sensors.find({'nodename':chartNode ,'press':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch();
    dataset = Sensors.find({
      nodename: chartNode,
      pluv3: { $exists: true },
      readingdatehour: { $in: [13] }
    }).fetch();
    console.log("returned rain chart data");
    var theDataRain_pluv3 = [];

    var xScale = [];

    //var press_mmhg=Math.round(dataset*760/101325);
    //console.log("press_mmhg: ", press_mmhg);

    dataRain_pluv3 = _.map(dataset, function(dataset) {
      return dataset.pluv3;
    });
    //console.log("air press mmhg: ",dataair_pressmmhg);
    Session.set("sensormeteo_pluv3", dataRain_pluv3[0]);
    scale = _.pluck(dataset, "created_at");

    //console.log(dataw_1);

    theDataRain_pluv3 = ["precip mm"].concat(dataRain_pluv3);
    //theDataair_press=['press hPa'].concat(dataair_press);
    xScale = ["x"].concat(scale);
    return {
      data: {
        x: "x",

        columns: [xScale, theDataRain_pluv3],

        type: "bar"
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%d-%m %H:%M",
            culling: {
              max: 5 // the number of tick texts will be adjusted to less than this value
            }
          }
        }
      },
      point: {
        show: false
      },
      zoom: {
        enabled: true,
        rescale: true
      }
    };
  },

  myChartDataRain1h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    //dataset = Sensors.find({'nodename':chartNode ,'press':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch();
    dataset = Sensors.find({
      nodename: chartNode,
      pluv2: { $exists: true }
    }).fetch();
    console.log("returned rain chart data 1");
    var theDataRain_pluv2 = [];

    var xScale = [];

    //var press_mmhg=Math.round(dataset*760/101325);
    //console.log("press_mmhg: ", press_mmhg);

    dataRain_pluv2 = _.map(dataset, function(dataset) {
      return dataset.pluv2;
    });
    //console.log("air press mmhg: ",dataair_pressmmhg);
 
    scale = _.pluck(dataset, "created_at");

    //console.log(dataw_1);

    theDataRain_pluv2 = ["precip mm"].concat(dataRain_pluv2);
    //theDataair_press=['press hPa'].concat(dataair_press);
    xScale = ["x"].concat(scale);
    return {
      data: {
        x: "x",

        columns: [xScale, theDataRain_pluv2],

        type: "bar"
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%d-%m %H:%M",
            culling: {
              max: 5 // the number of tick texts will be adjusted to less than this value
            }
          }
        }
      },
      point: {
        show: false
      },
      zoom: {
        enabled: true,
        rescale: true
      }
    };
  },

  myChartDataAirHumid24h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    //dataset = Sensors.find({'nodename':chartNode ,'humid':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch();
    dataset = Sensors.find({
      nodename: chartNode,
      humid: { $exists: true },
      readingdatehour: { $in: [13] }
    }).fetch();
    console.log("returned air humidity 24h chart data ");
    var theDataair_humid = [];
    var xScale = [];

    dataair_humid = _.pluck(dataset, "humid");
    scale = _.pluck(dataset, "created_at");
    Session.set("sensorair_humid", dataair_humid[0]);
    //console.log(dataw_1);

    theDataair_humid = ["humid"].concat(dataair_humid);
    xScale = ["x"].concat(scale);
    return {
      data: {
        x: "x",

        columns: [xScale, theDataair_humid],

        type: "area-spline"
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%d-%m %H:%M",
            culling: {
              max: 5 // the number of tick texts will be adjusted to less than this value
            }
          }
        }
      },
      point: {
        show: false
      },

      zoom: {
        enabled: true,
        rescale: true
      }
    };
  },
  myChartDataAirHumid1h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    //dataset = Sensors.find({'nodename':chartNode ,'humid':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch();
    dataset = Sensors.find({
      nodename: chartNode,
      humid: { $exists: true }
    }).fetch();
    console.log("returned air humidity 1h chart data ");
    var theDataair_humid = [];
    var xScale = [];

    dataair_humid = _.pluck(dataset, "humid");
    scale = _.pluck(dataset, "created_at");
    Session.set("sensorair_humid", dataair_humid[0]);
    //console.log(dataw_1);

    theDataair_humid = ["humid"].concat(dataair_humid);
    xScale = ["x"].concat(scale);
    return {
      data: {
        x: "x",

        columns: [xScale, theDataair_humid],

        type: "area-spline"
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%d-%m %H:%M",
            culling: {
              max: 5 // the number of tick texts will be adjusted to less than this value
            }
          }
        }
      },
      point: {
        show: false
      },

      zoom: {
        enabled: true,
        rescale: true
      }
    };
  }
});
