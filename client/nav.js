import { Template } from 'meteor/templating';


Template.nav.events({
    'click .logout': function(event){
        event.preventDefault();
        AccountsTemplates.logout();
        FlowRouter.go('startPage');
    }

 

});
Template.nav.helpers({
	userInfo: function () {
		//return Meteor.user().emails[0].address;
		//console.log(Meteor.user())
			//return Meteor.user().profile.name;
			return Meteor.user().username;
	}
	
});

Template.nav.onRendered(function(){
  
});

