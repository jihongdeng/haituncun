"use strict";require(["config"],function(){require(["load"],function(){define(["jquery","template","cookie"],function(e,t){e.ajax({type:"get",url:"/mock/list.json",dataType:"json",success:function(n){var o={products:n.res_body},i=t("menu_template",o);e(".main-container").html(i)}})})})});