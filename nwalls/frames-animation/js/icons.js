// JavaScript Document

$(document).ready(function() {
	icons();
//	paddle();
});

function icons(){
	var frames = 5; 
	var imgHeight = 615;
	var topMove = imgHeight/frames;
	var delayTime = 75;
	console.log(imgHeight);
	
	$('.animation-container').hover(
		function(){
			for(var i=0; i<frames-1; i++){
				$(this).children('img, .icon-text').animate({'top':'-='+topMove+'px'},0).delay(delayTime);
			}
		},
		function(){
			for(var i=0; i<frames-1; i++){
				$(this).children('img, .icon-text').animate({'top':'+='+topMove+'px'},0).delay(delayTime);
			}
		}
	);
}

function paddle(){
	var frames = 14;
	var imgHeight = $('#paddle img').height();
	var topMove = imgHeight/frames;
	var delayTime = 75;
	
	$('.animation-container').hover(
		function(){
			for(var i=0; i<frames-1; i++){
				$(this).children('img, .icon-text').animate({'top':'-='+topMove+'px'},0).delay(delayTime);
			}
		},
		function(){
			for(var i=0; i<frames-1; i++){
				$(this).children('img, .icon-text').animate({'top':'+='+topMove+'px'},0).delay(delayTime);
			}
		}
	);
}
