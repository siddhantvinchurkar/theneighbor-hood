var reCAPTCHA_token = null;
var ipAddress = null;
var reCAPTCHA_verified = false;

function onrecaptchaload() {
	console.log('%c This site is protected by reCAPTCHA.', 'background: #001AFA; color: #FFFFFF ; font-weight:bold;');
}

function onSubmit(token) {
	reCAPTCHA_token = token;
}

window.onload = function () {

	// Set footer date
	$('#footerYear').html(new this.Date().getFullYear());

	// Initialize materialize components
	//$('.parallax').parallax();
	$('.modal').modal({ dismissible: false });

	$('#proceedToPay').click(function () {
		$('#proceedToPay').addClass('disabled');
		$('#paymentLoader').show();
		grecaptcha.execute();
		setTimeout(function () {
			$.get('https://api.ipify.org', function (data) {
				ipAddress = data;
				$.get('https://us-central1-theneighbor-hood.cloudfunctions.net/checkRecaptcha', {
					"response": reCAPTCHA_token,
					"remoteip": ipAddress
				}, function (data, status) {
					if (status == 'success') {
						if (data == 'You\'re good to go, human.') {
							reCAPTCHA_verified = true;
							// Invalidate reCAPTCHA after two miunutes.
							setTimeout(function () { reCAPTCHA_verified = false }, 120000);
						}
					}
				});
			});
		}, 1000);
	});

}