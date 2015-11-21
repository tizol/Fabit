Goal = new Mongo.Collection('goals');

//subcsribe to allUsers so that we can have access if/when the data is needed
//Meteor.subscribe('allUsers');


if (Meteor.isClient) {

  // scheduler.init("scheduler_here", new Date());

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

// redirect http://stackoverflow.com/questions/22900405/how-to-redirect-after-user-has-just-logged-in-or-just-logged-out

}

if (Meteor.isServer) {
  
  // Meteor.publish("allUsers", function () {
  //   return Meteor.users.find({});
  // });
  // Meteor.publish("allUsers", function () {
  //   return Meteor.users.find( {}, fields: { 'emails.address': 1 });
  //   }
}


     







