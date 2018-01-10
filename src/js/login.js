require(["config"], function(){
	require(["jquery","cookie"], function(){
		var uname=$("#uname"),
			pwd = $("#pwd");
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
    	});
    	//密码相关
    	pwd.on("blur",ckpwd);
    	function ckpwd(){
   			if(pwd.val()){
				pwd.siblings(".input-del").css("display","block");
				pwd.siblings(".input-del").attr("src","/images/load/del.jpg");
				return true;
			}
			else{
				pwd.siblings(".input-del").css("display","none");
				pwd.siblings(".input-error").text("请设置密码");
				return false;
			};
   		};
   		//手机号检验
   		uname.on("blur",ckuname)
   		function ckuname(){
   			if($("#uname").val()){
   				$(this).siblings(".input-del").css("display","block");
				$(this).siblings(".input-del").attr("src","/images/load/del.jpg");
   				if(/^1[3|4|5|8]\d{9}$/.test($("#uname").val())){
					$("#uname").siblings(".input-error").css("display","none");
					$("#uname").siblings(".input-del").attr("src","/images/load/succeed.jpg"); 	
					return true;
				}else{
					$(this).siblings(".input-del").attr("src","/images/load/del.jpg");
					$(this).siblings(".input-error").css("display","block");
					$(this).siblings(".input-error").text("手机号码格式错误");
				}
			}else{
				$(this).siblings(".input-del").css("display","none");
				$(this).siblings(".input-error").text("请填写常用手机号");
				return false;
			}
   		};
   		//input清除功能
   		$(".login-form-container").on("click",".input-del",function(){
   			var parent = $(this).siblings("input").val("");
   		})

		$("#login-btn").on("click",function(e){
			e.preventDefault();
			var check=$("#pAgree").prop("checked");
			var user = uname.val();
	 		var pass = pwd.val();
			if(ckpwd()&&ckuname()){
				$.ajax({
			        url:"http://10.7.187.147/haituncun/login.php",
			        type:"post",
			        dataType:"json",
			        data:`uname=${user}&pwd=${pass}`,
			        success:function(data){
			        	if(!(data==="landing-error")){
			        		if($("#pAgree").prop("checked")){
			        			$.cookie("username",data.uname,{expires:7,path:"/"});
			        			$.cookie("cart",data.cart,{path:"/"});
			        			location="http://localhost:8080/index.html";
			        		}else{
			        			$.cookie("username",data.uname,{path:"/"});
			        		}
			        		
			        	}else{
			        		alert("账户或密码有错,请重新登陆")
			        	}
			        },
			        error:function(){
			        	alert("账户或密码有错,请重新登陆")
			        }
   				});
			}
		})

		
	});
});