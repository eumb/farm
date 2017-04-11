import { Template } from 'meteor/templating';

T9n.setLanguage('ro');

const userLanguage = () => {
  // If the user is logged in, retrieve their saved language
  if (Meteor.user()) return Meteor.user().profile.language;
};


/*if (Meteor.isClient) {
  Meteor.startup(() => {
    Tracker.autorun(() => {
      let lang;

      // URL Language takes priority
      const urlLang = FlowRouter.getQueryParam('lang');
      if (urlLang) {
        lang = urlLang;
      } else if (userLanguage()) {
        // User language is set if no url lang
        lang = userLanguage();
      } else {
        // If no user language, try setting by browser (default en)
        const localeFromBrowser = window.navigator.userLanguage || window.navigator.language;
        let locale = 'ro';

        if (localeFromBrowser.match(/en/)) locale = 'en';
        if (localeFromBrowser.match(/ro/)) locale = 'ro';
 
        lang = locale;
      }
      console.log(lang);
      TAPi18n.setLanguage(lang);
    });
  });
}*/

Template.logPage.helpers({


  languages() {
    const obj = TAPi18n.getLanguages();
    const languages = [];
    for (const key in obj) {
      if (key) languages.push({ code: key, labels: obj[key] });
    }
    if (languages) return languages;
  },

  currentLanguage() {
    const currentLanguageCode = TAPi18n.getLanguage();
    const appLanguages = TAPi18n.getLanguages();
    for (const code in appLanguages) {
      if (code === currentLanguageCode) return appLanguages[code].name;
    }
  }

})


Template.logPage.onRendered(function(){
$('#login_modal')
  .modal('hide')
;    
$('#register_menu')
  .modal('hide')
;    

$('.ui.dropdown')
  .dropdown({
  	 transition: 'drop'
  })
;


$('#login_modal')
        .modal({
        selector: { 
      		close: '.at-btn'
    	} 
        })
        

});



Template.logPage.events({
    'click .login_menu': function(event){
        event.preventDefault();
        $('#login_modal').modal('show');   
    },
     'click .register_menu': function(event){
        event.preventDefault();
       $('#register_modal').modal('show');   
    },
    'click .at-btn':function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    console.log("closing modal");
   	$('#login_modal').modal('hide'); 
  },

      'click .mainboard':function(){
      $(".senzor_menu_items").hide();
    },
     'click [data-action="change-language"]'(e) {
    const lang = $(e.target).data('language');
    TAPi18n.setLanguage(lang);
    console.log("lang selected: ",lang);
    
/*    mo.setLocale(lang);
    moment.locale(lang);*/
  }
 

});