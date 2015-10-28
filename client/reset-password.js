// Do not forget to add the email package: $ meteor add email
// and to configure the SMTP: https://gist.github.com/LeCoupa/9879221
var _template;

Template.ForgotPassword.onCreated(function () {
    
    this.state = new ReactiveDict();
    _template = this;

});


Template.ForgotPassword.events({
  'click form#forgot-form-submit button[type="submit"]' : function(e, t) {
    e.preventDefault();
    var emailInput = $('#forgotPasswordEmail'); //emailInput[0].value
    var forgotPasswordFormInput = emailInput[0].value;
    var email = $.trim(forgotPasswordFormInput).toLowerCase();
    Meteor.call('validateEmail', email, function(error, result){
      if(result){
        _template.state.set('isEmailValid', res);
      }
    });
    
    debugger;
    if(!Session.get('isEmailValid')){
      _template.state.set('invalidEmail', true);
      return;
    } else {  
      _template.state.set('invalidEmail', false);
      /*
      need to check to make sure there is an email
      in the DB that matches this email address,
      if so, send an email with an option to have 
      the user reset their password.

      */
      debugger;
    }

    
    //if (isNotEmpty(email) && isEmail(email)) {

      // Accounts.forgotPassword({email: email}, function(err) {
      //   if (err) {
      //     if (err.message === 'User not found [403]') {
      //       console.log('This email does not exist.');
      //     } else {
      //       console.log('We are sorry but something went wrong.');
      //     }
      //   } else {
      //     console.log('Email Sent. Check your mailbox.');
      //   }
      // });

    //}
    // return false;
  },

  'click #forgot': function () {
      var passwordForm = document.getElementById("forgotPassForm");
      TweenLite.set(passwordForm, {opacity: 0});
      _template.state.set('showForgetFormField', true);
      TweenLite.to(passwordForm, .5, {autoAlpha: 1});
    }
});

Meteor.methods({
  validateEmail: function(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  },
  
  isEmailValid: function(){
    return Template.instance().state.get('isEmailValid');

  }
});

Template.ForgotPassword.helpers({
  showForgetFormField: function(){
    return Template.instance().state.get('showForgetFormField');
  },

  invalidEmail: function(){
    return Template.instance().state.get('invalidEmail');
  }

});


/*
if (Accounts._resetPasswordToken) {
  Session.set('resetPassword', Accounts._resetPasswordToken);
}*/

/*Template.ResetPassword.helpers({
 resetPassword: function(){
  return Template.instance().state.get('resetPassword');
 }
});*/

/*Template.ResetPassword.events({
  'submit #resetPasswordForm': function(e, t) {
    e.preventDefault();
    
    var resetPasswordForm = $(e.currentTarget),
        password = resetPasswordForm.find('#resetPasswordPassword').val(),
        passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();

    if (isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
      Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
        if (err) {
          console.log('We are sorry but something went wrong.');
        } else {
          console.log('Your password has been changed. Welcome back!');
          Session.set('resetPassword', null);
        }
      });
    }
    return false;
  }
});*/