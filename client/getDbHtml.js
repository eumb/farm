/*import { Meteor } from 'meteor/meteor';
import { Modules } from 'meteor/modules';

let getHTML = () => {
  let data = _getTemplateData();
  return Blaze.toHTMLWithData( Template.profile, data );
};

let _getTemplateData = () => {
  return {
    sensors: _getDataFromCollection( SensorNames, {}, {} )
    
  };
};

let _getDataFromCollection = ( collection, query, filters ) => {
  let data = collection.find( query, filters );
  if ( data ) {
    return data;
  }
};

Modules.client.getProfileHTML = getHTML;*/