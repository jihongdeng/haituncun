require.config({
	baseUrl : "/", 
	paths : {
		"jquery" : ["https://code.jquery.com/jquery-1.12.4.min", "lib/jquery/jquery-1.12.4.min"],
		"template" : "lib/arttemplate/template",
		"cookie" : "lib/jquery_plugins/jquery.cookie",
		"fly" : "lib/jquery_plugins/jquery.fly.min",
		"zoom" : "lib/jquery_plugins/jquery.elevateZoom-3.0.8.min",
		"load" : "js/loadHeaderFooter",
		"register" : "js/register",
		"login" : "js/login",
		"index" : "js/index",
		"list" : "js/list",
		"cart" : "js/cart",
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
		"cookie" : {
			deps : ["jquery"]
		}
	}
});