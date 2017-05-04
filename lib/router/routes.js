if (Meteor.isClient){
  
  Accounts.onLogin(function(){
  
    FlowRouter.go('mainboard');  
    
  });
  
  Accounts.onLogout(function(){
  
    FlowRouter.go('startPage');
    
  });
  
  /*   if(!Meteor.userId()){
      FlowRouter.go('startPage');
    }*/
}

FlowRouter.route('/dashboard', {
  name: "dashboard",
    action: function(params, queryParams) {
 
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "dashboard",
      nav: "nav",
      menu: "sidebar",
    });
  }
});

FlowRouter.route('/mainboard', {
  name: "mainboard",
    action: function(params, queryParams) {
 
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "mainboard",
      nav: "nav",
      menu: "sidebar",
    });
  }
});


FlowRouter.route('/administration', {
  name: "administration",
    action: function(params, queryParams) {
 
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "administration",
      nav: "nav",
      menu: "sidebar",
    });
  }
});

FlowRouter.route('/history', {
  name: "history",
    action: function(params, queryParams) {
 
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "history",
      nav: "nav",
      menu: "sidebar",
    });
  }
});



FlowRouter.route('/logedIn', {
  name: "logedIn",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
 	    footer: "footer",
      main: "mainboard",
      nav: "nav",
      menu: "sidebar",
    });
  }
});


FlowRouter.route('/', {
  name: "startPage",
    action: function(params, queryParams) {
    if(Meteor.userId()){
    	FlowRouter.go('logedIn');
    }
    BlazeLayout.render('startLayout', {
      footer: "footer",
      main: "logPage",
      nav: "nav",
    
    });
  }
});


FlowRouter.route('/sign-up', {
  name: "signUp",

  action: function(params, queryParams) {
    BlazeLayout.render('startLayout', {

      main: "signUpPage",
    
    });
  }


});

FlowRouter.route('/forgot-password', {
  name: "forgotPwd",

  action: function(params, queryParams) {
    BlazeLayout.render('startLayout', {

      main: "forgotPwd",
    
    });
  }


});

//Routes
//AccountsTemplates.configureRoute('changePwd');
//AccountsTemplates.configureRoute('forgotPwd');
//AccountsTemplates.configureRoute('resetPwd');
// AccountsTemplates.configureRoute('signIn');
// AccountsTemplates.configureRoute('signUp');
//AccountsTemplates.configureRoute('verifyEmail');