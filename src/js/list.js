require(["config"], function(){
	require(["load"], function(){
		define(["jquery", "template","cookie" ], function($,template){
			$.ajax({
				type : 'get',
				url : '/mock/list.json',
				dataType : "json",
				success : function(data){
					// 准备在模板中渲染的数据对象
					var menutemp_data = {
						products : data.res_body
					};
					// 渲染
					var html = template("menu_template", menutemp_data);
					$(".main-container").html(html);
					
				}
			});
			



		});
	})
});