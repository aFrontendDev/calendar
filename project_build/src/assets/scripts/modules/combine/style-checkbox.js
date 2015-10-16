var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		styleCheckbox: {
			processedClass: 'checkbox-replace-input',
			ignoreClass: 'checkbox-replace-ignore',
			init: function() {
				var self = this;
				if (bb.ltIE(9)) {
					return;
				}
				var $inputs = $('input[type=checkbox]:not(.' + self.processedClass + '):not(.' + self.ignoreClass + ')');
				$inputs.each(function() {
					var $input = $(this),
						$placeholder = $('<label />', {
							'class': 'checkbox-replace',
							'for': $input.attr('id')
						});
					$input.addClass(self.processedClass).after($placeholder);
				});
			}
		}
	});
	$.subscribe('pageReady ajaxLoaded', function() {
		bb.styleCheckbox.init();
	});
}(jQuery));
