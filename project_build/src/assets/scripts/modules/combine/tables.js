var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		tables: {
			processedClass: 'processed',
			tableSelector: '.table',
			containerClass: 'table-container',
			init: function() {
				var self = this;
				$(self.tableSelector + ':not(.' + self.processedClass + ')').each(function() {
					var $table = $(this),
						$wrap = $('<div>', {
							'class': self.containerClass

						});
					$table.wrap($wrap);
				});
			}
		}
	});
	$.subscribe('pageReady ajaxLoaded', function() {
		bb.tables.init();
	});
}(jQuery));
