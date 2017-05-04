import { Template } from "meteor/templating";
import { Modules } from "meteor/modules";
import { Sensors } from "../imports/collections/sensors.js";
import { SensorNames } from "../imports/collections/sensors.js";
import { SensorTelemetry } from "../imports/collections/sensors.js";
import { DeviceDetails } from "../imports/collections/sensors.js";
var subscriptions = new SubsManager();

Template.history.onCreated(function() {
  var self = this;
  self.ready = new ReactiveVar();
  self.autorun(function() {
    Meteor.subscribe("devicedatas");
  });
});

/*
Template.history.onCreated( () => {
  Template.instance().subscribe( 'sensornames' );
});

Template.history.events({
  'click .export-data' ( event, template ) {
   /* $( event.target ).button( 'loading' );*/
/*
    let sensor        = SensorNames.find({}),
        name    = `${sensor.nodename}`,
        profileHtml = Modules.client.getProfileHTML();

    Meteor.call( 'exportData', profileHtml, ( error, response ) => {
      if ( error ) {
        Bert.alert( error.reason, 'warning' );
      } else {
        if ( response ) {
          // We'll handle the download here.
          let blob = Modules.client.convertBase64ToBlob( response );
          saveAs( blob, `${fileName}.zip` );
          $( event.target ).button( 'reset' );
        }
      }
    });
  }
});*/

var day = 0;
var firstDate = new Date();
firstDate.setDate(firstDate.getDate() - 500);

function generateChartData() {
  var chartData = [];

  dataset = Sensors.find({
    nodename: "Senzor_4",
    soil_t: { $exists: true }
  }).fetch();
  datasoil_t = _.pluck(dataset, "soil_t");
  xScale = _.pluck(dataset, "readingdate");

  for (i = datasoil_t.length; i >= 0; i--) {
    var newDate = new Date(firstDate);
    newDate.setDate(newDate.getDate() + i);
    //var visits = Math.round( Math.random() * 40 ) - 20;
    chartData.push({
      date: xScale[i],
      soil_t: datasoil_t[i]
    });
  }
  //console.log(chartData);
  return chartData;
}

/**
   * Function that generates random data
   */

MyAppExporter = {
  exportAllSensors: function() {
    var self = this;
    Meteor.call("exportAllSensors", function(error, data) {
      if (error) {
        alert(error);
        return false;
      }

      var csv = Papa.unparse(data);
      self._downloadCSV(csv);
    });
  },

  _downloadCSV: function(csv) {
    var blob = new Blob([csv]);
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
    a.download = "sensorsData.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

Template.history.events({
  "click #export": function() {
    MyAppExporter.exportAllSensors();
  }
});

// myTemplate.js
Template.history.helpers({
  devicedatas: function() {
    console.log(DeviceDetails.find().fetch());
    return DeviceDetails.find();
  },

  topGenresChart: function() {
    var chartData = [];
    dataset = Sensors.find({
      nodename: "Senzor_4",
      soil_t: { $exists: true }
    }).fetch();
   
  var day = 0;
  var firstDate = new Date();
  firstDate.setDate(firstDate.getDate() - 500);    

  for (i = datasoil_t.length; i >= 0; i--) {
    var newDate = new Date(firstDate);
    chartData.push(newDate);
  }

console.log(chartData);
    var theDatasoil_t = [];
    var xScale = [];



    datasoil_t = _.pluck(dataset, "soil_t");
    scale = _.pluck(dataset, "created_at");

    theDatasoil_t = ["temp"].concat(datasoil_t);
    xScale = ["x"].concat(chartData);
    //console.log(theDatasoil_t);
    //console.log(xScale);
    return {
     
       data: {
            rows: [xScale,theDatasoil_t]
          },
           yAxis: {
        title: {
            text: 'Share prices'
        }
    },
    plotOptions: {
        series: {
            marker: {
                enabled: false
            }
        }
    },
    title: {
        text: 'Royal Mail shares over time'
    },
    subtitle: {
        text: 'Auto-detection of <em>mm/dd/YYYY</em> dates in Highcharts Data module'
    }



    };
  }
});

Template.example1.onRendered(function() {
  var chart = AmCharts.makeChart("chartdiv", {
    type: "serial",
    theme: "light",
    pathToImages: "http://www.amcharts.com/lib/3/images/",

    marginRight: 80,

    graphs: [
      {
        id: "g1",
        bullet: "round",
        bulletBorderAlpha: 1,
        bulletColor: "#FFFFFF",
        bulletSize: 5,
        hideBulletsCount: 50,
        lineThickness: 2,
        title: "red line",
        useLineColorForBulletBorder: true,
        valueField: "soil_t"
      }
    ],
    chartScrollbar: {
      graph: "g1",
      scrollbarHeight: 30
    },
    chartCursor: {
      categoryBalloonDateFormat: "MMM DD JJ:NN",
      cursorPosition: "mouse",
      pan: true,
      valueLineEnabled: true,
      valueLineBalloonEnabled: true
    },
    allLabels: [
      {
        text: "Free label",
        bold: true,
        x: 5,
        y: 5
      }
    ],
    dataProvider: generateChartData(),

    categoryField: "date",
    categoryAxis: {
      minPeriod: "hh",
      parseDates: false
    },
    export: {
      enabled: true,
      libs: {
        path: "http://www.amcharts.com/lib/3/plugins/export/libs/"
      }
    }
  });
  chart.zoomToIndexes(
    chart.dataProvider.length - 40,
    chart.dataProvider.length - 1
  );

  // store the chart in the data context in case you need it later
  this.data.chart = chart;

  /*function setDataSet(dataset_url) {
 
    data = Sensors.find({
      nodename: chartNode,
      soil_t: { $exists: true },
      readingdatehour: { $in: [8] }
    }).fetch();
   //datasoil_t = _.pluck(dataset, "soil_t");
   //xScale =_.pluck(dataset, "updatedAt");
   //console.log(datasoil_t);
   //console.log(xScale);
  chart.dataProvider = AmCharts.parseJSON(data);
  console.log(chart.dataProvider);

   
    chart.validateData();
  
} 
/*setInterval( function() {
  // normally you would load new datapoints here,
  // but we will just generate some random values
  // and remove the value from the beginning so that
  // we get nice sliding graph feeling

  // remove datapoint from the beginning
  chart.dataProvider.shift();

  // add new one at the end
  day++;
  var newDate = new Date( firstDate );
  newDate.setDate( newDate.getDate() + day );
  var visits = Math.round( Math.random() * 40 ) - 20;
  chart.dataProvider.push( {
    date: newDate,
    visits: visits
  } );
  chart.validateData();
}, 1000 );*/
});
