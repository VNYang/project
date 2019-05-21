$(function(){
	$(window).scroll(function(){
		if ($(document).scrollTop() >= 800) {
			$("#backToTop").css("display","block");
		}else{
			$("#backToTop").css("display","none");
		}
	});
	
	//给回到顶部按钮添加点击事件
	$("#backToTop .BTTop").click(function(){
		$('html,body').stop().animate({scrollTop: 0+"px"}, 800);
	});
});



