/**
 * Ajax form handling
 **/
define(['jquery', 'component/base'], function($, Base){
	function AjaxForm(){
		Base.call(this, {
			name 	: 'AjaxForm',
			//Options
			
			el          	: '[data-action="ajax"]', 	//put this attribute on forms
			required  		: '[required]',
			completeClass 	: 'complete',
			onError 		: function(formel, errorObj){
				var errorlabel,
					errormessage;

				formel.find('.error').removeClass('active');
				$.each(errorObj, function(k,v){
					if ($.type(v) === 'string'){
						v = [v];
					}
					errorlabel = formel.find('.error[for="'+ k + '"]');
					errormessage =  v.join('<br />');
					errorlabel.text(errormessage).addClass('active');
				});		
			    $('html, body').animate({
			        scrollTop: formel.offset().top - 90
			    }, 350);
			},
			onSuccess 		: function(formel, successObj){
				formel.addClass('complete');
				formel.prev('[data-property="success-msg"]').html(successObj.success);				
			}
		}, function(s){

				var init = function(){
					var inputs,
						error,
						thisid;
					
					inputs	= $(s.el).find(s.required);

					inputs.removeAttr('required');
					$(s.el).each(function(){
						$('<div />',{
							'data-property' : 'success-msg',
							'class'			: 'success',
						}).insertBefore($(this));
						$(this).append('<input type="hidden" name="ajax" value="1"/>');
					});
					inputs.each(function(){
						thisid = $(this).attr('id');
						error = $('<label />',{ 
							'for'	: thisid,
							'class'	: 'error'
						});
						error.insertAfter($(this));
					});
					initEvents();
				};

				var initEvents = function(){
					$(document).on('submit', s.el, function(e){
						e.preventDefault; 
						var thisform	= $(this),
							formData	= thisform.serialize(),
							url 		= thisform.attr('action');
														
						thisform.find('input[type="submit"]').attr('disabled', 'disabled');
						$.ajax({
							url 	: url,
							type 	: 'POST',		
							data 	: formData,
							success : function(data){
								try{
									s.onSuccess(thisform, $.parseJSON(data));
									thisform.find('input[type="submit"]').removeAttr('disabled');
								} catch(e){

								}
							},
							error 	: function(data){
								try{
									s.onError(thisform, $.parseJSON(data.responseText));
									thisform.find('input[type="submit"]').removeAttr('disabled');
								} catch(e){
									
								}
							}
						});
						return false;
					});
				};


				init();
		});
	}
	AjaxForm.prototype = Object.create(Base.prototype);
	return AjaxForm;
});