/**
 * Class nav / jQuery subnavs/mobile nav & subnavs
 * 
 * el			: hamburger button
 * navContainer			: Container for mobile menu. 
 *						  This can contain a main nav and secondary navs;
 * 						  basically anything that you want to be in the mobile menu
 * hasSubnav			: class for parent of a subnav menu. This is usually an li.
 * subnavSiblingLink 	: subnav "parent" anchor (technically a sibling of the subnav usually)
 * visibleClass			: visible class for dropdowns / subnavs (duh)
 
example markup:

 *** el ***
 <div data-action="toggle-mobile-menu"><span></span></div>

 *** navContainer ***
 <nav class="site-nav-container">

	<ul id="main-nav">
		<li><a href="">Main Nav item</a>
		
 *** hasSubnav ***
		<li class="has-subnav">

 *** subnavSiblingLink ***
			<a href="">Main Nav item w/subnav</a>
			
			<ul class="subnav">
				<li><a href="">Drop-down item</a></li>
			</ul>
		</li>
	</ul>	
	<ul id="secondary-nav">
		<li><a href="">secondary nav item</a></li>
	</ul>
</nav>

 *
 *
 **/
define(['jquery', 'component/base', 'mobile-detect'], function($, Base){
	function Nav(){
		Base.call(this, {
			name : 'Nav',
			
			//Options
			el 				  : '[data-action="toggle-mobile-menu"]', // hamburger button
			navContainer	  : '.site-nav-container', // Container for mobile menu.
			hasSubnav		  : '.has-subnav', // parent of a subnav
			subnavSiblingLink : '.has-subnav > a', // subnav "parent" anchor (technically a sibling of the subnav usually)
			visibleClass	  : 'vis' // visible class for subnavs (duh)
			
		}, function(s){
			var	$navButton = $(s.el),
				$navContainer = $(s.navContainer),
				$hasSubnav = $(s.hasSubnav),
				$subnavSiblingLink = $(s.subnavSiblingLink),
				visClass = s.visibleClass;
			
			var toggleMenu = function(){
				$navButton.attr('data-property', $navButton.attr('data-property') == 'open' ? 'closed' : 'open');
				$navContainer.toggleClass('open');
			};
		
			$(document).on('click', s.el, function(e){
				e.stopPropagation();
				toggleMenu();
				$hasSubnav.removeClass(visClass);
				
				//disable subnav parent link
				$subnavSiblingLink.removeClass('link');
			});
			$navContainer.on('click.mobilemenu', function(e){
				e.stopPropagation();
			});
			$(document).on('click', function(){
				if($(this).not(s.navContainer) && $(this).not(s.el)){
					$navButton.attr('data-property', 'closed');
					$navContainer.removeClass('open');
				}
			});
		
			if(jQuery.browser.mobile == true){
				
				/**
				* If mobile : add visClass on hasSubnav click, remove it on document click
				* Else : add/remove visClass on hasSubnav hover/out
				*
				* Also, handle desktop subnavs on (some) touch devices (basically just tablets):
				*   On mobile/tablet, prevent following subnav "parent" link on first click.
				*   First click opens subnav, second click follows the link.
				*   (if link has class "activeLink", follow it; else open subnav
				*/
				$subnavSiblingLink.on('click',function(e){
					var self = $(this);
					if(self.hasClass('activeLink') && self.attr('href') != '#'){
						//follow link
						return true;
					}
					else{
						//don't follow link
						e.preventDefault();

						var selfParent = self.parent();

						//hide other subnav
						$hasSubnav.not(selfParent).removeClass(visClass);

						//show desired subnav
						selfParent.addClass(visClass);
						
						//remove link class from other subnav "parent" links and add to clicked link
						$subnavSiblingLink.not(self).removeClass('activeLink');
						self.addClass('activeLink');
					}
				});
				$hasSubnav.on('click',function(e){
					//don't close subnav
					e.stopPropagation();
				});
				$(document).click(function() {
					$hasSubnav.removeClass(visClass);
					
					//disable subnav "parent" link
					$subnavSiblingLink.removeClass('activeLink');
				});
			} else{
			
				/**
				* if not mobile, add/remove visClass on hover/out
				*/
				$hasSubnav.hover(
					function(){
						$(this).addClass(visClass);
					},
					function(){
						$(this).removeClass(visClass);
					}
				);
			}
		});
	}
	
	Nav.prototype = Object.create(Base.prototype);
	return Nav;
});