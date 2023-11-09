/**
 * Custom Selects
 * ================================
 *
 * Description:  Replaces native select elements with div elements that can be styled in CSS.
 *               Desktop browsers use the simpleselect jquery plugin while mobile browsers use
 *               native functionality. Both solutions use the same HTML markup so only one set
 *               of styles is needed.
 *
 *               A "filter" onchange event is called on selects that conform to the specified
 *               filterSelector CSS selector pattern. The filter event assumes that the value
 *               attribute of the selected option contains a valid URL and sets
 *               window.location.href to that URL.
 *
 *
 * Parameters:
 *              el               : 'select',				// Selector of select elements to customize
 *              filterSelector   : '[data-action="filter"]'	// Selector of filter select elements
 *				forceDown		 : true						// true forces selects to behave more like native. The dropdown drops down and is anchored to the bottom of the select. false is the default simpleselect functionality.
 **/
define(['jquery', 'component/base', 'mobile-detect', 'simpleselect'], function($, Base){
	function CustomSelects(){
		Base.call(this, {
			name 	: 'Custom Selects',
			el 		: 'select',
			forceDown : true
		}, function(settings){
			var $select = $(settings.el);
			
			var initSimpleSelect = function() {
				$select.simpleselect();

				if (settings.forceDown == true){
					
					$(document).on('click.simpleselectmod', '.simpleselect', function(e) {

						$('.options').addClass('forceDown');
						
						var optionsContainer = $(this).find('.options');											
						var optionsContainerMaxHeight =  $(window).height() - optionsContainer.offset().top - 10 + $(window).scrollTop();
						
						optionsContainer.css({
							'max-height' : optionsContainerMaxHeight
						});
					});
				}
			}

			var updateMobileSelect = function($select) {
				var value = $select.val();
				var title = $select.find('option[value="' + value + '"]').html();
				$select.next().html(title);
			}

			var initMobileSelect = function() {
				$select.wrap('<div class="simpleselect"></div>')
				.wrap('<div class="placeholder"></div>')
				.after('<span></span>')
				.css({
					'border': 'none',
					'display': 'block',
					'height': '100%',
					'left': '0',
					'margin': '0',
					'opacity': '0',
					'padding': '0',
					'position': 'absolute',
					'top': '0',
					'width': '100%'
				});

				$select.each(function() { updateMobileSelect($(this)); });
				$select.on('change.MobileSelect', function() { updateMobileSelect($(this)); });
			}

			if ($.browser.mobile) {
				initMobileSelect();
			} else {
				initSimpleSelect();
			}
		});
	}
	CustomSelects.prototype = Object.create(Base.prototype); // Requires the polyfill in site.js for the old-school IE squad
	return CustomSelects;
});
