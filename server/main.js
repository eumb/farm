import { Meteor } from 'meteor/meteor';
import { Sensors } from '../imports/collections/sensors.js';



Meteor.startup(() => {




});

if (Meteor.isServer) {

    // code to run on server at startup
/*  var p = DDP.connect('http://bucurila.go.ro:4000');
var result = p.status();
  console.log(result);
var callbackceres=p.call("test");*/
/*conn=DDP.connect('http://bucurila.go.ro:4000');
console.log(conn.status());
var result=conn.status();
  console.log(result);
  var newCollection = new Meteor.Collection('publish', conn);
  conn.subscribe('publish',function(){
    console.log("Remote data");
    newCollection.find().forEach(function(data){console.log(data)});
  });*/
}


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