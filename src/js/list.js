require(["config"], function(){
	require(["template", "load"], function(template){
			$.ajax({
				type : 'get',
				url : '/mock/list.json',
				dataType : "json",
				success : function(data){
					// 准备在模板中渲染的数据对象
					var main_menutemp = {
						products : data.res_body
					};
					// 渲染
					var html = template("main_template", main_menutemp);
					$(".main-container").html(html);
					
				}
			}).done(function(){
				$.cookie.json = true; 
				$(".list_context").on("mouseenter","li",function(){
					$(this).css("border-color","red");
					$(this).find(".list-price").stop().animate({top:196},200);
					$(this).find("h2").stop().animate({top:222},200);
					$(this).find(".btn-cart").stop().fadeIn(200);
				})
				$(".list_context").on("mouseleave","li",function(){
					$(this).css("border-color","#ffffff");
					$(this).find(".list-price").stop().animate({top:232},200);
					$(this).find("h2").stop().animate({top:260},200);
					$(this).find(".btn-cart").stop().fadeOut(200);
				});

				$(" .list_context").on("click",".btn-cart",function(){
					var parent = $(this).parent(".list-context");
					var prod = {
								amount : 1 ,
								id : parent.find(".li_id").text(),
								img: parent.find(".list-link img").attr("src"),
								price : parent.find(".b-max").text()+parent.find(".b-min1").text(),
								price0 : parent.find(".b-min").text(),
								title : parent.find("h2 span").first().text(),
								weight : parent.find("h2 span:nth-child(2)").text(),
								origin : parent.find(".list-footer span").first().text(),
								guoqi : parent.find("gupqi img").attr("src")
 					}
					var _products = $.cookie("cart") || [];
					var index = exist(prod.id, _products);
					if (index === -1) {
						_products.push(prod);
					} else {
						_products[index].amount++;
					}
					console.log(_products)
					$.cookie("cart", _products, {expires:7, path:"/"});

					function exist(id, products) {
						var idx = -1;
						$.each(products, function(index, elemenet){
							if (elemenet.id == id) {
								idx = index;
								return false;
							}
						});
						return idx;
					}
				})
				
			})
	})
});