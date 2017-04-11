import { Meteor } from 'meteor/meteor';
import { Modules } from 'meteor/modules';
import { Sensors } from '../imports/collections/sensors.js';

Meteor.methods({
  exportAllSensors: function() {   
    var fields = [
      "Sensor name",
      "Humidity 10",
      "Humidity 30",
      "Humidity 50",
      "Soil temperature",
      "Date"
     
    ];
 
    var data = [];    
 
    var contacts = Sensors.find({'w_1':{$exists:true}},{sort: {'created_at' : -1}}).fetch();
    _.each(contacts, function(c) {
      data.push([
        c.nodename,
        c.w_1,
        c.w_2,
        c.w_3,
        c.soil_t,
        //c.created_at,
        moment.utc(c.created_at).format("DD/MM/YYYY")
      
      ]);
    });
 
    return {fields: fields, data: data};
  }
 
 
});

/*
let json2xml = Meteor.npmRequire( 'json2xml' ),
    jsZip    = Meteor.npmRequire( 'jszip' );

let exportData = ( options ) => {
  let archive = _initializeZipArchive();
  _compileZip( archive, options.profileHtml );
  return _generateZipArchive( archive );
};

let _addAssets = ( folder ) => {
  _addFileToZipArchive( folder, 'style.css', Assets.getText( 'export/style.css' ) );
  _addFileToZipArchive( folder, 'bootstrap.js', Assets.getText( 'export/bootstrap.js' ) );
};

let _compileZip = ( archive, profileHtml ) => {
  let assetsFolder = archive.folder( 'assets' );
  _addAssets( assetsFolder );
  _prepareDataForArchive( archive, Sensors, 'csv', 'friends.csv' );
  _prepareDataForArchive( archive, profileHtml, 'html', 'profile.html' );
};

let _prepareDataForArchive = ( archive, collection, type, fileName ) => {
  let data          = collection instanceof Mongo.Collection ? _getDataFromCollection( collection ) : collection,
      formattedData = _formatData[ type ]( data );
  _addFileToZipArchive( archive, fileName, formattedData );
};

let _getDataFromCollection = ( collection ) => {
  let data = collection.find( {} ).fetch();
  if ( data ) {
    return data;
  }
};

let _formatData = {
  csv( data )  { return Papa.unparse( data ); },

  html( data ) {
    let header = Assets.getText( 'export/header.html' ),
        footer = Assets.getText( 'export/footer.html' );
    return header + data + footer;
  }
};

let _initializeZipArchive = () => {
  return new jsZip();
};

let _addFileToZipArchive = ( archive, name, contents ) => {
  archive.file( name, contents );
};

let _generateZipArchive = ( archive ) => {
  return archive.generate( { type: 'base64' } );
};

Modules.server.exportData = exportData;*/


