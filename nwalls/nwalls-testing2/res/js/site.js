/*
 * site.js
 * Module instantiation and site-specific functions
 *
 * 1. Require
 *		1.1. Require Config
 *		1.2. Modules List
 * 2. Site Classes
 *		2.1. Example
 *		2.2. Hamburger
 * 3. Runtime
 * 4. Helpers

/* 1. Require
 ====================================================================================== */
if (typeof jQuery === 'function') {
	define('jquery', function () { return jQuery; });
}

// For more information on OOHology's use of requre.js, clone the project 'require-sandbox.com'
// and refer to the examples and documentation in the javascript files there.

/* 1.1. Require Config
================================================= */

requirejs.config({
	baseUrl	: '/res/js',
	paths 	: {
		'jquery'		: ['//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min', 'vendor/jquery-1.11.1.min'],
		'mobile-detect'	: ['vendor/detect-mobile-browsers.min'],
		'simpleselect'	: ['vendor/simpleselect.min'],
		//'simpleselect'	: ['vendor/jquery.simpleselect'],
		'iosslider'		: ['vendor/iosslider.min'],
		'photoswipe'	: ['vendor/photoswipe.min']
	},
	shim	: {
		'mobile-detect'	: ['jquery'],
		'simpleselect'	: ['jquery'],
		'iosslider'		: ['jquery']
	}
});

/* 1.2. Modules List
================================================= */

var siteModules = [
	['component/ajax-form'],
	['component/custom-selects'],
	['component/toggle'],
	['component/carousel'],
	['component/nav'],
	['component/gallery']
];

for (var i = 0; i < siteModules.length ; i++) {
	require(siteModules[i], function(Module){
		var m = new Module;
		m.init();		
	});
}


/* 2. Site Classes
 ====================================================================================== */

; var SITE = (function(core, window, document, $) {
"use strict";

	/* 2.1. Example Class
	================================================= */

	core.circle = function() {
		$('.circle').on('click', function(){
			$(this).toggleClass('vis');
		});
	};

	return core;

}) (SITE || {}, window, document, jQuery);


/* 3. Runtime
 ====================================================================================== */

(function ($) {
	$( document ).ready(function() {
		SITE.circle();

	});
}) (jQuery);


/* 4. Helpers
 ====================================================================================== */

// Object.create polyfill for legacy browsers
"function"!=typeof Object.create&&(Object.create=function(){var a=function(){};return function(b){if(1<arguments.length)throw Error("Second argument not supported");if("object"!=typeof b)throw TypeError("Argument must be an object");a.prototype=b;var c=new a;a.prototype=null;return c}}());
// Console.log polyfill for IE8 https://gist.githubusercontent.com/elijahmanor/7884984/raw/console-monkey-patch.js
(function(){for(var a,e=function(){},b="assert clear count debug dir dirxml error exception group groupCollapsed groupEnd info log markTimeline profile profileEnd table time timeEnd timeStamp trace warn".split(" "),c=b.length,d=window.console=window.console||{};c--;)a=b[c],d[a]||(d[a]=e)})();
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
Object.keys||(Object.keys=function(){var e=Object.prototype.hasOwnProperty,f=!{toString:null}.propertyIsEnumerable("toString"),c="toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" "),g=c.length;return function(b){if("object"!==typeof b&&("function"!==typeof b||null===b))throw new TypeError("Object.keys called on non-object");var d=[],a;for(a in b)e.call(b,a)&&d.push(a);if(f)for(a=0;a<g;a++)e.call(b,c[a])&&d.push(c[a]);return d}}());

