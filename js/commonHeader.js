$(function(){
	var w_height = $("#wrap-header").width()-108;
	$("#wrap-header").css("width",w_height+"px");
	//每个页面初始的i的left值
	var startLeft = $("#wrap-header ul i").css("left");
	
	$("#wrap-header li a").mouseover(function(){
		
		//三角形滑动需要移动的left值
		var aniLeft = $(this).offset().left+$(this).width()/2-27;
		$("#wrap-header ul i").stop().animate({"left":aniLeft+"px"},"slow");
		
	})
	
	$("#wrap-header li a").mouseout(function(){
		$("#wrap-header ul i").stop().animate({"left":startLeft},"slow");
	})
	
	$("#wrap-header #app-link a").mouseover(function(){
		$(this).append("<i></i>");
		$(this).find("i").addClass("supindex");
		$(this).find("i").css("left",($(this).parent().width()/2-7+"px"));
		$(this).parent().find(".headtip1").stop().fadeIn();
	})
	
	$("#wrap-header #app-link a").mouseout(function(){
		$(this).find("i").remove();
		$(this).parent().find(".headtip1").stop().fadeOut();
	})
	
	$("#wrap-header #app-link .headtip1").mouseover(function(){
		$(this).stop().fadeIn();
	})
	
	$("#wrap-header #app-link .headtip1").mouseout(function(){
		$(this).stop().fadeOut();
	})
	
	$("#wrap-header #shopcar").mouseover(function(){
		$(this).find(".headtip2").stop().fadeIn();
	})
	
	$("#wrap-header #shopcar").mouseout(function(){
		$(this).find(".headtip2").stop().fadeOut();
	})
	
	$("#wrap-header #shopcar .headtip2").mouseover(function(){
		$(this).stop().fadeIn();
	})
	
	$("#wrap-header #shopcar .headtip2").mouseout(function(){
		$(this).stop().fadeOut();
	})
});