var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		styleDatepicker: {
			processedClass: 'processed',
			polyfillLoaded: false,
			init: function() {
				var self = this;
				var $inputs = $('input[type=date]:not(.' + self.processedClass + ')');
				$inputs.each(function() {
					var $input = $(this),
						classes = $input.attr('class') ? $input.attr('class') : '',
						$wrapper = $('<span />', {
							'class': 'date-replace ' + classes
						});
					$input.removeAttr('class').addClass(self.processedClass).wrap($wrapper);
				});
				if (!Modernizr.inputtypes.date) {
					self.loadPolyfill($inputs);
				}
			},
			loadPolyfill: function($inputs) {
				var self = this;
				Modernizr.load({
					test: $inputs.length,
					yep: '/scripts/datepickers.js',
					complete: function() {
						self.polyfillLoaded = true;
						self.datepickerFallback($inputs);
					}
				});
			},
			datepickerFallback: function($inputs) {
				var self = this;
				if (Modernizr.inputtypes.date) {
					return;
				}
				if (!self.polyfillLoaded) {
					self.loadPolyfill($inputs);
					return;
				}
				$inputs.each(function() {
					var $input = $(this),
						minDate = $input.attr('min') ? $input.attr('min') : false,
						maxDate = $input.attr('max') ? $input.attr('max') : false,
						classes = $input.attr('class'),
						value = $input.val(),
						placeholder = $input.attr('placeholder'),
						$fakeInput = $('<input />', {
							'type': 'text',
							'class': classes
						});
					if (value.length > 0) {
						var fakeValue = value.toString().split('-');
						fakeValue = fakeValue[2] + '/' + fakeValue[1] + '/' + fakeValue[0];
						$fakeInput.val(fakeValue);
					}
					if (placeholder) {
						$fakeInput.attr('placeholder', placeholder);
					}
					// are min and max attributes set?
					if (minDate) {
						minDate = minDate.toString().split('-');
						minDate = minDate[2] + '/' + minDate[1] + '/' + minDate[0];
					}
					if (maxDate) {
						maxDate = maxDate.toString().split('-');
						maxDate = maxDate[2] + '/' + maxDate[1] + '/' + maxDate[0];
					}
					$input.after($fakeInput).hide();
					var inModal = $input.closest('.modal').length;
					var appendTo = inModal ? '.modal' : 'body';
					$fakeInput.datepicker({
						forceParse: true,
						format: 'dd/mm/yyyy',
						startDate: minDate,
						endDate: maxDate,
						append: appendTo
					}).on('changeDate', function() {
						var newVal = $fakeInput.val();
						if (newVal.length > 0) {
							newVal = newVal.toString().split('/');
							newVal = newVal[2] + '-' + newVal[1] + '-' + newVal[0];
							$input.val(newVal);
						}
					});
					$fakeInput.addClass('processed');
				});
			}
		}
	});
	$.subscribe('pageReady ajaxLoaded', function() {
		bb.styleDatepicker.init();
	});
}(jQuery));
