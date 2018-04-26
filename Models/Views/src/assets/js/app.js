		$(function() {
			cbpHorizontalMenu.init();
		});
		$(function() {
			var demo1 = $("#slider1").slippry({
				transition: 'fade',
				useCSS: true,
				speed: 1000,
				pause: 3000,
				auto: true,
				preload: 'visible',
				autoHover: false
			});
			$('.init').click(function () {
				demo1 = $("#slider1").slippry();
				return false;
			});
		});