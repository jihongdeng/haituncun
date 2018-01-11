require(["config"], function(){
	require(["template", "load"], function(template){
		console.log("0000")
		$.cookie.json = true;
		var _products = $.cookie("cart") || [];
		console.log(_products);
		if (_products.length === 0) {
			$(".cart_body").html(`购物车为空，请<a href="/html/list.html">选购商品</a>`);
			return;
		}
		var html = template("cart_template", {products: _products});
		$(".cart_body").html(html);

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
		/* 删除选购商品 */
		$(".cart_body").on("click", ".del", function(){
			if (confirm("确认删除？")){
				var _row = $(this).parents(".product");
				var _id = _row.children(".id").text();
				var index = exist(_id, _products);
				_products.splice(index, 1);
				$.cookie("cart", _products, {expires:7, path:"/"});
				_row.remove();	
				calcTotal();		
			}
		});

		/* 修改商品数量 */
		// +/-
		$(".cart_body").on("click", ".add,.minus", function(){
			var _row = $(this).parents(".product");
			var _id = _row.children(".id").text();
			var index = exist(_id, _products);
			var _prod = _products[index];

			if ($(this).is(".add")) { // 数量加			
				_prod.amount++;
			} else { // 数量减
				if (_prod.amount <= 1)
					return;
				_prod.amount--;
			}
			// 保存回 cookie 中
			$.cookie("cart", _products, {expires:7, path:"/"});
			_row.find(".amount_num").val(_prod.amount);
			_row.children(".sub").text(_prod.amount * _prod.price);
			calcTotal();
		});
		// 输入修改
		$(".cart_body").on("blur", ".amount_num", function(){
			var _row = $(this).parents(".product");
			var _id = _row.children(".id").text();
			var index = exist(_id, _products);
			var _prod = _products[index];

			// 判断输入格式是否正确
			if (!/^[1-9]\d*$/.test($(this).val())) { // 输入不合法，还原原有数量
				$(this).val(_prod.amount);
				return;
			}

			// 数量修改成功
			_prod.amount = $(this).val();
			$.cookie("cart", _products, {expires:7, path:"/"});
			_row.children(".sub").text(_prod.amount * _prod.price);
			calcTotal();
		});

		/* 全选 */
		$(".ck_all").click(function(){
			var status = $(this).prop("checked");
			$(".ck_product").prop("checked", status);
			calcTotal();
		});

		$(".ck_product").click(function(){
			var status = $(".ck_product:checked").length === _products.length
			$(".ck_all").prop("checked", status);
			// 计算合计
			calcTotal();
		});


		/* 计算合计 */
		function calcTotal() {
			var sum = 0;
			$(".ck_product:checked").each(function(index, element){
				sum += Number($(this).parents(".product").children(".sub").text())
			});
			$(".total .money").text(sum.toFixed(2));
		}


	})
});