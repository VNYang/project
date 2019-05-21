$(function(){
	
	
	//放大镜效果
	var heightS = $("#smallArea").height()/2;
	var widthS = $("#smallArea").width()/2;
	
	var xMin = $("#smallImg").offset().left + widthS;
	var xMax = $("#smallImg").offset().left + $("#smallImg").width() - widthS;
	var yMin = $("#smallImg").offset().top + heightS;
	var yMax = $("#smallImg").offset().top + $("#smallImg").height() - heightS;
	
	$("#smallImg").on({
		"mouseover":function(){
			var src = $("#smallImg").find("img").attr("src");
			$("#smallArea").show();
			$("#bigArea").find("img").attr("src",src);
			$("#bigArea").stop().animate({"height":"470px","width":"470px","left":"490px","top":"0px"});
		},
		"mouseout":function(){
			$("#smallArea").hide();
			$("#bigArea").stop().animate({"height":"0px","width":"0px","left":"470px","top":"470px"});
		},
		"mousemove":function(e){
			var x = e.pageX;
			var y = e.pageY;
			
			// 保证smallArea始终在smallImg的div内移动
			if (x <= xMin) {
				x = xMin;
			}
			if (x >= xMax) {
				x = xMax;
			}
			if (y <= yMin) {
				y = yMin;
			}
			if (y >= yMax) {
				y = yMax;
			}
			
			x = x - xMin;
			y = y - yMin;
			
			$("#smallArea").css({left:x,top:y});
			// 倍率 = bigImg/smallImg
			$("#bigImg").css({left:-x*2.35,top:-y*2.35});
		}
	});
	
	//底部列表li的mouseover事件
	$(".goodImgBox ul li").mouseover(function(){
		$(this).addClass("on").siblings().removeClass("on");
		var src = $(this).find("img").attr("src");
		$("#smallImg").find("img").attr("src",src);
	});
	
	//加减按钮的点击事件
	$(".minus").click(function(){
		var counts = parseInt($(this).parent().find("input").val());
		
		if (counts > 1) {
			counts--;
			$(this).parent().find("input").val(counts)
		}
	})
	
	$(".add").click(function(){
		var counts = parseInt($(this).parent().find("input").val());
		
		
			counts++;
			$(this).parent().find("input").val(counts)
		
	})
	
	//尺码选择的点击事件
	$(".s_prodes dd").eq(0).find("a").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		$(this).find("em").css("display","block").parent().siblings().find("em").css("display","none");
	})
	
	
	//加入购物车按钮的点击事件
	$("#addCartBtn").click(function(){
		var goodName = $("#goodsBasicInfoRegion").find("h3").html();
		var price = $("#salePriceRegion").html();
//		var chicun = $("#goodsRegion").find("dd").eq(0)
		$.cookie("good",userA,{expires:10});
	})
})