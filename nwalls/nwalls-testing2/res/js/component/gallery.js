/**
 * Class gallery
 * 
 *
 *
 **/
define(['component/base', 'photoswipe', 'vendor/photoswipe-ui-default.min'], function(Base, PhotoSwipe, PhotoSwipeUI_Default){
	function Gallery(){
		Base.call(this, {
			name : 'Gallery',
			
			//Settings
			el : '.ooh-gallery',
			
			//Photoswipe options
			
			
		}, function(s){
			
			/*var photoswipeOptions = {
				index : s.index,
				getThumbBoundsFn : s.getThumbBoundsFn,
				showAnimationDuration : s.showAnimationDuration,
				hideAnimationDuration : s.hideAnimationDuration,
				showHideOpacity : s.showHideOpacity,
				bgOpacity : s.bgOpacity,
				spacing : s.spacing,
				allowPanToNext : s.allowPanToNext,
				loop : s.loop,
				pinchToClose : s.pinchToClose,
				closeOnScroll : s.closeOnScroll,
				closeOnVerticalDrag : s.closeOnVerticalDrag,
				mouseUsed : s.mouseUsed,
				escKey : s.escKey,
				arrowKeys : s.arrowKeys,
				history : s.history,
				galleryUID : s.galleryUID,
				errorMsg : s.errorMsg,
				preload : s.preload,
				mainClass : s.mainClass,
				getNumItemsFn : s.getNumItemsFn,
				focus : s.focus
			};
			
			var photoswipeUIOptions = {
				barsSize: {top:44, bottom:'auto'},
				closeElClasses: ['item', 'caption', 'zoom-wrap', 'ui', 'top-bar'],
				timeToIdle: 4000,
				timeToIdleOutside: 1000,
				loadingIndicatorDelay: 1000,
				addCaptionHTMLFn: function(item, captionEl, isFake) {
					if(!item.title) {
						captionEl.children[0].innerHTML = '';
						return false;
					}
					captionEl.children[0].innerHTML = item.title;
					return true;
				},
				closeEl:true,
				captionEl: true,
				fullscreenEl: true,
				zoomEl: true,
				shareEl: true,
				counterEl: true,
				arrowEl: true,
				preloaderEl: true,
				tapToClose: false,
				tapToToggleControls: true,
				shareButtons: [
					{id:'facebook', label:'Share on Facebook', url:'https://www.facebook.com/sharer/sharer.php?u='},
					{id:'twitter', label:'Tweet', url:'https://twitter.com/intent/tweet?text=&url='},
					{id:'pinterest', label:'Pin it', url:'http://www.pinterest.com/pin/create/button/?url=&media=&description='},
					{id:'download', label:'Download image', url:'', download:true}
				],
				indexIndicatorSep: ' / '
			};*/

			var initPhotoSwipeFromDOM = function(gallerySelector) {
		
				// parse slide data (url, title, size ...) from DOM elements (links)
				var parseThumbnailElements = function(el) {
					var thumbElements = el.childNodes,
						numNodes = thumbElements.length,
						items = [],
						el,
						childElements,
						thumbnailEl,
						size,
						item;
			
					for(var i = 0; i < numNodes; i++) {
						el = thumbElements[i];
			
						// include only element nodes 
						if(el.nodeType !== 1) {
						  continue;
						}
						childElements = el.children;
			
						size = el.getAttribute('data-size').split('x');
			
						// create slide object
						item = {
						  src: el.getAttribute('href'),
						  w: parseInt(size[0], 10),
						  h: parseInt(size[1], 10)
						};
			
						item.el = el; // save link to element for getThumbBoundsFn
			
						if(childElements.length > 0) {
						  item.msrc = childElements[0].getAttribute('src'); // thumbnail url
						  if(childElements.length > 1) {
							  item.title = childElements[1].innerHTML; // caption (contents of figure)
						  }
						}
			
						items.push(item);
					}
			
					return items;
				};
			
				// find nearest parent element
				var closest = function closest(el, fn) {
					return el && ( fn(el) ? el : closest(el.parentNode, fn) );
				};
			
				// triggers when user clicks on thumbnail
				var onThumbnailsClick = function(e) {
					e = e || window.event;
					e.preventDefault ? e.preventDefault() : e.returnValue = false;
			
					var eTarget = e.target || e.srcElement;
			
					var clickedListItem = closest(eTarget, function(el) {
						return el.tagName === 'A';
					});
			
					if(!clickedListItem) {
						return;
					}
			
					var clickedGallery = clickedListItem.parentNode;
			
					var childNodes = clickedListItem.parentNode.childNodes,
						numChildNodes = childNodes.length,
						nodeIndex = 0,
						index;
			
					for (var i = 0; i < numChildNodes; i++) {
						if(childNodes[i].nodeType !== 1) { 
							continue; 
						}
			
						if(childNodes[i] === clickedListItem) {
							index = nodeIndex;
							break;
						}
						nodeIndex++;
					}
			
					if(index >= 0) {
						openPhotoSwipe( index, clickedGallery );
					}
					return false;
				};
			
				// parse picture index and gallery index from URL (#&pid=1&gid=2)
				var photoswipeParseHash = function() {
					var hash = window.location.hash.substring(1),
					params = {};
			
					if(hash.length < 5) {
						return params;
					}
			
					var vars = hash.split('&');
					for (var i = 0; i < vars.length; i++) {
						if(!vars[i]) {
							continue;
						}
						var pair = vars[i].split('=');  
						if(pair.length < 2) {
							continue;
						}           
						params[pair[0]] = pair[1];
					}
			
					if(params.gid) {
						params.gid = parseInt(params.gid, 10);
					}
			
					if(!params.hasOwnProperty('pid')) {
						return params;
					}
					params.pid = parseInt(params.pid, 10);
					return params;
				};
			
				var openPhotoSwipe = function(index, galleryElement, disableAnimation) {
					var pswpElement = document.querySelectorAll('.pswp')[0],
						gallery,
						options,
						items;
			
					items = parseThumbnailElements(galleryElement);
			
					// define options (if needed)
					options = {
						index: index,
			
						// define gallery index (for URL)
						galleryUID: galleryElement.getAttribute('data-pswp-uid'),
			
						getThumbBoundsFn: function(index) {
							// See Options -> getThumbBoundsFn section of docs for more info
			
							var thumbnail = items[index].el.children[0],
								pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
								rect = thumbnail.getBoundingClientRect(); 
			
							return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
						}
			
					};
			
					if(disableAnimation) {
						options.showAnimationDuration = 0;
					}
			
					// Pass data to PhotoSwipe and initialize it
					gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
					gallery.init();
				};
			
				// loop through all gallery elements and bind events
				var galleryElements = document.querySelectorAll( gallerySelector );
				for(var i = 0, l = galleryElements.length; i < l; i++) {
					galleryElements[i].setAttribute('data-pswp-uid', i+1);
					galleryElements[i].onclick = onThumbnailsClick;
				}
			
				// Parse URL and open gallery if it contains #&pid=3&gid=1
				var hashData = photoswipeParseHash();
				if(hashData.pid > 0 && hashData.gid > 0) {
					openPhotoSwipe( hashData.pid - 1 ,  galleryElements[ hashData.gid - 1 ], true );
				}
			};
			
			// execute above function
			initPhotoSwipeFromDOM(s.el);

		});
	}
	
	Gallery.prototype = Object.create(Base.prototype);
	return Gallery;
});