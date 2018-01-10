require(["config"], function(){
	require(["jquery"], function($){
		var uname=$("#uname"),
			pwd = $("#pwd"),
			pwd_s = $("#pwd_s"),
			verify = $("#verify-code"),
			check = true,
			btn = $("#register-btn"),
			notExist = false,
			flag = false;console
		//验证码API
		function generate (){
			$.ajax({
				url : "http://route.showapi.com/932-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7",
				type:"get",
				dataType:"json",
				success:function(data){
					var src = data.showapi_res_body.image;
					var sid = data.showapi_res_body.sid; 
					$(".verify-img").attr("src",src);
					$(".verify-img").data("sid",sid);
				}
			});
		};
		generate();
    	$(".verify-img").click(generate);
    	
    	//check-box的关联选择
    	$("#pAgree").change(function(){
    		if($("#pAgree").prop("checked"))
    			$("#check-icon").css("opacity","1");
			else
    			$("#check-icon").css("opacity","0");
	    });
    	$("#check-icon").click(function(){
    		if($("#pAgree").prop("checked")){
    			$("#pAgree").prop("checked", false);
    	 		$("#check-icon").css("opacity","0");
    		}else{
    			$("#pAgree").prop("checked", true);
    	 		$("#check-icon").css("opacity","1");
    		}
    	})
		//input清除功能
   		$(".register-form-container").on("click",".input-del",function(){
   			var parent = $(this).siblings("input").val("");
   		})
		//密码的验证
		pwd.on("blur",ckpwd);
   		function ckpwd(){
   			if(pwd.val()){
				pwd.siblings(".input-del").css("display","block");
				pwd.siblings(".input-del").attr("src","/images/load/del.jpg");
				if(/^\w{6,16}$/.test(pwd.val())){
					pwd.siblings(".input-error").css("display","none");
					pwd.siblings(".input-del").attr("src","/images/load/succeed.jpg");
					return true;
				}else{
					pwd.siblings(".input-error").css("display","block")
					.text("6-16个数字,字母或符号区分大小写");
				}
			}
			else{
				pwd.siblings(".input-del").css("display","none");
				pwd.siblings(".input-error").text("请设置密码");
			};
			return false;
   		};
   		

   		//密码确认验证
   		pwd_s.on("blur",ckpwd_s);
   		function ckpwd_s(){
   			if(pwd_s.val()){
				$(this).siblings(".input-del").css("display","block");
				$(this).siblings(".input-del").attr("src","/images/load/del.jpg");
				if(pwd_s.val()===pwd.val()){
					$(this).siblings(".input-error").css("display","none");
					$(this).siblings(".input-del").attr("src","/images/load/succeed.jpg");
					return true;
				}else{
					$(this).siblings(".input-error").css("display","block")
					.text("两次密码不一致");
				}
			}else{
				$(this).siblings(".input-del").css("display","none");
				$(this).siblings(".input-error").text("请设置密码");
			};
			return false;
   		};
   		

   		//图形验证码
   		verify.on("blur",ckverify)
   		function ckverify(){
   			var _input = verify.val();
	    	var _sid = $(".verify-img").data("sid");
	    	var url =  `http://route.showapi.com/932-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&checkcode=${_input}&sid=${_sid}`;
	    	if(_input){
	    		 $(this).siblings(".input-del").css("display","block");
	    		 $(this).siblings(".input-del").attr("src","/images/load/del.jpg");
	    		$.getJSON(url,function(data){
		    		if(!data.showapi_res_body.valid){
		    			flag = false;
		    			$("#verify-code").siblings(".input-error").css("display","block");
						$("#verify-code").siblings(".input-error").text("图形验证错误");
		    		}else{
		    		     flag = true;
		    		    $("#verify-code").siblings(".input-error").css("display","none");
		    		    $("#verify-code").siblings(".input-del").attr("src","/images/load/succeed.jpg");
		    		}
	    		})
	    	}else{
				$(this).siblings(".input-del").css("display","none");
				$(this).siblings(".input-error").text("请输入图形验证码");
	    	}
   		};
   		

		//用户名验证
		uname.on("blur",ckuname)
   		function ckuname(){
   			if($("#uname").val()){
   				$(this).siblings(".input-del").css("display","block");
				$(this).siblings(".input-del").attr("src","/images/load/del.jpg");
   				if(/^1[3|4|5|8]\d{9}$/.test($("#uname").val())){
					var user = uname.val();
					$.ajax({
						url:"http://10.7.187.147/haituncun/register.php",
				        type:"post",
				        data:`uname=${user}`,
				        success:function(data){
				        	notExist = data ==="not exist";
							if(data=="exist"){
								$("#uname").siblings(".input-error").css("display","block");
								$("#uname").siblings(".input-error").text("该用户名已经存在，请重新输入");
							}
							else if(data =="error"){
								$("#uname").siblings(".input-error").css("display","block");
								$("#uname").siblings(".input-error").text("发生未知错误,请重新输入");
							}
							else if(notExist){
								$("#uname").siblings(".input-error").css("display","none");
								$("#uname").siblings(".input-del").attr("src","/images/load/succeed.jpg");
					  		}
					  	},
					});
				}else{
					$(this).siblings(".input-del").attr("src","/images/load/del.jpg");
					$(this).siblings(".input-error").css("display","block");
					$(this).siblings(".input-error").text("手机号码格式错误");
				}
			}else{
				$(this).siblings(".input-del").css("display","none");
				$(this).siblings(".input-error").text("请填写常用手机号");
			}
   		};
   		
		//点击注册判断
		$("#register-btn").on("click",function(e){
			e.preventDefault();
			$("#uname").blur(); $("#verify-code").blur();
			var check=$("#pAgree").prop("checked");
			var user = uname.val();
	 		var pass = pwd.val();
			if(flag&&notExist&&ckpwd()&&ckpwd_s()&&check){
				$.ajax({
			        url:"http://10.7.187.147/haituncun/register.php",
			        type:"post",
			        dataType:"json",
			        data:`uname=${user}&pwd=${pass}`,
			        success:function(data){
			        	if(data){
			        		alert("注册成功，即将跳转登陆页面");
			        		location="http://localhost:8080/html/login.html";
			        	}else{
			        		alert("注册失败，请重新注册");
			        	}
			          
			        }
   				});
			}
		})

	});
});