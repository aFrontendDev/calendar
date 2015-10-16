/**
 * @file Navigation toggle module
 * @author {@link https://github.com/buildingblocks Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * navigationToggle related methods.
		 * @namespace navigationToggle
		 */
		navigationToggle: {
			// jQuery DOM caching
			$navigationToggle: null,
			$actionNavigationToggle: null,
			// CSS selectors
			navigationToggleSelector: '.navigation-toggle',
			navigationToggleTargetSelector: '.navigation-toggle-target',
			actionNavigationToggleSelector: '.action-navigation-toggle',
			// Classes
			navigationToggleTargetClass: 'navigation-toggle-target',
			actionNavigationToggleActiveClass: 'action-navigation-toggle-active',
			navigationToggleContainerActiveClass: 'navigation-toggle-container-active',
			//Misc
			/**
			 * Initialises navigationToggle module. Caches jQuery DOM objects.
			 * @function init
			 * @memberof navigationToggle
			 */
			init: function() {
				var self = this;

				self.$navigationToggle = $(self.navigationToggleSelector);

				if (!self.$navigationToggle || self.$navigationToggle.length < 1) {
					return;
				}


				self.$actionNavigationToggle = $(self.actionNavigationToggleSelector);

				self.$actionNavigationToggle.on('click.navigationToggle', function(event) {
					event.preventDefault();
					var $this = $(this),
						dataTarget = $this.data('navigation-toggle-target');

					if (!dataTarget) {
						return;
					}

					if ($this.hasClass(self.actionNavigationToggleActiveClass)) {
						self.closeMenu($this, dataTarget);
					} else {
						self.openMenu($this, dataTarget);
					}
				});
			},
			/**
			 * Adds CSS class to <html>, showing menu.
			 * @function openMenu
			 * @memberof navigationToggle
			 */
			openMenu: function($action, dataTarget) {
				var self = this;

				if (!$action || !dataTarget) {
					return;
				}

				var $targetContainer = $(dataTarget);

				if ($targetContainer.length < 1) {
					return;
				}

				var $target = $targetContainer.find(self.navigationToggleTargetSelector);

				if ($target.length < 1) {
					return;
				}

				var targetHeight = $target.outerHeight(true);

				$targetContainer.height(targetHeight);
				$targetContainer.addClass(self.navigationToggleContainerActiveClass);
				$action.addClass(self.actionNavigationToggleActiveClass);
			},
			/**
			 * Removes CSS class from <html>, hiding menu.
			 * @function closeMenu
			 * @memberof navigationToggle
			 */
			closeMenu: function($action, dataTarget) {
				var self = this;

				if (!$action || !dataTarget) {
					return;
				}

				var $targetContainer = $(dataTarget);

				if ($targetContainer.length < 1) {
					return;
				}

				$targetContainer.height(0);
				$targetContainer.removeClass(self.navigationToggleContainerActiveClass);
				$action.removeClass(self.actionNavigationToggleActiveClass);
			}
		}
	});
	$.subscribe('pageReady', function() {
		bb.navigationToggle.init();
	});
}(jQuery));
