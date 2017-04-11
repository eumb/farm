import { Meteor } from 'meteor/meteor';
import { Sensors } from '../imports/collections/sensors.js';


Meteor.startup(() => {
  // code to run on server at startup

});

/*
Meteor.methods({
  exportData( profileHtml ) {
    check( profileHtml, String );

    try {
      return module.server.exportData( { profileHtml: profileHtml } );
    } catch ( exception ) {
      return exception;
    }
  }
});
*/