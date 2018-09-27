
	$(document).ready(function() {
		$( window ).scroll(function(e) {
		if ($(window).scrollTop() >=50){
				$(".site-header-main-wrapper").addClass("fixed-top").css({"color":"black","transition":"1s","background":"black","opacity":"0.8"});
				}
			else {
				$(".site-header-main-wrapper").removeClass("fixed-top").css({"opacity":"0.8","height":"60px"});
				}
		});
	});
	