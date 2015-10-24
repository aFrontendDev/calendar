/**
 * @file Modal module
 * @author {@link https://github.com/buildingblocks Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Modal related methods.
		 * @namespace modal
		 */
		modal: {
			$handle: null,
			$closeHandle: null,
			modal: null,
			modalBackground: null,
			modalContent: null,
			modalInner: null,
			modalIn: null,
			init: function() {
				var self = this;
				self.$handle = $('.js-modal-open');
				self.$closeHandle = $('.js-modal-close');
				self.$modal = $('.modal');
				self.$modalBackground = $('.modal-background');
				self.$modalContent = $('.modal-content');
				self.$modalInner = $('.modal-inner');
				self.$modalInnerContent = $('.modal-inner-content');
				self.modalFilter = '.modal-filter';
				self.modalIn = 'modal-in';
				self.modalShow = 'modal-show';
				self.fadeSpeed = 200;

				self.$handle.on('click', function(event) {
					event.preventDefault();

					var el = $(this),
						altModal = el.attr('data-modal-image-only');

					if (altModal) {
						var dataImgSrc = el.attr('data-modal-img-src'),
							dataImgAlt = el.attr('data-modal-img-alt');

						if ((!dataImgSrc || dataImgSrc.length < 1)) {
							return;
						}

						self.imageTemplate(dataImgSrc, dataImgAlt);
					} else {
						self.getContent(el);
					}
				});

				// close handle
				self.$closeHandle.on('click', function(event) {
					event.preventDefault();
					self.closeModal();
				});

				// close when esc pressed
				bb.settings.$body.on('keydown', function(event) {
					var code = event.keyCode ? event.keyCode : event.which;
					if (code === 27 && self.modalIn) {
						self.closeModal();
						event.preventDefault();
					}
				});
			},
			openModal: function() {
				var self = this;

				bb.scrollLock.lock();

				// add in classes
				self.$modalBackground.addClass(self.modalIn);
				self.$modal.addClass(self.modalIn);

				// add show classes
				self.setTimerA = setTimeout(function() {
					self.$modalBackground.addClass(self.modalShow);
					clearTimeout(self.setTimerA);
				}, 100);

				self.setTimerB = setTimeout(function() {
					self.$modal.addClass(self.modalShow);
					clearTimeout(self.setTimerB);
				}, 200);
			},
			getContent: function(el) {
				var self = this,
					$this = $(this),
					url = el.attr('data-endpoint'); // uses attr so values are not cached

				// check for ajax data-modal
				if (el.data('modal') === true) {
					// load ajax content
					self.modalWait = setTimeout(function() {

						$.ajax({
							url: url,
							type: 'get',
							dataType: 'html',
							cache: false,
							timeout: bb.settings.globalTimeout,
							success: function(response, status, jqXHR) {

								if (!url) {
									window.location.href = url;
								}

								// filter the HTML
								var $response = $('<div />').html(response),
									getAjaxContent = $response.find(self.modalFilter).html();

								self.$modalInnerContent.html(getAjaxContent);

								self.openModal();
							},
							error: function(xhr) {
								console.log(xhr.responseText);
							}
						}).done(function() {
							//
						});
						clearTimeout(self.modalWait);
					}, 100);

				} else {
					// get html
					var getContent = el.find(self.$modalContent).html();

					// load html
					self.$modalInnerContent.html(getContent);

					self.openModal();
				}
			},
			imageTemplate: function(imgSrc, imgAlt) {
				var self = this;

				var $template = $('<img />', {
					'src': imgSrc,
					'alt': imgAlt || ""
				});

				self.$modalInnerContent.html($template);
				self.openModal();
			},
			closeModal: function() {
				var self = this;

				self.$modalBackground.removeClass(self.modalShow);
				self.$modal.removeClass(self.modalShow);
				self.setTimer = setTimeout(function() {
					self.$modalBackground.removeClass(self.modalIn);
					self.$modal.removeClass(self.modalIn);
					self.$modalInnerContent.html(null);
					clearTimeout(self.setTimer);
				}, 300);

				bb.scrollLock.unlock();
			}
		}
	});
	$.subscribe('pageReady ajaxLoaded', function() {
		bb.modal.init();
	});
}(jQuery));
