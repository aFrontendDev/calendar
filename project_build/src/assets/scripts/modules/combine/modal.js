/**
 * @file Modal
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
				self.modal = '.modal';
				self.modalBackground = '.modal-background';
				self.modalContent = '.modal-content';
				self.modalInner = '.modal-inner';
				self.modalIn = 'modal-in';
				self.fadeSpeed = 200;
				self.$handle.on('click', function(e) {
					var el = $(this);

					e.preventDefault();

					self.openModal(el);
				});

				self.$closeHandle.on('click', function(e) {
					e.preventDefault();
					self.closeModal();
				});
			},
			openModal: function(el) {
				var self = this;
				var getContent = el.find(self.modalContent).html();

				$(self.modalInner).html(getContent);
				$(self.modalBackground).addClass(self.modalIn).fadeTo(self.fadeSpeed, 1, function() {

					$(self.modal).addClass(self.modalIn).fadeTo(self.fadeSpeed, 1);
				});

				//JWPLAYER INTEGRATION
				if (el.data() && el.data().videoId) {

					var videoId = el.data().videoId;
					//clone setup options otherwise JWplayer mangles them for second time click
					var videoSetup = JSON.parse(JSON.stringify(el.data().videoSetup));
					$(self.modalInner)
						.addClass('video-modal')
						.html($('<div/>', {
							id: videoId
						}));





					window.jwplayer(videoId).setup(videoSetup);
				}
			},
			closeModal: function() {
				var self = this;
				$(self.modal).fadeOut(self.fadeSpeed, function() {
					$(self.modal).removeClass(self.modalIn);
					$(self.modalInner).html('').removeClass('video-modal');
					$(self.modalBackground).fadeOut(self.fadeSpeed, function() {
						$(self.modalBackground).removeClass(self.modalIn);
					});
				});


			}
		}
	});
	$.subscribe('pageReady', function() {
		bb.modal.init();
	});
}(jQuery));
