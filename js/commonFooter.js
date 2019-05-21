$(function(){
	var clickTimes = 1;
	$("#aWeiXinPicButton").click(function(){
		if (clickTimes%2 == 1) {
			$("#divWeiXinPicContainer").stop().fadeIn();
		}else{
			$("#divWeiXinPicContainer").stop().fadeOut();
		}
		clickTimes++;
	})
});