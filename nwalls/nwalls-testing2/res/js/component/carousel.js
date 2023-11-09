/**
 * Class carousel / iosSlider
 **/
define(['jquery', 'component/base', 'iosslider'], function($, Base){
	function Carousel(){
		Base.call(this, {
			name 	: 'Carousel',
			//Options
			
			el				  : '.carousel-container', //carousel outer container for carousl and nav elements (pager, arrows, etc)
			carousel 		  : '.carousel', // slider container
			slider  		  : '.slider', // slider
			pager 			  : '.carousel-pager',
			arrowRight		  : '.carousel-arrow-right',
			arrowLeft 		  : '.carousel-arrow-left'
		}, function(s){
			
			var $carouselContainer = $(s.el),
				$carousel = $(s.el + ' ' + s.carousel),
				$slider = $(s.el + ' ' + s.slider),
				$pager = $(s.pager);
				$arrowRight = $(s.arrowRight),
				$arrowLeft = $(s.arrowLeft);
	
			var updatePager = function(i) {
				$pager.children('li').removeClass('active');
				$pager.children('li:nth-child(' + i + ')').addClass('active');
			}
		
			var initPager = function() {
				var numSlides = $slider.children().length;
		
				for (var i = 0; i < numSlides; i++) {
					$pager.append('<li>'+i+'</li>');
				}
			}
			var onSliderLoaded = function(args) {
				initPager();
				updatePager(args.currentSlideNumber);
			}
		
			var onSlideChange = function(args) {
				updatePager(args.currentSlideNumber);
			}
		
			var onPagerClick = function(e) {
				var i = $(this).index();
				$carousel.iosSlider('goToSlide', i + 1);
			}
		
			var initEvents = function() {
				$carousel.iosSlider({
					autoSlide: true,
					autoSlideTimer: 4000,
					desktopClickDrag: true,
					infiniteSlider: true,
					snapSlideCenter: true,
					snapToChildren: true,
					pager: s.pager,
					onSliderLoaded: onSliderLoaded,
					onSlideChange: onSlideChange
				});
				/*win.on('load', function(){
					$carousel.addClass('vis');
				});*/
		
				$pager.delegate('li', 'click', onPagerClick);
				$arrowRight.on('click', function() { $carousel.iosSlider('nextSlide'); });
				$arrowLeft.on('click', function() { $carousel.iosSlider('prevSlide'); });
			}

			initEvents();
		
		});
	}
	Carousel.prototype = Object.create(Base.prototype);
	return Carousel;
});