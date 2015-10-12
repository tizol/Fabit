Goal = new Mongo.Collection('goals');


if (Meteor.isClient) {

  Template.register.events({
    'submit form': function(event) {
      event.preventDefault();
      var name = event.target.registerName.value;
      var email = event.target.registerEmail.value;
      var password = event.target.registerPassword.value;
      Accounts.createUser({
        name: name,
        email: email,
        password: password
      });
    }
  });


  Template.create.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
  });

  Forms.mixin(Template.create);

  Template.create.events({
    'documentSubmit': function (event, tmpl, doc) {
      // Note that documentSubmit will also pass the validated document
      // as a parameter. This instance of the document object is NOT reactive.
      Goal.insert(doc);
      console.log(doc);
    }
  });



  Template.home.helpers({
    goals: function () {
      return Goal.find({});
    }
  });



}
