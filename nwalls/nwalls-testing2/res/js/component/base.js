// Base Class. All modules are extended off this one. It's going to use jQuery as a $,
// so we'll define what's required as seen below.
define(['jquery'], function($){
	// Prototyping an object here. We're also saying that we can throw default 
	// settings and action into it.
	var WaxBase = function(defaults, action){
		var _self = this, //Is this needed?
			basedefaults = {
				debug : false
			};
		/**
		 * Public defaults and actions based off what's brought in, blank settings.
		 * Debug set to false; if set to true in the module defaults, errors go verbose.
		 **/
		this.defaults 	= $.extend(basedefaults, defaults);
		this.settings 	= {};
		this.action 	= action;
	};

	// Adding a prototype init to all modules.
	// More info on prototyping: http://addyosmani.com/resources/essentialjsdesignpatterns/book/#prototypepatternjavascript
	WaxBase.prototype.init = function(args){		
		var instance;
		// $.extend takes param 1 and adds param 2. Kinda like an array merge.
		// Settings are defaults, overridden and appended by your options.
		this.settings = $.extend(this.defaults, args);
		// If the element in question exists...
		if($(this.settings.el).length > 0){
			// A try-catch loop for verbose errors, and so execution doesn't die on one line.
			try{
				this.action(this.settings, instance);
			} catch(e){
				if (this.settings.debug === true){
					console.log('There was an error with "' + this.settings.name + '". :(');
					console.log(e);
				}
			}
		} else {
			if (this.settings.debug === true){
				console.log('"' + this.settings.name + '" couldn\'t find selector "' + this.settings.el + '".');
			}
		}
	};
	return WaxBase;
});