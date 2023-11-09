// JavaScript Document


$(document).ready(function() {
	$('#click').click(function(e) {
		e.preventDefault();
		$('body').toggleClass('dark');
	});
	
//size box
	var inc = 10; //increment
	$('.control').click(function(e) {
		if($(this).hasClass('wPlus')){
			$(this).parent().animate({width:'+=10px'},200);
		}
		if($(this).hasClass('wMinus')){
			$(this).parent().animate({width:'-=10px'},200);
		}
		if($(this).hasClass('hPlus')){
			$(this).parent().animate({height:'+=10px'},200);
		}
		if($(this).hasClass('hMinus')){
			$(this).parent().animate({height:'-=10px'},200);
		}
	});
	
	
//sudoku solver
	$('#gridform').submit(function() {
		//var arr = $('#gridform').serializeArray();
		
		//array of all values
		/*var arrValues = new Array();
		var v=0;
		$('.maingrid input').each(function(){
		   	arrValues[v] = $(this).val();
			//alert(arrValues[v]);
		   	v++;
		});
		*/
		// array of given numbers
		var arrGivens = new Array();
		var g=0;
		$('.maingrid input[value!=""]').each(function(){
			var valueNum = parseInt($(this).val(),10);
		   	arrGivens[g] = valueNum;
			//alert(g+' '+arrGivens[g]);
		   	g++;
		});
		
		//fill in blanks
		//var arrBlanks = new Array();
		var a=1;
		//var b=0;
		$('.maingrid input').each(function(){
			if($(this).val() == ''){
		   		//arrBlanks[b] = $(this).val();
	   			//b++;
				
				if($.inArray(a, arrGivens) != -1){
					while($.inArray(a, arrGivens) != -1){
						a++;
					}
					$(this).val(a);
					arrGivens[g] = a;
					a++;
					g++;
				}
				else{
					$(this).val(a);
					arrGivens[g] = a;
					a++;
					g++;
				}
			}
		});

		//
		/*
		var a=1;
		var i=0;
		$('.maingrid input').each(function(){
			if($(this).val()){
				//alert(arrValues[i]);
			}
			else{
				if($.inArray(a, arrGivens)){
					a++;
					$(this).val(a);
					a=0;
				}
			}
			i++;
		});*/
			
		
		return false;
	});
});


$("action").click(function () {
    var emails=new Array();
    var j=0;
    $(".email").each(function(){
        emails[j]==$(this).val();
        j++;
    });
});
