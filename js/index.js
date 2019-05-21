$(function(){
	
	//菜单栏mouseover事件下下滑，mouseout事件下上拉动画
	$("#wrap-search .selctsearch").mouseover(function(){
		var selShowHeight = $("#selectshow").find("ul").height();
		$("#selectshow").stop().animate({"height":selShowHeight+"px"},"slow");
	})
	
	$("#wrap-search .selctsearch").mouseout(function(){
		$("#selectshow").stop().animate({"height":0+"px"},"slow");
	})
	
	$("#selectshow").mouseover(function(){
		var selShowHeight = $(this).find("ul").height();
		$(this).stop().animate({"height":selShowHeight+"px"},"slow");
	})
	
	$("#selectshow").mouseout(function(){
		$(this).stop().animate({"height":0+"px"},"slow");
	})
	
	//搜索栏菜单点击事件下，其上面的文字变化
	$("#selectshow li").click(function(){
		$("#selctsearchbox").html($(this).html());
	})
	
	//搜索框搜索按钮hover事件下的css样式变化
	$("#wrap-search .search_btn").hover(
		function(){
			$(this).css("background","rgb(30,125,215)");
			$(this).find("i").css("background-position","-134px -45px");
		},
		function(){
			$(this).css("background","#fff");
			$(this).find("i").css("background-position","-115px -45px");
		}
	);
	
	//轮播图前后按钮的hover样式改变
	$("#wrap_banner .banner em").hover(
		function(){
			$(this).css("opacity","1");
			$(this).find("i").css("opacity","1");
		},
		function(){
			$(this).css("opacity","0.8");
			$(this).find("i").css("opacity","0.6");
		}
	);
	
	//banner轮播图前后按钮切换
	var indexOfA = 0;
	
	$("#wrap_banner .banner .pre_btn").click(function(){
		$("#wrap_banner .banner a").each(function(num){
			if ($(this).attr("class") == "showing") {
				indexOfA = num;
			}
		})
		$("#wrap_banner .banner a").eq(indexOfA).removeClass("showing").stop().fadeTo("slow",0);
		$("#wrap_banner .banner li").eq(indexOfA).removeClass("active");
		if (indexOfA == 0) {
			$("#wrap_banner .banner a").last().addClass("showing").stop().fadeTo("slow",1);
			$("#wrap_banner .banner li").last().addClass("active");
		} else{
			$("#wrap_banner .banner a").eq(indexOfA-1).addClass("showing").stop().fadeTo("slow",1);
			$("#wrap_banner .banner li").eq(indexOfA-1).addClass("active");
		}
	})
	
	$("#wrap_banner .banner .next_btn").click(function(){
		$("#wrap_banner .banner a").each(function(num){
			if ($(this).attr("class") == "showing") {
				indexOfA = num;
			}
		})
		$("#wrap_banner .banner a").eq(indexOfA).removeClass("showing").stop().fadeTo("slow",0);
		$("#wrap_banner .banner li").eq(indexOfA).removeClass("active");
		if (indexOfA == 4) {
			$("#wrap_banner .banner a").first().addClass("showing").stop().fadeTo("slow",1);
			$("#wrap_banner .banner li").first().addClass("active");
		} else{
			$("#wrap_banner .banner a").eq(indexOfA+1).addClass("showing").stop().fadeTo("slow",1);
			$("#wrap_banner .banner li").eq(indexOfA+1).addClass("active");
		}
	})
	
	//banner轮播图底部按钮切换
	$("#wrap_banner .banner ul li").each(function(i){
		$(this).click(function(){
			$("#wrap_banner .banner a").eq(i).addClass("showing").stop().fadeTo(400,1).siblings("a").removeClass("showing").stop().fadeTo(400,0);
			$(this).addClass("active").siblings("li").removeClass("active");
		})
	})
	
	//banner自动轮播
	autoPlay();
	
	function autoPlay(){
		var ind = 0;
		var timer = setTimeout(function(){
			$("#wrap_banner .banner a").each(function(num){
				if ($(this).attr("class") == "showing") {
					ind = num;
				}
			})
			$("#wrap_banner .banner a").eq(ind).removeClass("showing").stop().fadeTo("slow",0);
			$("#wrap_banner .banner li").eq(ind).removeClass("active");
			if (ind == 4) {
				$("#wrap_banner .banner a").first().addClass("showing").stop().fadeTo("slow",1);
				$("#wrap_banner .banner li").first().addClass("active");
			} else{
				$("#wrap_banner .banner a").eq(ind+1).addClass("showing").stop().fadeTo("slow",1);
				$("#wrap_banner .banner li").eq(ind+1).addClass("active");
			}
			autoPlay();
		},5000)
	}
	
	// ajax请求json数据
	$.get("JSON/hotspot.json",function(data){
		data = JSON.parse(data);
		$.each(data, function(index,value) {
			// 获取解析数据当中每一个字段对应的值
			var img = value["img"];
			var title = value["title"];
			var describe = value["describe"];
			
			// 动态修改li节点里面的内容
			if ((index+1)%4 == 0) {
				$("#wrap_hotspot .newsbox ul li").eq(index).css("margin-right","0px");
			}
			$("#wrap_hotspot .newsbox ul li").eq(index).find(".image").append("<img src="+img+"/>");
			$("#wrap_hotspot .newsbox ul li").eq(index).find(".image").attr("title",title+" "+describe);
			if (value["type"]!="normal") {
				$("#wrap_hotspot .newsbox ul li").eq(index).find(".image").append("<em class="+value["type"]+"></em>");
				//当鼠标移入时修改加了em的li的em的透明度；
				$("#wrap_hotspot .newsbox ul li").eq(index).hover(
					function(){
						$(this).find("em").css("opacity",".6");
					},
					function(){
						$(this).find("em").css("opacity","1");
					}
				);
			}
			if (value["tag"]=="exclusive") {
				$("#wrap_hotspot .newsbox ul li").eq(index).find(".image").append("<i class='tag'>独家</i>");
			}
			$("#wrap_hotspot .newsbox ul li").eq(index).find(".title").append("<a href='#'>"+title+"</a>");
			$("#wrap_hotspot .newsbox ul li").eq(index).find(".describe").append("<a href='#'>"+describe+"</a>");
		});
	})
	
	//购票导航栏的鼠标移入特效
	$("#wrap_ticket .ticket .ticketnav span").each(function(num){
		$(this).mouseover(function(){
			$(this).addClass("cur").siblings().removeClass("cur");
			$(this).parent().nextAll("div").eq(num).css("display","block");
			if (num==0) {
				$(this).parent().nextAll("div").eq(num+1).css("display","none");
			}else{
				$(this).parent().nextAll("div").eq(num-1).css("display","none");
			}
		})
	})
	
	// ajax请求json数据
	$.get("JSON/film_on.json",function(data){
		data = JSON.parse(data);
		//遍历json文件
		$.each(data, function(index,value) {
			var img = value["img"];
			var title = value["title"];
			var f_date = value["date"];
			var type = value["type"];
			var f_length = value["length"];
			var detial = value["detial"];
			var price = value["price"];
			var score = value["score"];
			
			//字符串模板
			var str =  `<li class='smallfilm'>
							<a class='filmimgbox' href='#'>
								<img src=${img} />
								<em></em>
								<i>${score}</i>
							</a>
							<h3 class='common_ti'>${title}</h3>
							<p class='ticket_btn'>
								<a href='#'>选座购票</a>
							</p>
							<div class='infobox_over';>
								<div class='smalltypebox'>
									<p>${f_date}</p>
									<p>${type}</p>
									<p>${f_length}</p>
								</div>
								<p class='smallcom'><i></i>${detial}</p>
								<p class='smallprice' ><b><strong>${price}</strong>元起</b></p>
							</div>
						</li>`;
			
			if (value["form"] == "normal") {
				var strA = "<em></em>";
				str = str.replace(new RegExp(strA),'');
			}
			
			$("#wrap_ticket .ticket .onfilm .filmbox .filmlist ul").append(str);
			
			$("#wrap_ticket .filmbox .filmlist ul li.smallfilm").hover(
				function(){
					$(this).find(".infobox_over").stop().animate({"height":"190px","width":"125px","left":"0px","top":0});
				},
				function(){
					$(this).find(".infobox_over").stop().animate({"height":"0px","width":"0px","left":"62.5px","top":"95px"});
				}
			);
		});
		//加长filmlist的宽度高度
		var listWidth = $("#wrap_ticket .ticket .onfilm .filmbox .filmlist .mainfilm").width()+data.length*20+$("#wrap_ticket .filmbox .filmlist .smallfilm").width()*data.length;
		var listheight = $("#wrap_ticket .ticket .onfilm .filmbox .filmlist .mainfilm").height();
		$("#wrap_ticket .filmlist").css({"width":listWidth,"height":listheight});
		
		//动态添加li之后给btn添加点击事件;
		$("#wrap_ticket .film_nextbtn").click(function(){
			$("#wrap_ticket .shadow_left").css("display","block");
			$("#wrap_ticket .filmlist").animate({"left":-1*(listWidth-$("#wrap_ticket .filmlist").parent().width())+"px"},"slow",function(){
				$("#wrap_ticket .film_nextbtn").css("display","none");
				$("#wrap_ticket .film_prebtn").css("display","block");
				$("#wrap_ticket .shadow_right").css("display","none");
			});
		})
		
		$("#wrap_ticket .film_prebtn").click(function(){
			$("#wrap_ticket .shadow_right").css("display","block");
			$("#wrap_ticket .filmlist").animate({"left":0+"px"},"slow",function(){
				$("#wrap_ticket .film_prebtn").css("display","none");
				$("#wrap_ticket .film_nextbtn").css("display","block");
				$("#wrap_ticket .shadow_left").css("display","none");
			});
			
		})
	});
	
	
	
	$.get("JSON/film_next.json",function(data){
		data = JSON.parse(data);
		$.each(data,function(index,value){
			var img = value["img"];
			var title = value["title"];
			var f_date = value["day"];
			var type = value["type"];
			var people = value["people"];
			var direc = value["director"];
			var price = value["price"];
			var score = value["score"];
			
			var str1 = "<li><p class='filmdate'>"+f_date+"</p><div class='nfilmshow'><a class='imagebox' href='#'><img src="+img+"/>";//+分数
			
			var str2 = "</a><h3 class='nfilmtitle'>"+title+"</h3><div class='showtype'><p><b>"+people+"</b>人想看-<span>"+type+"</span></p><p>导演：<a href='#'>"+direc+"</a></p><p><a class='prevideo'>预告片：<i></i></a></p></div>";
			
			var str3 = "<div class='showticket'><b><strong>"+price+"</strong>元起</b><a href='#'>超前预售</a></div></div></li>";
			
			//根据ajax返回的数据判断要不要添加价格框和分数栏
			if (score != "0") {
				str1 = str1 + "<i>"+score+"</i>";
			}
			
			str1 = str1 + str2;
			
			if (price != "0") {
				str1 = str1 +str3;
			}
			
			$("#wrap_ticket .nextonfilm .nfilmlist ul").append(str1);
		});
		
		var listWidth = $("#wrap_ticket .nextonfilm .nfilmlist ul li").width()*data.length+parseInt($("#wrap_ticket .nextonfilm .nfilmlist ul li").css("margin-right"))*data.length;
		
		$("#wrap_ticket .nextonfilm .nfilmlist").css("width",listWidth+"px");
		
		//给前后按钮添加点击事件
		
		//每次移动三张图的距离
		var moveDis = listWidth/data.length*3;
		$("#wrap_ticket .nextonfilm .nextfilm_nextbtn").click(function(){
			//给一个bool值看是否移动到边界
			var flag = false;
			//每次移动的目标值
			var target = $("#wrap_ticket .nextonfilm .nfilmlist").offset().left-moveDis;
			//判断移动目标值是否超出list范围
			if (Math.abs(target) > Math.abs((listWidth-$("#wrap_ticket .nextonfilm").width()))) {
				target = (listWidth-$("#wrap_ticket .nextonfilm").width())*(-1);
				flag = true;
			}
			
			$("#wrap_ticket .nextfilm_prebtn").css("display","block");
			$("#wrap_ticket .nshadow_left").css("display","block");
			
			$("#wrap_ticket .nextonfilm .nfilmlist").animate({"left":target+"px"},"slow",function(){
				if (flag) {
					$("#wrap_ticket .nextonfilm .nextfilm_nextbtn").css("display","none");
					$("#wrap_ticket .nextonfilm .nshadow_right").css("display","none");
				}
			});
		})
		$("#wrap_ticket .nextonfilm .nextfilm_prebtn").click(function(){
			//给一个bool值看是否移动到边界
			var flag = false;
			//每次移动的目标值
			var target = $("#wrap_ticket .nextonfilm .nfilmlist").offset().left+moveDis;
			//判断移动目标值是否超出list范围
			if (target > 0) {
				target = 0;
				flag = true;
			}
			
			$("#wrap_ticket .nextonfilm .nextfilm_nextbtn").css("display","block");
			$("#wrap_ticket .nextonfilm .nshadow_right").css("display","block");
			
			$("#wrap_ticket .nextonfilm .nfilmlist").animate({"left":target+"px"},"slow",function(){
				if (flag) {
					$("#wrap_ticket .nextonfilm .nextfilm_prebtn").css("display","none");
					$("#wrap_ticket .nextonfilm .nshadow_left").css("display","none");
				}
			});
		})
	});
	
	//给新片预告里的a添加hover事件
	$(".wrap-timeselec_cont .l-content a").hover(
		function(){
			$(this).find("i").css("opacity","0.6");
		},
		function(){
			$(this).find("i").css("opacity","1");
		}
	);
	
	//全球拾趣底部按钮hover事件
	$("#timeselect .global_fun .loadmore a").hover(
		function(){
			$(this).addClass("hover").find("i").addClass("hover");
		},
		function(){
			$(this).removeClass("hover").find("i").removeClass("hover");
		}
	);
	
	//动态添加global_fun里面的内容
	$.get("JSON/global_fun.json",function(data){
		data = JSON.parse(data);
		$.each(data, function(index,value) {
//			<li><div class="newscontent"><a href="#" class="image" title="美国制片人工会奖公布提名 《死侍》入围年度十佳 将与《爱乐之城》竞争"><img src="img/index/hotspot/1.jpg/"></a><h3 class="title"><a href="#">美国制片人工会奖公布提名</a></h3><p class="describe"><a href="#">《死侍》入围年度十佳 将与《爱乐之城》竞争</a></p></div></li>
			if(index < 12){
				var img = value["img"];
				var title = value["title"];
				var describe = value["describe"];
				
				
				var str1 = "<li><div class='newscontent'><a href='#' class='image'><img src="+img+"/>";
				
				if (value["type"] == "video") {
					str1 = str1 + "<em class='video'></em>";
				}
				
				var str2 = "</a><h3 class='title'><a href='#'>"+title+"</a></h3><p class='describe'><a href='#'>"+describe+"</a></p></div></li>";
				
				str1 = str1 + str2;
				
				$("#timeselect .global_fun .funbox ul").append(str1);
				
				$(".global_fun li").eq(index).find("a").attr("title",(title+" "+describe));
				
				
				if ((index+1)%4 == 0) {
					$("#timeselect .global_fun .funbox ul li").eq(index).css("margin-right","0px");
				}
			}
		});
		
		$("#timeselect .global_fun .funbox ul li a").hover(
			function(){
				$(this).find("em").css("opacity","0.6");
			},
			function(){
				$(this).find("em").css("opacity","1");
			}
		);
	})
	
	//给loadmore添加点击事件
	//给loadmore固定点击次数
	var loadTimes = 0;
	$("#timeselect .loadmore").click(function(){
		//将loadmore点击次数设置为1次
		if(loadTimes == 0){
			$.get("JSON/global_fun.json",function(data){
				data = JSON.parse(data);
				$.each(data, function(index,value) {
					if(index > 11){
						var img = value["img"];
						var title = value["title"];
						var describe = value["describe"];
						
						
						var str1 = "<li><div class='newscontent'><a href='#' class='image'><img src="+img+"/>";
						
						if (value["type"] != "normal") {
							str1 = str1 + "<em class=" + value["type"] + "></em>";
						}
						
						var str2 = "</a><h3 class='title'><a href='#'>"+title+"</a></h3><p class='describe'><a href='#'>"+describe+"</a></p></div></li>";
						
						str1 = str1 + str2;
						
						$("#timeselect .global_fun .funbox ul").append(str1);
						
						$(".global_fun li").eq(index).find("a").attr("title",(title+" "+describe));
						
						
						if ((index+1)%4 == 0) {
							$("#timeselect .global_fun .funbox ul li").eq(index).css("margin-right","0px");
						}
					}
				});
				
				$("#timeselect .global_fun .funbox ul li a").hover(
					function(){
						$(this).find("em").css("opacity","0.6");
					},
					function(){
						$(this).find("em").css("opacity","1");
					}
				);
			})
			
			$(this).find("a").html("查看更多");
		}
		
		loadTimes++;
		
	});
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            