var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		styleFile: {
			processedClass: 'processed',
			replaceClass: 'file-replace',
			btnClass: 'file-replace-btn',
			textClass: 'file-replace-text',
			btnText: 'Choose File',
			textText: 'No file chosen',
			init: function() {
				if (!Modernizr.opacity) {
					return;
				}
				var self = this,
					$files = $('input[type=file]:not(.' + self.processedClass + ')'),
					$wrapper = $('<span />', {
						'class': self.replaceClass
					}),
					$btn = $('<label />', {
						'type': 'button',
						'class': self.btnClass
					}),
					$text = $('<label />', {
						'class': self.textClass
					});
				// loop over each input and add new objects
				$files.each(function() {
					var $file = $(this),
						id = $file.attr('id'),
						btnText = $file.data('btn-text') ? $file.data('btn-text') : self.btnText,
						labelText = $file.data('label-text') ? $file.data('label-text') : self.labelText;
					// if id does not exist, generate one
					if (!id) {
						id = Math.floor((Math.random() * 1000) + 1);
					}
					// clone the object and add id's
					var $fileWrapper = $wrapper.clone(),
						$fileBtn = $btn.clone(),
						$fileText = $text.clone();
					// update objects with attributes
					$fileWrapper.attr({
						'id': 'file_wrap_' + id
					});
					$fileBtn.attr({
						'id': 'file_btn_' + id,
						'for': id
					}).text(btnText);
					$fileText.attr({
						'id': 'file_text_' + id,
						'for': id
					}).text(labelText);
					// wrap file input
					$file.addClass(self.processedClass).wrap($fileWrapper);
					// add filename text
					$file.after($fileText);
					// add replacemnet btn
					$file.after($fileBtn);
					// store objects on the file input
					$file.data({
						'btn': $fileBtn,
						'text': $fileText,
						'nofile-text': labelText
					});
				});
				// on change of the file input
				$files.on('change.styleFile', function() {
					var $file = $(this),
						$fileText = $file.data('text'),
						fileValue = $file.val(),
						filename = fileValue.split('\\').pop();
					if (!filename.length) {
						filename = $file.data('nofile-text');
					}
					// update the file text
					$fileText.text(filename);
				});
				// trigger click
				$('.' + self.replaceClass).on('click.styleFile', function() {
					var $this = $(this),
						$file = $this.find('input[type=file]');
					$file.trigger('mousedown');
				});
			}
		}
	});
	$.subscribe('pageReady ajaxLoaded', function() {
		bb.styleFile.init();
	});
}(jQuery));
