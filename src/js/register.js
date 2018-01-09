<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<body>
		<h2>注册页面</h2>
		<input type="text" id="uname" placeholder="用户名"/><span id="unameS"></span><br/>
		<input type="text" id="pwd" placeholder="密码"/><span id="pwdS"></span><br/>
		<input type="text" id="cid" placeholder="身份证号"/><span id="cidS"></span><br/>
		<button id="btn">注册</button><br/>
		<script src="../js/tools.js"></script>
		<script>
			var uname=$("#uname"),
				pwd = $("#pwd"),
				pwd_s = $("#pwd_s"),
				verify = $("#verify-code"),
				check = $("#pAgree"),
				btn = $("#register-btn"),
				notExist = false;
				
			function ckuname(){
				return /^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(uname.val());
			}
			function ckpwd(){
   				return /^[0-9a-zA-Z!@#$%^&*()_+=-.,]{6,16}$/.test(pwd.val());
   			}
   			function ckpwd_s(){
   				return pwd.val()===pwd_s.val();
   			}
			function ckverify(){
   				return  
   			}
			pwd.blur=function(){
				if(pwd.val){
					$(".input-error").css("display","block")
					$(".input-error").html="请设置密码";
				}else{
					if(!ckpwd()){
						$(".input-error").css("display","block");
						$(".input-error").html="6-16个数字,字母或符号区分大小写";
					}else{
						$(".input-error").css("display","none");
					}
				}
			}
			cid.onblur=function(){
				if(!ckcid())
					$("#cidS").innerHTML="输入格式有误";
				else
					$("#cidS").innerHTML=""
			}
			uname.onblur=function(){
				if(!ckuname()){
					$("#unameS").innerHTML="输入格式有误!";
				}else{
					var xhr = new XMLHttpRequest();
					xhr.open("post","exercise.php",true);
					xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
					xhr.send("uname="+ uname.value);
					xhr.onreadystatechange=function(){
						if(xhr.readyState===4){
							if(xhr.status===200){
								var data = xhr.responseText;
								notExist = data ==="not exist";
								if(data=="exist"){
									$("#unameS").innerHTML="<font color='red'>该用户名已经存在，请重新输入<font>";}
								else if(data =="error"){
									$("#unameS").innerHTML="发生未知错误,请重新输入";}
								else if(notExist){
									$("#unameS").innerHTML="该用户名可用";
//										notExist=true
								}
							}
						}
					}
				}
			}
			
				btn.onclick=function(){
					uname.blur();
					if(notExist&&ckuname()&&ckpwd()&&ckcid()){
						console.log(0);
						var xhr = new XMLHttpRequest();
						xhr.open("post","exercise.php",true);
						xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
						xhr.send("uname="+uname.value+"&pwd="+pwd.value+"&cid="+cid.value);
						xhr.onreadystatechange=function(){
							if(xhr.readyState==4){
								if(xhr.status==200){console.log(0);
									var data = xhr.responseText;console.log(data);
									if(data){
										alert("注册成功！！");
										location.assign("landing.html");
									}
								}	
							}
						}
					}
				}
			
		</script>
	</body>
</html>
