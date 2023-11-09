// JavaScript Document

$(document).ready(function() {
	expand();
	waves();
	fish();
});

function expand(){
	var d = new Array();
	
	$('.tile').each(function(index, element) {
		h = $(this).children('p').height();
		w = $(this).children('p').width();
		d[index] = new Array(w,h);
	});
	$('.tile').children('p').height(0);
	$('.tile').children('p').width(0);

	$('.tile').click(function(e) {
		pWidth = d[$(this).index()-1][0];
		pHeight = d[$(this).index()-1][1];
		$('.tile').children('p').animate({width:0, height:0},500);
		$(this).children('p').animate({width:pWidth, height:pHeight},500);
	});
}

function float(){
	$('.tile').children('p').hide();
	$('.tile').click(function(e) {
		$('.clone').fadeOut(500);
		$(this).clone().appendTo('.wrapper').css({
			'position':'absolute',
			'top':'25%',
			'left':0
		}).hide().fadeIn(500).children('p').show().addClass('clone');
	});
}

function waves(){
	var h=$(window).height()/$(window).width();
	wh=h*$(window).height();
	$('.waves').css('height',wh*0.5);

	$(window).resize(function(e) {
		h=$(window).height()/$(window).width();
		wh=h*$(window).height();
		$('.waves').css('height',wh*0.5);
	});
	$('.wave').each(function(i) {
		setTimeout(function(){
			wavemove(i);
		},i*200);
	});
	function wavemove(idx){
		setInterval(function(){
			$('.wave').eq(idx).animate({marginTop:'-10px'},500,function(){
				$(this).animate({marginTop:0},500);
			});
		},1000);
	}

}
function fish(){
	function fishSwim(){
		$('.fish').animate({left:'-=10px'},200, 'linear', fishSwim);
	}
	fishSwim();
	
	function fishTail(){
		$('.fish span').animate({right:'-5px',borderRightWidth:'10px'}, 200, function(){
			$(this).animate({right:'-10px',borderRightWidth:'15px'}, 200, fishTail);
		});
	}
	fishTail();
}