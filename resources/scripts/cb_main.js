var reCAPTCHA_token = null;
var ipAddress = null;
var reCAPTCHA_verified = false;
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var days = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
var first_name = null;
var last_name = null;
var email = null;
var phone = null;
var gender = 'male';
var coupon_code = null;
var birthday = new Date();
var date = new Date();
var quantity = 1;
var price = 499;
var process = false;
var coupon_codes = ['TNBCB4321', 'TNBCB5419', 'TNBCB4322'];

function onrecaptchaload() {
	console.log('%c This site is protected by reCAPTCHA.', 'background: #001AFA; color: #FFFFFF ; font-weight:bold;');
}

function onSubmit(token) {
	reCAPTCHA_token = token;
}

window.onload = function () {

	// Set footer date
	$('#footerYear').html(new this.Date().getFullYear());

	// Date three years ago
	var tempdate = new this.Date();
	tempdate.setFullYear(tempdate.getFullYear() - 3);

	// Set birthday field label
	$('#birthday_label').html('If you were born after ' + weekdays[tempdate.getDay()] + ' ' + months[tempdate.getMonth()] + ' ' + days[tempdate.getDate()] + ', ' + tempdate.getFullYear() + ', you don\'t need a ticket. Entry is free for children below 3 years of age.');

	// Initialize materialize components
	$('.parallax').parallax();
	$('.modal').modal({ dismissible: false });
	$('.datepicker#date').datepicker({ container: 'body', minDate: new this.Date('October 25 2019 06:59:59 GMT+0530'), maxDate: new this.Date('October 29 2019 06:59:59 GMT+0530'), defaultDate: new this.Date('October 25 2019 06:59:59 GMT+0530'), setDefaultDate: true, format: 'mmmm dd, yyyy', onSelect: function (thisdate) { date_poll(thisdate); } });
	$('.datepicker#birthday').datepicker({ container: 'body', maxDate: tempdate, defaultDate: tempdate, setDefaultDate: true, format: 'mmmm dd, yyyy', onSelect: function (thisdate) { birthday_poll(thisdate); } });
	$('input#phone, input#coupon_code').characterCounter();

	// Poll input fields
	var first_name_poll = this.setInterval(function () {
		first_name = $('#first_name').val();
	}, 500);
	var last_name_poll = this.setInterval(function () {
		last_name = $('#last_name').val();
	}, 500);
	var email_poll = this.setInterval(function () {
		email = $('#email').val();
	}, 500);
	var phone_poll = this.setInterval(function () {
		phone = $('#phone').val();
	}, 500);
	var gender_poll = this.setInterval(function () {
		$("input[name='gender']").each(function () {
			if (this.checked) gender = this.value;
		});
	}, 500);
	var coupon_code_poll = this.setInterval(function () {
		coupon_code = $('#coupon_code').val();
	}, 500);
	function birthday_poll(thisdate) {
		birthday = thisdate;
	}
	function date_poll(thisdate) {
		date = thisdate;
	}
	var quantity_poll = this.setInterval(function () {
		quantity = parseInt($('#quantity').html());
		//Calculate total price
		$('#price').html(quantity * 499);
	}, 500);
	var price_poll = this.setInterval(function () {
		price = parseInt($('#price').html());
	}, 500);
	var validation_poll = this.setInterval(function () {
		var data_validity = false;
		if (!(coupon_codes.indexOf(coupon_code) > -1) && coupon_code.length == 9) {
			$('#coupon_code').val('0');
			$('#first_name').focus();
			$('#coupon_code').val('');
			$('#coupon_code').focus();
		}
		if (!process && (first_name !== null || first_name !== '') && email.match('[a-z0-9._%+-]+@+[a-z]+.+[a-z]') !== null && phone.length == 10 && (gender !== null || gender !== '') && (coupon_code.length == 9 || coupon_code == null || coupon_code == '') && (coupon_codes.indexOf(coupon_code) > -1 || coupon_code == null || coupon_code == '')) {
			data_validity = true;
			$('#proceedToPay').removeClass('disabled');
		}
		else {
			data_validity = false;
			$.each($('#proceedToPay').attr('class').split(/\s+/), function (index, item) {
				if (item === 'disabled') {
					// Do Nothing! B)
				}
				else {
					$('#proceedToPay').addClass('disabled');
				}
			});
		}
	}, 500);

	// Handle button clicks

	$('#plus_1').click(function () {
		$('#quantity').html(parseInt($('#quantity').html()) + 1);
		if (parseInt($('#quantity').html()) > 1) {
			try {
				$('#minus_1').removeClass('disabled');
			} catch{
				// Do nothing here! B)
			}
		}
		else {
			$('#minus_1').addClass('disabled');
		}
	});
	$('#minus_1').click(function () {
		if (parseInt($('#quantity').html()) > 1) $('#quantity').html(parseInt($('#quantity').html()) - 1);
		else $('#quantity').html(1);
		if (parseInt($('#quantity').html()) > 1) {
			try {
				$('#minus_1').removeClass('disabled');
			} catch{
				// Do nothing here! B)
			}
		}
		else {
			$('#minus_1').addClass('disabled');
		}
	});

	$('#proceedToPay').click(function () {
		process = true;
		$('#proceedToPay').addClass('disabled');
		$('input').prop('disabled', true);
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
							// Store data on firebase and proceed to payment
							// TODO: Store data on Firebase and integrate payment API. On successful payment execute the following three lines of code:
							process = false;
							$('input').prop('disabled', false);
							$('#paymentLoader').hide();
						}
					}
				});
			});
		}, 1000);
	});

}