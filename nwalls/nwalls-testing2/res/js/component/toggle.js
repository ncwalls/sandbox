/**
 * Class toggler / jQuery slidetoggler
 **/
define(['jquery', 'component/base'], function($, Base){
	function Toggle(){
		Base.call(this, {
			name 	: 'Toggler',
			//Options
			
			activeClass : 'active',
			el          : '[data-action="toggle"]',
			targetAttr  : 'data-target',
			method 		: 'css'
		}, function(s){
			$(document).on('click.toggle', s.el, function(e){
			    var t = $(this).attr(s.targetAttr);
			    e.preventDefault();
			    e.stopPropagation();
			    if ($(this).is('a')){
			        e.preventDefault();    
			    }
			    if (s.method === 'css'){
			    	$(t).toggleClass(s.activeClass); 	
			    } else {
			    	$(t).slideToggle();
			    }
			    
			});
		});
	}
	Toggle.prototype = Object.create(Base.prototype);
	return Toggle;
});