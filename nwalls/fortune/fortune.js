(function($){
	function isEven(n) {
		return (n % 2 == 0);
	}


	function thingy(){
		var thingContainer = document.getElementById('thingy-container');
		var containerHeight = 400;
		var frameLength = 100;
		var evenSteps;
		var innerEnabled = false;

		$('[data-action="start"]').on('click',function(){

			disableOuter();

			var steps = parseInt($(this).attr('data-steps'));
			evenSteps = isEven(steps);

			vert(containerHeight, -800);

			setTimeout(function(){
				if(steps > 1){
					full(steps-1, containerHeight, 0);
				}
				else{
					innerActive(2);
				}
			}, (frameLength*3)+1);

		});

		$('[data-action="continue"]').on('click',function(){
			innerEnabled = true;
			innerActive();

			var steps = parseInt($(this).attr('data-steps'));
			var pos;

			if(evenSteps == true){
				steps++;
				pos = -1600;
			}
			else{
				pos = 0;
			}
			full(steps, containerHeight, pos);

		});

		$('[data-action="end"]').on('click',function(){
			var msg = $(this).attr('data-msg');
			$('.message-container, #'+msg).addClass('vis');
			$('.inner-end').removeClass('active');
		});

		$('[data-action="restart"]').on('click',function(e){
			e.preventDefault();
			window.location.reload();
		});


		//open vertically
		function vert(h, p){
			setTimeout(function(){
				if(p < 0){
					p+=h;
					thingBg(p);
					vert(h, p);
				}
			},frameLength);
		}

		//open horizontally
		function horiz(h, p){
			setTimeout(function(){
				if(p >= -(h*3)){
					p-=h;
					thingBg(p);
					horiz(h,p);
				}
			},frameLength);
		}

		//from verical opened to horizontal opened
		function full(s, h, p){
			down();

			function down(){
				var down = setInterval(function(){
					if(p > -(h*4)){
						p-=h;
						thingBg(p);
					}
					else{
						clearInterval(down);
						s--;
						if(s > 0){
							up();
						}
						else{
							innerActive(1);
						}
					}
				}, frameLength);
			}
			function up(){
				var up = setInterval(function(){
					if(p < 0){
						p+=h;
						thingBg(p);
					}
					else{
						clearInterval(up);
						s--;
						if(s > 0){
							down();
						}
						else{
							innerActive(2);
						}
					}
				}, frameLength);
			}
		}

		function thingBg(pos){
			thingContainer.style.backgroundPosition = '0 '+ pos+'px';
		}

		function disableOuter(){
			$('.outer').addClass('hid');
		}

		function innerActive(x){
			if(innerEnabled == false){
				$('.inner-'+x).addClass('active');
				innerEnabled = true;
			}
			else{
				$('.inner').removeClass('active');
				endActive(x);
			}
		}

		function endActive(x){
			$('.end-'+x).addClass('active');
		}
	}

	$(document).ready(function(e) {
		thingy();
	});
	
})(jQuery);