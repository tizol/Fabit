// make iron router aware of using this common template
// Router.configure({
//    layoutTemplate: 'layout'
//  });


Router.route('/', function () {
  this.render('home');
});

Router.route('/create', function () {
  this.render('create');
});

Router.route('/milestone_test', function()
	{ this.render('milestone');
});


Router.route('/schedule', function()
	{ this.render('schedule');
});
