/**
 * @file Menu module
 * @author {@link https://github.com/buildingblocks Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Menu related methods.
		 * @namespace menu
		 */
		menu: {
			// jQuery DOM caching
			$handle: null,
			$navItems: null,
			// CSS selectors
			navItems: '.smallscreen-nav-item',
			// Classes
			menuInClass: 'menu-in',
			menuContentInClass: 'menu-content-in',
			menuShowClass: 'menu-show',
			navItemInClass: 'nav-item-in',
			//Misc
			menuTimerA: null,
			menuTimerB: null,
			navWait: false,
			navItemWait: [],
			inSpeedWait: 50,
			outSpeedWait: 0,
			/**
			 * Initialises menu module. Caches jQuery DOM objects.
			 * @function init
			 * @memberof menu
			 */
			init: function() {
				var self = this;
				self.$handle = $('.action-menu');
				self.$navItems = $(self.navItems);

				self.$handle.on('click.menu', function(event) {
					event.preventDefault();
					if (bb.settings.$html.hasClass(self.menuInClass)) {
						self.closeMenu(event);
					} else {
						self.openMenu(event);
					}
				});

				bb.settings.$body.on('click.menu', '.action-menu-close', function(event) {
					event.preventDefault();
					self.closeMenu(event);
				});
			},
			/**
			 * Adds CSS class to <html>, showing menu.
			 * @function openMenu
			 * @memberof menu
			 */
			openMenu: function() {
				var self = this;

				if (!Modernizr.ios) {
					bb.scrollLock.lock();
				}
				bb.settings.$html.addClass(self.menuShowClass);
				bb.settings.$html.addClass(self.menuInClass);

				self.menuTimerA = setTimeout(function() {
					bb.settings.$html.addClass(self.menuContentInClass);
					self.showNavItems();
					clearTimeout(self.menuTimerA);
				}, 300);
			},
			/**
			 * Adds CSS class to nav items to show them
			 * @function showNavItems
			 * @memberof menu
			 */
			showNavItems: function() {
				var self = this,
					singleSpeed = 100,
					speed = 0,
					index = 1;

				if (self.$navItems && self.$navItems.length < 1) {
					return;
				}

				if (Modernizr.csstransitions) {
					self.navWait = setTimeout(function() {
						self.$navItems.each(function() {
							var $navItem = $(this);
							self.navItemWait.push(setTimeout(function() {
								$navItem.addClass(self.navItemInClass);
							}, speed));
							speed = index * singleSpeed;
							index++;
						});
						self.outSpeed = speed;
						clearTimeout(self.navWait);
					}, self.inSpeedWait + 100);
				} else {
					self.$navItems.addClass(self.navItemInClass);
				}
			},
			/**
			 * Removes CSS class from <html>, hiding menu.
			 * @function closeMenu
			 * @memberof menu
			 */
			closeMenu: function() {
				var self = this;
				bb.settings.$html.removeClass(self.menuContentInClass);
				bb.settings.$html.removeClass(self.menuInClass);

				self.menuTimerB = setTimeout(function() {
					bb.settings.$html.removeClass(self.menuShowClass);
					if (!Modernizr.ios) {
						bb.scrollLock.unlock();
					}
					self.hideNavItems();
					clearTimeout(self.menuTimerB);
				}, 300);
			},
			/**
			 * Adds CSS class to nav items to show them
			 * @function showNavItems
			 * @memberof menu
			 */
			hideNavItems: function() {
				var self = this;

				if (self.$navItems && self.$navItems.length < 1) {
					return;
				}

				if (self.navWait) {
					clearTimeout(self.navWait);
				}

				if (Modernizr.csstransitions) {
					self.navWait = setTimeout(function() {
						for (var i = 0; i < self.navItemWait.length; i++) {
							clearTimeout(self.navItemWait[i]);
						}

						self.$navItems.removeClass(self.navItemInClass);
						clearTimeout(self.navWait);
					}, 30);
				} else {
					self.$navItems.removeClass(self.navItemInClass);
				}
			},
		}
	});
	$.subscribe('pageReady', function() {
		bb.menu.init();
	});
}(jQuery));
