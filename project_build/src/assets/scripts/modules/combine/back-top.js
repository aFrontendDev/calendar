var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		backTop: {
			init: function() {
				var self = this;
				bb.settings.$body.on('click.backTop', '.action-back-to-top', function(event) {
					//bb.settings.$window.scrollTop(0);
					event.preventDefault();
					bb.settings.$htmlbody.animate({
						scrollTop: 0
					}, 400);
				});
			},
		}
	});
	$.subscribe('pageReady', function() {
		bb.backTop.init();
	});
}(jQuery));
