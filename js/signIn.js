$(function(){
	$.idcode.setCode(); //加载生成验证码方法
	
	
	//给选择栏添加点击事件
	
	$("#reg_policy").click(function(){
		if ($(this).hasClass("on")) {
			$(this).removeClass("on");
		}else{
			$(this).addClass("on");
		}
	});
	
	$("#isAutoSign").click(function(){
		if ($(this).hasClass("on")) {
			$(this).removeClass("on");
		}else{
			$(this).addClass("on");
		}
	});
	
	//给性别选择框添加点击事件
	$(".reg_checkbox").click(function(){
		if ($(this).hasClass("on")) {
			$(this).removeClass("on");
		} else{
			$(this).addClass("on").parent().siblings("span").find(".reg_checkbox").removeClass("on");
		}
	});
	//---------------------------验证--------------------------------
	//给个bool变量，当此bool值为true时验证成功
	var phoneFlag = false;
	var pwdFlag = false;
	var idcodeFlag = false;
	var smsFlag = false;
	var agreeFlag = false;
	
	var userAccount = false;
	var userPwd = false;
	
	$("input").focus(function(){
		$(this).parent().removeClass("reg_err").addClass("reg_focus");
	})
	
	//手机号不能为空，请输入常用的手机号
	//请输入有效的手机号
	$("#reg_mobile").blur(function(){
		$(this).parent().removeClass("reg_focus");
		var userPhone = $(this).val();
		if (!(/^1[34578]\d{9}$/.test(userPhone))) {
			$("#reg_mobile_msg").html("请输入有效的手机号").css("display","block");
			$(this).parent().addClass("reg_err");
			phoneFlag = false;
		}else{
			phoneFlag = true;
			$("#reg_mobile_msg").css("display","none");
			$(this).parent().removeClass("reg_err");
		}
	});
	
	//显示密码按钮的点击事件
	$("#showPwdBtn").click(function(){
		if ($(this).hasClass("on")) {
			$(this).removeClass("on");
			$("#reg_password").attr("type","password");
		}else{
			$(this).addClass("on");
			$("#reg_password").attr("type","text");
		}
	});
	
	$("#reg_password").focus(function(){
		clearInterval($(this).timer);
		//创建一个定时器监听密码强度
		$(this).timer = setInterval(function(){
			var pawVal = $("#reg_password").val(); 
			if (pawVal.length<=6) {
				$("#levelDiv").removeClass("password_m password_h").addClass("password_l");
			} else if (pawVal.length<=16){
				$("#levelDiv").removeClass("password_l password_h").addClass("password_m");
			}else{
				$("#levelDiv").removeClass("password_l password_m").addClass("password_h");
			}
		},100);
	})
	//密码框失去焦点事件
	$("#reg_password").blur(function(){
		clearInterval($(this).timer);
		$(this).parent().removeClass("reg_focus");
		if ($(this).val() != "" && !($("#levelDiv").hasClass("password_l"))) {
			$(this).parent().removeClass("reg_err");
			$("#reg_password_msg").css("display","none");
			pwdFlag = true;
		} else{
			$(this).parent().addClass("reg_err");
			$("#reg_password_msg").css("display","block");
			pwdFlag = false;
		}
	})
	
	//验证码框失去焦点
	$("#Txtidcode").blur(function(){
		$(this).parent().removeClass("reg_focus");
		var str = "";
		//获取生成的验证码
		$("#idcode").find("font").each(function(){
			str += $(this).html();
		});
		if ($(this).val() != str) {
			$(this).parent().addClass("reg_err");
			$("#reg_vcode_msg").css("display","block");
			idcodeFlag = false;
		} else{
			$(this).parent().removeClass("reg_err");
			$("#reg_vcode_msg").css("display","none");
			idcodeFlag = true;
		}
	})
	
	//获取验证码按钮的点击事件
	//生成随机短信验证码
	function smsCodeBuilder(){
		var str = "";
		for (var i=0;i<4;i++) {
			str += parseInt(Math.random()*10);
		}
		return str;
	}
	
	$("#reg_smscodeBtn").click(function(){
		if (phoneFlag && pwdFlag && idcodeFlag) {
			var smsCode = smsCodeBuilder();
			alert("收到的验证码为"+smsCode);
			$("#reg_smscode").attr("smsCode",smsCode);
		} else{
			alert("请检查前面的输入是否有误");
		}
	})
	
	//短信验证码的失去焦点事件
	$("#reg_smscode").blur(function(){
		$(this).parent().removeClass("reg_focus");
		if ($(this).val() != $(this).attr("smsCode")) {
			$(this).parent().addClass("reg_err");
			$("#reg_smscode_msg").css("display","block");
			smsFlag = false;
		} else{
			$(this).parent().removeClass("reg_err");
			$("#reg_smscode_msg").css("display","none");
			smsFlag = true;
		}
	})
	
	
	
	//注册按钮
	$("#mobileRegisterBtn").click(function(){
		//用户是否选择了同意按钮
		if ($("#reg_policy").hasClass("on")) {
			agreeFlag = true;
		} else{
			agreeFlag = false;
		}
		
		if (phoneFlag && pwdFlag && idcodeFlag && smsFlag && agreeFlag) {
			alert("注册成功！");
		} else{
			alert("请将信息填写完整!");
		}
	})
	
	//登录框账号的验证
	$("#loginEmailText").blur(function(){
		$(this).parent().removeClass("reg_focus");
		var eMailReg = new RegExp("^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$");
		var phoneReg = new RegExp("/^1[34578]\d{9}$/");
		
		var userInput = $(this).val();
		
		if (eMailReg.test(userInput) || phoneReg.test(userInput)) {
			$(this).parent().removeClass("reg_err");
			$("#loginEmailText_msg").css("display","none");
			userAccount = true;
		} else{
			$(this).parent().addClass("reg_err");
			$("#loginEmailText_msg").css("display","block");
			userAccount = false;
		}
	})
	
	//登录框密码的验证
	$("#loginPasswordText").blur(function(){
		$(this).parent().removeClass("reg_focus");
		
		if ($(this).val().length <= 6) {
			$(this).parent().addClass("reg_err");
			$("#hidepassword_msg").css("display","block");
			userPwd = false;
		} else{
			$(this).parent().removeClass("reg_err");
			$("#hidepassword_msg").css("display","none");
			userPwd = true;
		}
	})
	
	//登录按钮的点击事件
	$("#loginButton").click(function(){
		if (userAccount && userPwd) {
			var userA = $("#loginEmailText").val();
			var userP = $("#loginPasswordText").val();
			
			//判断记住我按钮是否选上
			if($("#isAutoSign").hasClass("on")){
				$.cookie("userAccount",userA,{expires:10});
				$.cookie("userPwd",userP,{expires:10});
			}
			
			alert("登录成功!");
		} else{
			alert("请输入正确账号或密码");
		}
		
		
	})
})