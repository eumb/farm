//used for registration



if (Meteor.isServer){
    Meteor.methods({
        "userExists": function(username){
            return !!Meteor.users.findOne({username: username});
        },
    });
}

var closeModal = function(error, state){
  
  if (!error) {
    if (state === "signIn") {
     $('#login_modal')
        .modal('hide');
        FlowRouter.go('/mainboard')
      ;
    }
    if (state === "signUp") {
      $('#register_modal')
        .modal('hide')
      ;
    }
  }else{
      $('#login_modal')
        .modal('show')
      ;
    }
  }



// Options
AccountsTemplates.configure({
  defaultLayout: 'startLayout',
  defaultLayoutRegions: {

  },
  defaultContentRegion: 'logPage',
  showForgotPasswordLink: false,
  overrideLoginErrors: false,
  confirmPassword: false,
  enablePasswordChange: true,
  forbidClientAccountCreation: false,
  showPlaceholders: false,

  // sendVerificationEmail: true,
  // enforceEmailVerification: true,
  //confirmPassword: true,
  //continuousValidation: false,
  //displayFormLabels: true,
  //forbidClientAccountCreation: true,
  //formValidationFeedback: true,
  //homeRoutePath: '/',
  //showAddRemoveServices: false,
  //showPlaceholders: true,

  negativeValidation: true,
  positiveValidation: true,
  negativeFeedback: true,
  positiveFeedback: true,

  // Privacy Policy and Terms of Use
  //privacyUrl: 'privacy',
  //termsUrl: 'terms-of-use',


  onSubmitHook: closeModal,
  hideSignInLink:true,
  hideSignUpLink:true,

texts: {
      title: {
        changePwd: "Password Title",
        enrollAccount: "Enroll Title",
        forgotPwd: "Recuperare parola",
        resetPwd: "Reset Pwd Title",
        signIn: "",
        signUp: "",
        verifyEmail: "Verify Email Title",
      },
      button: {
          changePwd: "Password Text",
          enrollAccount: "Enroll Text",
          forgotPwd: "Trimite",
          resetPwd: "Reset Pwd Text",
          signIn: "Intra",
          signUp: "Inregistrare",
        }
    }

});

AccountsTemplates.removeField('email');
AccountsTemplates.removeField('password');


AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "Nume utilizator",
      required: true,
      minLength: 5,

      func: function(value){
        if (Meteor.isClient) {
            console.log("Validating username...");
            var self = this;
            Meteor.call("userExists", value, function(err, userExists){
                if (!userExists)
                    self.setSuccess();
                else
                    self.setError(userExists);
                self.setValidating(false);
            });
            return;
        }
        // Server
        return Meteor.call("userExists", value);
    }

  },
    {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Adresa email nu este valida',
  },
  {
      _id: 'username_and_email',
      type: 'text',
      required: true,
      displayName: "Nume utilizator",
  },
  {
    _id: 'password',
    type: 'password',
    placeholder: {
        signUp: "Cel putin sase caractere"
    },
    required: true,
    minLength: 6,
    re: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
    errStr: 'Cel putin o litera majuscula, un caracter speciala',
    displayName: "Parola",
  },
  {
    _id: "language",
    type: "select",
    displayName: "Limba",
    select: [
        {
            text: "English",
            value: "en",
        },
          {
            text: "Romana",
            value: "ro",
        },
    ],
},

  

]);

