

function isUrl(s) {
   var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
   return regexp.test(s);
}


Template.milestone.events(
{
	"submit" : function(event)
	{
		event.preventDefault();
		var text = event.target.text.value;
		if (!isUrl(text)) 
		{
			alert("Make that an URL!");
			return;
		}

		//get meta information from URL
		Meteor.call("storeResource", text, function (err, result) { event.target.text.value = "";});
	
	}

});

Template.milestone.helpers(
{
	resources : function()
	{
		var res = Resources.find({}).fetch();
		for (var i = 0; i < res.length; ++i)
		{
			var t = res[i].meta_data.title;
			if ((typeof(t) == "undefined") || (t = ""))
			{
				res[i].meta_data.title = res[i].url;
				//console.log(res);
			}
		}
		return res;
	}


});