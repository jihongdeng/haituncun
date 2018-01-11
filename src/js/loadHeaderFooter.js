define(["jquery", "template","cookie" ], function($,template){
	$.ajax("/html/include/header.html").done(function(data){
		$(".header-container").html(data);
	}).done(function(){
		$.ajax({
			type : 'get',
			url : '/mock/header-menu.json',
			dataType : "json",
			success : function(data){
				// 准备在模板中渲染的数据对象
				var menutemp_data = {
					products : data.res_body.data
				};
				// 渲染
				var html = template("menu_template", menutemp_data);
				$(".header-menu").html(html);
				if(location.href =="http://localhost:8080/" 
					||location.href=="http://localhost:8080/index.html"){
					$(".header-menu").css({"display":"block"})
				}
			}
		});
	}).done(function(){
		var uname = $.cookie("username")
		if(uname){
			$(".login-link a").text("我的订单");
			$(".reg-link a").text("用户中心");
		}
			
		
	});



	$(".footer-container").load("/html/include/footer.html");
});