import { Template } from 'meteor/templating';

import { Sensors } from '../imports/collections/sensors.js';


Template.dashboard.onCreated(function () {
    var self = this;
    
	
    self.autorun(function() {
        self.subscribe('sensorvalues',Session.get('senzor'));

    });

    $('#comment_modal').modal('hide');
  
    $('#comment_modal')
        .modal({
            selector: { 
              close: '.button'
            } 
        })   
});


Template.body.events({

  'submit .new_comment':function(event) {
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
    id=Session.get('comment_id').toHexString();
    //console.log(id);
 /*   var regex = /[^"\]]+(?=")/;
    var match = regex.exec(id);
    console.log(match);
    matchhex=match.toHexString();*/
    var newID = new Mongo.ObjectID(id);
    //console.log(newID);
    Sensors.update(newID,{$set:{'comment_soil_t':text}});
    
    // Clear form
    target.text.value = '';
    $('#comment_modal').modal('hide'); 
  },
/*    'click .at-btn':function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    console.log("closing modal");
    $('#comment_modal').modal('hide'); 
  },*/
});

//Use the filter below to filter out unwanted data from the list
/*.filter(function(d){
            if (d.w_1===null){
              return false; //skip
            }return true;

          }).map()
*/
Tracker.autorun(function()
{
   
	chartNode=Session.get('senzor');
  Session.set('chartFor',Session.get('senzor'));
  //console.log(Session.get('senzor'));
	var sensorhumiditydata=Sensors.find({'nodename':chartNode,'w_1':{$exists:true},'readingdatehour':{$in:[13]}},{limit:1}).fetch(); //mandatory ' ' not " "		//must have it like this for reactivity , 'readingdatehour':{$in:[6,18]}
    	//console.log(sensorhumiditydata);
    	var w1 = sensorhumiditydata.map(function(d){
      			var rsw1=(d.w_1*8.19-150390)/(1-d.w_1*0.021);
    			swt1=(rsw1-550)/137.5;
      			return Math.round(swt1); //return cb value
            //return d.w_1 // return frequency
      			//return Math.round(d.w_1);
     	});
    	Session.set('sensorw1',w1);
    
    
    //console.log(Sensors.find({},{sort: {'created_at' : -1},limit:2}));

     //var sensorhumiditydata=Sensors.find({nodename:Session.get('senzor')},{limit:1}).fetch(); //mandatory ' ' not " "
    	//console.log(sensorhumiditydata);
    	var w2 = sensorhumiditydata.map(function(d){
      			var rsw2=(d.w_2*8.19-150390)/(1-d.w_2*0.021);
    			swt2=(rsw2-550)/137.5;
      			return Math.round(swt2); //return cb value
            //return d.w_2 // return frequency
      			//return Math.round(d.w_2);
     	});
    Session.set('sensorw2',w2);
		var w3 = sensorhumiditydata.map(function(d){
	      			var rsw3=(d.w_3*8.19-150390)/(1-d.w_3*0.021);
	    			swt3=(rsw3-550)/137.5;
	      		return Math.round(swt3); //return cb value
            //return d.w_3 // return frequency
	      	  //return Math.round(d.w_3);
	     	});
	Session.set('sensorw3',w3);
	

  var sensortempdata=Sensors.find({'nodename':chartNode,'soil_t':{$exists:true}, 'readingdatehour':{$in:[8]}},{limit:1}).fetch(); //mandatory ' ' not " "   //must have it like this for reactivity , 'readingdatehour':{$in:[6,18]}
   

	var sensortemps=sensortempdata.map(function(d){
        return d.soil_t;
    })




    //console.log(sensortemps);
    Session.set('sensortempsoil_t',sensortemps);
    
    //Get comments

    var sensortempcomments=Sensors.find({'nodename':chartNode,'comment_soil_t':{$exists:true}, 'readingdatehour':{$in:[8]}}).fetch();;
	  var sensortempscomment=sensortempcomments.map(function(d){
        var info=[];
        info.push(d.comment_soil_t);
        info.push(d.created_at);
        return info;
    })

     

    //console.log(sensortempscomment);
    Session.set('sensortempcommentsoil_t',sensortempcomments);

////


  var sensorairdata=Sensors.find({'nodename':chartNode,'air_t':{$exists:true}},{limit:1}).fetch(); //mandatory ' ' not " "   //must have it like this for reactivity


   var sensorair_temp=sensorairdata.map(function(d){
        return d.air_t;
    })
    //console.log(sensortemps);
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




    var sensorair_pressure_kPa=sensorairdata.map(function(d){
        return Math.round(d.press);
    })

    Session.set('sensorair_pressure_kPa',sensorair_pressure_kPa);




    //var sensormeteodata=Sensors.find({'nodename':chartNode,'ane':{$exists:true}},{sort: {'created_at' : -1},limit:1}).fetch(); //mandatory ' ' not " "   //must have it like this for reactivity
    var sensormeteodata=Sensors.find({'nodename':chartNode,'ane':{$exists:true}},{limit:1}).fetch(); //mandatory ' ' not " "   //must have it like this for reactivity
    var sensormeteo_vane=sensormeteodata.map(function(d){
        return d.vane;
    })
    Session.set('sensormeteo_vane',sensormeteo_vane);

    var sensormeteo_pluv1=sensormeteodata.map(function(d){
        return d.pluv1;
    })
    Session.set('sensormeteo_pluv1',sensormeteo_pluv1);

    var sensormeteo_pluv2=sensormeteodata.map(function(d){
        return d.pluv2;
    })
    Session.set('sensormeteo_pluv2',sensormeteo_pluv2);

    var sensormeteo_pluv3=sensormeteodata.map(function(d){
        return d.pluv3;
    })
    Session.set('sensormeteo_pluv3',sensormeteo_pluv3);

    var sensormeteo_ane=sensormeteodata.map(function(d){
        return d.ane;
    })
    Session.set('sensormeteo_ane',sensormeteo_ane);
	
});


Template.dashboard.helpers({

	sensorw_1() {
    
    var w_1=Session.get('sensorw1');
   	//console.log(Session.get('sensorw1'));
    return w_1;

  },

   sensorw_2() {
    
    var w_2=Session.get('sensorw2');
    //console.log(Session.get('sensorw2'));
    return w_2;
  },
   sensorw_3() {
    
    var w_3=Session.get('sensorw3');
    //console.log(Session.get('sensorw3'));
    return w_3;
  },
    	
	sensortemp() {
    //console.log(Sensors.find({}).fetch());
    var temp=Session.get('sensortempsoil_t');
    //console.log(temp);

    return temp;
    //return Sensors.find({nodename:"Senzor_3"},{sort: {'created_at' : -1},limit:1}).fetch(); //mandatory ' ' not " "
    //console.log(Sensors.find({},{sort: {'created_at' : -1},limit:1}));
   },
    sensortempcommments() {
    //console.log(Sensors.find({}).fetch());
    var tempcomments=Session.get('sensortempcommentsoil_t');
    //console.log("tempcomments: "+ JSON.stringify(tempcomments));

    return tempcomments;
    //return Sensors.find({nodename:"Senzor_3"},{sort: {'created_at' : -1},limit:1}).fetch(); //mandatory ' ' not " "
    //console.log(Sensors.find({},{sort: {'created_at' : -1},limit:1}));
   },
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
    sensor_press_kPa() {
    
    var air_press_kPa=Session.get('sensorair_pressure_kPa');
    //console.log(Session.get('sensorair_pressure'));
    return air_press_kPa;
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
  sensor_meteo_pluv2(){
   var meteo_pluv2=Session.get('sensormeteo_pluv2');
    //console.log(Session.get('sensorair_pressure'));
    return meteo_pluv2;
  },
  sensor_meteo_pluv3(){
   var meteo_pluv3=Session.get('sensormeteo_pluv3');
    //console.log(Session.get('sensorair_pressure'));
    return meteo_pluv3;
  },
  sensor_meteo_ane(){
  var meteo_ane=Session.get('sensormeteo_ane');
    //console.log(Session.get('sensorair_pressure'));
    return meteo_ane;
  },

  
  
  "myChartDataHumid": function() {
   
				var chartNode=Session.get('senzor');
			    //console.log(chartNode);
			    dataset = Sensors.find({'nodename':chartNode ,'w_3':{$exists:true}, 'readingdatehour':{$in:[13]}}).fetch();
			    //dataset = Sensors.find({'nodename':chartNode },{sort: {'created_at' : -1},limit:28}).fetch() //, 'readingdatehour':{$in:[6,18]}
          //console.log("humidity chart dataset: "+dataset);
          var theDataw_1 = [];
			    var theDataw_2 = [];
			    var theDataw_3 = [];
			    var xScale=[];
			    
			    
			    var dataw_1 = dataset.map(function(d){
			      //console.log(d.w_1);
			      var rsw1=(d.w_1*8.19-150390)/(1-d.w_1*0.021);
			      var swt1=(rsw1-550)/137.5;
			      return Math.round(swt1); //return cb value
            //return Math.round(d.w_1) // return frequency
			    });
			
			    var dataw_2 = dataset.map(function(d){
			      
			      var rsw2=(d.w_2*8.19-150390)/(1-d.w_2*0.021);
			      var swt2=(rsw2-550)/137.5;
			      return Math.round(swt2); //return cb value
            //return Math.round(d.w_2) // return frequency
			    });
			
			    var dataw_3 = dataset.map(function(d){
			      
			      var rsw3=(d.w_3*8.19-150390)/(1-d.w_3*0.021);
			      var swt3=(rsw3-550)/137.5;
			      return Math.round(swt3); //return cb value
            //return Math.round(d.w_3) // return frequency
			    });
			    
			    //dataw_1=_.pluck(dataset, 'w_1');
			    //dataw_2=_.pluck(dataset, 'w_2');
			    //dataw_3=_.pluck(dataset, 'w_3');
			    scale=_.pluck(dataset, 'created_at');
			
			    theDataw_1=['10cm'].concat(dataw_1);
          //console.log("humidity chart dataset: "+theDataw_1);

			    theDataw_2=['30cm'].concat(dataw_2);
          //onsole.log("humidity chart dataset: "+theDataw_2);
			    theDataw_3=['50cm'].concat(dataw_3);
          //console.log("humidity chart dataset: "+theDataw_3);
			    xScale=['x'].concat(scale);   
          
    return {
  
      data: {
        x:'x',
        
        columns: [
          xScale,
          theDataw_1,
          theDataw_2,
          theDataw_3/*,
          ['data2', 10, 20, 45, 60,80]*/
          
        ],
        axes:{
          data2:'y2',


        },

           //type: 'spline',  
        
        color: {
          pattern: ['#1f77b4', '#aec7e8', '#ff7f0e']
        },
      },
      axis: {
        x: {
            type: 'timeseries',
            tick: {
                
                format: '%d-%m %H:%M',
                culling: {
                    max: 5 // the number of tick texts will be adjusted to less than this value
                },
              },

        },
        y2: {
          //max: 80,
          //min:0
        },
         y2: {
            show: false
        },
      },
      regions: [
          {axis: 'y', start:10,end: 20, class: 'regionYok'},
          {axis: 'y', start:20,end: 45, class: 'regionYalmostok'},
          {axis: 'y', start:45,end: 60, class: 'regionYnok'},
          {axis: 'y', start:60,end: 80, class: 'regionYbad'},
      ],
      size: {
        height: 480
      },
      
      grid: {
        y: {
            lines: [
            {value:0,class: 'threshold',text:"sol saturat",position: 'start'},
            {value:10,class: 'threshold',class: 'threshold',text:"aprovizionare optimă cu apă",position: 'start'},
            {value:20,class: 'threshold',text:"aprovizionare bună cu apă",position: 'start'},
            {value:45,class: 'threshold',text:"aprovizionare necorespunzătoare cu apă",position: 'start'},
            {value:60,class: 'threshold',text:"ofilire",position: 'start'}
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


  "myChartDataTemp": function() {
  	
    var chartNode=Session.get('senzor');
	   //console.log(chartNode);
   //dataset = Sensors.find({'nodename':chartNode ,'soil_t':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch(); //,'readingdatehour':{$in:[5,6,7,8,9,10,17]}
    dataset = Sensors.find({'nodename':chartNode ,'soil_t':{$exists:true}, 'readingdatehour':{$in:[8]}}).fetch();
  //console.log(dataset);
    
    var theDatasoil_t = [];
    var xScale=[];
    var theDatasoil_comment=[];
/*    var comment_soil_t=dataset.map(function(d){
        return d.comment_soil_t;
    })
 */

   datasoil_t=_.pluck(dataset, 'soil_t');
   //datasoil_comment=_.pluck(dataset, 'comment_soil_t');
   datasoil_comment=_.map(dataset, function(d){
          //console.log("d: "+ JSON.stringify(d));
          //console.log("comment: "+d.comment_soil_t);
          //console.log("typeof: "+typeof(d.comment_soil_t))
          if (typeof(d.comment_soil_t) == 'undefined') {    //must be in ''  not ""
              //console.log("no coment");
              return d.comment_soil_t = "no comment";
          }else return d.comment_soil_t;
        }); 
   scale=_.pluck(dataset, 'created_at');
   //console.log(datasoil_id);

    
   

    theDatasoil_t=['temp'].concat(datasoil_t);
    theDatasoil_comment=['comment'].concat(datasoil_comment);
    xScale=['x'].concat(scale);
    //console.log(theDatasoil_comment);
    return {
     
      data: {
        x:'x',
        
        columns: [
          xScale,
          theDatasoil_comment,
          theDatasoil_t
          //theDatasoil_id
       
        ],

         onclick: function (d, element) { 
          
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
          

         //type: 'spline',
         color: function (color, d) {
             datacomments=Sensors.find({'created_at':d.x}).fetch();
                var datacomment=datacomments.map(function(d){
                  return d.comment_soil_t;
                })
            if (datacomment != ""){
              return "#d00" }
              else return "#ddd";
            
            
        }
      },
        
    
      axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%d-%m %H:%M',
                culling: {
                    max: 5 // the number of tick texts will be adjusted to less than this value
                },
              },
        }
      },
      grid: {
        y: {
            lines: [
                {value: 0, class: 'threshold',text: 'Inghet',position: 'start'},
               
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

  "myChartDataAirTemp": function() {
    
   var chartNode=Session.get('senzor');
   //console.log(chartNode);
   //dataset = Sensors.find({'nodename':chartNode ,'air_t':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch();
   dataset = Sensors.find({'nodename':chartNode ,'air_t':{$exists:true}/*, 'readingdatehour':{$in:[8,17]}*/}).fetch();
  
    var theDataair_t = [];
    var xScale=[];
  


    dataair_t=_.pluck(dataset, 'air_t');
    scale=_.pluck(dataset, 'created_at');

    
    //console.log(dataw_1);

    theDataair_t=['temp'].concat(dataair_t);
    xScale=['x'].concat(scale);
    return {
     
      data: {
        x:'x',
        
        columns: [
          xScale,
          theDataair_t
        
          
        ],

         type: 'area-spline',
      },
      regions: [
         {axis: 'y', start:30, class: 'regionYbad'},
      ],
      axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%d-%m %H:%M',
                culling: {
                    max: 5 // the number of tick texts will be adjusted to less than this value
                },
              },
          }
      },
       grid: {
        y: {
            lines: [
                {value: 30, class: 'threshold',text: 'Temperatura critica',position: 'start'},
               
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

  "myChartDataAirPress": function() {
    
   var chartNode=Session.get('senzor');
   //console.log(chartNode);
    //dataset = Sensors.find({'nodename':chartNode ,'press':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch();
    dataset = Sensors.find({'nodename':chartNode ,'press':{$exists:true}}).fetch();
    
    var theDataair_pressmmhg   = [];
    var theDataair_press  = [];
    var xScale=[];
  
    //var press_mmhg=Math.round(dataset*760/101325);
    //console.log("press_mmhg: ", press_mmhg);

    dataair_pressmmhg=_.map(dataset, function(dataset){return Math.round(dataset.press*760/101325);});
    //console.log("air press mmhg: ",dataair_pressmmhg);
    dataair_press=_.map(dataset, function(dataset){return Math.round(dataset.press);});
    scale=_.pluck(dataset, 'created_at');
    
    
    //console.log(dataw_1);

    theDataair_pressmmhg=['press mmhg'].concat(dataair_pressmmhg);
    //theDataair_press=['press kPa'].concat(dataair_press);
    xScale=['x'].concat(scale);
    return {
     
      

      data: {
        x:'x',
        
        columns: [
          xScale,
          theDataair_pressmmhg
        
          
        ],

         type: 'spline',
      },
      axis: {
        x: {
            type: 'timeseries',
            tick: {
                
                format: '%d-%m %H:%M',
                culling: {
                    max: 5 // the number of tick texts will be adjusted to less than this value
                },
              },
            
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
  "myChartDataAirHumid": function() {
    
   var chartNode=Session.get('senzor');
   //console.log(chartNode);
   //dataset = Sensors.find({'nodename':chartNode ,'humid':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch();
   dataset = Sensors.find({'nodename':chartNode ,'humid':{$exists:true}}).fetch();
  
    var theDataair_humid  = [];
    var xScale=[];
  


    dataair_humid=_.pluck(dataset, 'humid');
    scale=_.pluck(dataset, 'created_at');

    
    //console.log(dataw_1);

    theDataair_humid=['humid'].concat(dataair_humid);
    xScale=['x'].concat(scale);
    return {
     
      data: {
        x:'x',
        
        columns: [
          xScale,
          theDataair_humid
        
          
        ],

         type: 'area-spline',
      },
      axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%d-%m %H:%M',
                culling: {
                    max: 5 // the number of tick texts will be adjusted to less than this value
                },
              },
        }
      },point: {
        show: false
      },
      

        zoom: {
        enabled: true,
        rescale: true
        }
    };
  }

});









