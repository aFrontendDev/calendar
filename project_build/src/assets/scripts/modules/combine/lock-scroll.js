var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		scrollLock: {
			$fixedItems: null,
			$measure: null,
			$measureRuler: null,
			measureClass: 'scroll-measure',
			storedScrollPos: 0,
			isLocked: false,
			shiftWait: null,
			hasScrollbar: false,
			scrollableSelectors: '.modal-container, .navigation-alt-levels, .cart-summary-body',
			fixedSelectors: 'body, #header, #page',
			init: function() {
				var self = this;
				// list of fixed items to apply width to
				self.$fixedItems = $(self.fixedSelectors);
				// self.$fixedItems = $('*').filter( function () {
				// 	return this.style && this.style.position === 'fixed';
				// });
				self.$measure = $('<div />', {
					'class': self.measureClass
				});
				// we need a paren with a scroll bar
				self.$measureRuler = $('<div />');
				bb.settings.$body.append(self.$measure.html(self.$measureRuler));
				self.testScrollbar();
			},
			testScrollbar: function() {
				var self = this,
					width1 = 0,
					width2 = 0;
				self.$measure.addClass('scroll');
				width1 = self.$measureRuler.width();
				//window.alert(width1);
				setTimeout(function() {
					width1 = self.$measureRuler.width();
					self.$measure.removeClass('scroll');
					setTimeout(function() {
						width2 = self.$measureRuler.width();
						//window.alert(width2);
						if (width2 > width1) {
							//window.alert('has scrollbars');
							self.hasScrollbar = true;
						}
					}, 30);
				}, 30);
			},
			lock: function() {
				var self = this;
				if (self.isLocked) {
					return;
				}
				self.isLocked = true;
				self.storedScrollPos = bb.settings.$window.scrollTop();
				//window.alert(self.storedScrollPos);
				self.fixWidths(true);
				bb.settings.$body.on('touchmove.scrollLock', function(event) {
					event.stopPropagation();
					event.preventDefault();
				});
				$(self.scrollableSelectors).on('touchmove.scrollLock', function(event) { // @todo add all scrollable overlays
					event.stopPropagation();
				});
				setTimeout(function() {
					if (Modernizr.android) {
						// bb.settings.$body.css({
						// 	'position': 'fixed',
						// 	'overflow': 'hidden',
						// 	'top': self.storedScrollPos * -1
						// });
					}
					bb.settings.$html.addClass('scroll-locked');
				}, 10);
				setTimeout(function() {
					if (Modernizr.ios) {
						bb.settings.$html.addClass('scroll-locked-ios');
					}
				}, 100);
			},
			unlock: function() {
				var self = this;
				if (!self.isLocked) {
					return;
				}
				bb.settings.$body.off('touchmove.scrollLock');
				bb.settings.$html.removeClass('scroll-locked').removeClass('scroll-locked-ios');
				setTimeout(function() {
					if (Modernizr.android) {
						//window.alert(self.storedScrollPos);
						//bb.settings.$htmlbody.scrollTop(self.storedScrollPos);
					}
				}, 10);
				setTimeout(function() {

					self.unfixWidths();
					self.storedScrollPos = null;
					self.isLocked = false;
				}, 100);
			},
			fixWidths: function(force) {
				var self = this;
				if (!self.isLocked && !force) {
					return;
				}
				self.unfixWidths();
				self.$fixedItems.css('width', self.$measureRuler.innerWidth());
			},
			unfixWidths: function() {
				var self = this;
				self.$fixedItems.css('width', '');
			}
		}
	});
	$.subscribe('pageReady', function() {
		bb.scrollLock.init();
	});
	$.subscribe('viewportResizeEnd', function() {
		bb.scrollLock.fixWidths();
	});
}(jQuery));
