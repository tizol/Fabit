
function isUrl(s) {
   var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
   return regexp.test(s);
}

Meteor.methods({
	
	"storeResource" : function (url)
	{

		console.log("trying to store " + url);
		if (!isUrl(url)) 
		{
			return;
		}
		var res = url;
		try
		{
			res = extractMeta(url);
		}
		catch(e) 
		{
			console.log("failed to extract meta data");
			if (!Resources.findOne({url : url}))
			{ 
				Resources.insert({ url : url});
				console.log("inserted ", url);
			}
			else console.log(res, " already inserted");	
		}

		//todo: make it user and goal specific
		if (!Resources.findOne({url : url}))
			{ 
				Resources.insert({ url : url, meta_data : res});
				console.log("inserted ", res);
			}
		else console.log(res, " already inserted");


	}
}

);