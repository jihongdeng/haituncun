require.config({
	baseUrl : "/", 
	paths : {
		"jquery" : [ "lib/jquery/jquery-1.12.4.min","https://code.jquery.com/jquery-1.12.4.min"],
		"template" : "lib/arttemplate/template",
		"cookie" : "lib/jquery_plugins/jquery.cookie",
		"fly" : "lib/jquery_plugins/jquery.fly.min",
		"zoom" : "lib/jquery_plugins/jquery.elevateZoom-3.0.8.min",
		"load" : "js/loadHeaderFooter",
		"confirm" : "js/confirm",
		"detail" : "js/detail"
	},
	shim : {
		"fly" : {
			deps : ["jquery"]
		},
		"zoom" : {
			deps : ["jquery"]
		},
		"template" : {
			deps : ["jquery"]
		},
		"cookie" : {
			deps : ["jquery"]
		}
	}
});