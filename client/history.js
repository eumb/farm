import { Template } from 'meteor/templating';
import {Modules} from 'meteor/modules';
import { Sensors } from '../imports/collections/sensors.js';
import { SensorNames} from '../imports/collections/sensors.js';
import { SensorTelemetry} from '../imports/collections/sensors.js';


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


MyAppExporter = {
  exportAllSensors: function() {
    var self = this;
    Meteor.call("exportAllSensors", function(error, data) {
 
      if ( error ) {
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
      a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
      a.download = "contacts.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  }
}

 
Template.history.events({
  "click #export": function() {
    MyAppExporter.exportAllSensors();
  }
});
 