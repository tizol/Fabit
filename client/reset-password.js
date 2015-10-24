// Do not forget to add the email package: $ meteor add email
// and to configure the SMTP: https://gist.github.com/LeCoupa/9879221

Template.ForgotPassword.events({
  'click form#forgot-form-submit button[type="submit"]' : function(e, t) {
    e.preventDefault();
    var emailInput = $('#forgotPasswordEmail'); //emailInput[0].value
    var forgotPasswordFormInput = emailInput[0].value;
    var email = $.trim(forgotPasswordFormInput).toLowerCase();
    Meteor.call('validateEmail', email);
    
    if(!Session.get('isEmailValid')){
      console.log("stop here");
      Session.set('invalidEmail', true);
      return;
    } else {
      console.log("proceed");
      Session.set('invalidEmail', false);
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
      Session.set('showForgetFormField', true);
      TweenLite.to(passwordForm, .5, {autoAlpha: 1});
    }
});

Meteor.methods({
  validateEmail: function(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return Session.set('isEmailValid', re.test(email));
  },
  
  isEmailValid: function(){
    return Session.get('isEmailValid');
  }
});

Template.ForgotPassword.helpers({
  showForgetFormField: function(){
    return Session.get('showForgetFormField');
  },

  invalidEmail: function(){
    return Session.get('invalidEmail');
  }

});


if (Accounts._resetPasswordToken) {
  Session.set('resetPassword', Accounts._resetPasswordToken);
}

Template.ResetPassword.helpers({
 resetPassword: function(){
  return Session.get('resetPassword');
 }
});

Template.ResetPassword.events({
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
});