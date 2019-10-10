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
var isAnonymous = null;
var uid = null;
var errorCode = null;
var errorMessage = null;
var errored = false;
var signedIn = false;
var reCAPTCHA_ready = false;

var deploy_mode = 'debug'; // Switch between debug and production modes at will

function onrecaptchaload() {
	reCAPTCHA_ready = true;
}

function onSubmit(token) {
	reCAPTCHA_token = token;
}

window.onload = function () {

	// Console control
	if (deploy_mode === 'production') {
		this.setTimeout(function () {
			console.clear();
			console.log('%c Please don\'t copy or break our code!', 'background-color:#222222; color:#AAAA00; font-weight:bold;');
			console.log('%c Also do visit https://theneighborhood.website/', 'background-color:#222222; color:#BADA55; font-weight:bold;');
			if (reCAPTCHA_ready) console.log('%c This site is protected by reCAPTCHA.', 'background: #001AFA; color: #FFFFFF ; font-weight:bold;');
			console.log = function () { }; // Disables console logs
			console.warn = function () { }; // Disables console warnings
			console.error = function () { }; // Disables console errors
		}, 2000);
	}
	else if (this.deploy_mode === 'debug') {
		this.setTimeout(function () {
			console.clear();
			console.log('%c You are in development mode!', 'background-color:#777777; color:#AA0000;');
			if (reCAPTCHA_ready) console.log('%c This site is protected by reCAPTCHA.', 'background: #001AFA; color: #FFFFFF ; font-weight:bold;');
		}, 2000);
	}

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
							// Sign in anonymously to perform firestore and storage transactions
							firebase.auth().signInAnonymously().catch(function (error) {
								errorCode = error.code;
								errorMessage = error.message;
								errorerd = true;
							});
							firebase.auth().onAuthStateChanged(function (user) {
								if (user) {
									isAnonymous = user.isAnonymous;
									uid = user.uid;
									signedIn = true;
									// Check if user profile exists and then branch flow of code.
									var db = firebase.firestore();
									db.collection('chhota-bheem').doc('customer-data').collection('profiles').where('email', '==', email).get().then(function (querySnapshot) {
										var testBool = false;
										var docId = null;
										querySnapshot.forEach(function (doc) {
											if (doc.data().email == email) {
												testBool = true;
												docId = doc.id;
											}
											else {
												testBool = false;
											}
										});
										if (testBool) {
											// Prepare user profile data on firebase and proceed to payment
											db.collection('chhota-bheem').doc('customer-data').collection('profiles').doc(docId).update({
												first_name: first_name,
												last_name: last_name,
												gender: gender,
												phone: phone,
												email: email,
												birthday: birthday
											}).then(function (doc) {
												$.get('https://us-central1-theneighbor-hood.cloudfunctions.net/createOrder?email=' + email + '&amount=' + price, function (data, status) {
													if (data) {
														var order_id = data.order_id;
														var docId = data.docId;
														$.get('https://us-central1-theneighbor-hood.cloudfunctions.net/processPayment?amount=' + price * 100 + '&order_id=' + order_id, function (data, status) {
															var razorpay = new Razorpay(options = {
																"key": "rzp_test_SwmUgymsMwyA9o", // Enter the Key ID generated from the Dashboard
																"amount": price * 100, // Amount is in currency subunits. Default currency is INR. Hence, 49900 refers to 49900 paise or INR ₹ 499.
																"currency": "INR",
																"name": "The Neighborhood Bengaluru",
																"description": "Come. Together.",
																"image": "https://theneighborhood.website/resources/images/the_neighborhood_logo.webp",
																"order_id": data,
																"handler": function (response) {
																	if (response) {
																		$.get('https://us-central1-theneighbor-hood.cloudfunctions.net/verifyPayment?razorpay_order_id=' + response.razorpay_order_id + '&razorpay_payment_id=' + response.razorpay_payment_id + '&razorpay_signature=' + response.razorpay_signature, function (data, status) {
																			// Store Razorpay data on Firebase
																			db.collection('chhota-bheem').doc('customer-data').collection('orders').doc(docId).update({
																				razorpay_order_id: response.razorpay_order_id,
																				razorpay_payment_id: response.razorpay_payment_id,
																				razorpay_signature: response.razorpay_signature,
																				order_status: true
																			}).then(function (doc) {
																				// Payment Successful; Handle webpage response
																				process = false;
																				$('input').prop('disabled', false);
																				$('#paymentLoader').hide();
																				M.Modal.getInstance(bookTicketModal).close();
																				setTimeout(function () { window.alert('Payment Successful!'); }, 1000);
																			}).catch(function (error) {
																				console.error(error);
																			});
																		});
																	}
																	else {
																		process = false;
																		$('input').prop('disabled', false);
																		$('#paymentLoader').hide();
																		M.Modal.getInstance(bookTicketModal).close();
																		// Alert user about failed payment
																		alert('Unfortunately, that payment has failed. For any questions/queries, write to info@theneighborhood.in');
																	}
																},
																"prefill": {
																	"name": first_name + ' ' + last_name,
																	"email": email,
																	"contact": phone
																},
																"notes": {
																	"address": "note value"
																},
																"theme": {
																	"color": "#CB3233"
																}
															});
															razorpay.open();
														});
													}
													else {
														console.error('Order creation failed!');
													}
												});
											}).catch(function (error) {
												console.error(error);
												// TODO: Perhaps refresh the page?
											});
										}
										else {
											// Prepare user profile data on firebase and proceed to payment
											db.collection('chhota-bheem').doc('customer-data').collection('profiles').add({
												first_name: first_name,
												last_name: last_name,
												gender: gender,
												phone: phone,
												email: email,
												birthday: birthday
											}).then(function (doc) {
												$.get('https://us-central1-theneighbor-hood.cloudfunctions.net/createOrder?email=' + email + '&amount=' + price, function (data, status) {
													if (data) {
														var order_id = data.order_id;
														var docId = data.docId;
														$.get('https://us-central1-theneighbor-hood.cloudfunctions.net/processPayment?amount=' + price * 100 + '&order_id=' + order_id, function (data, status) {
															var razorpay = new Razorpay(options = {
																"key": "rzp_test_SwmUgymsMwyA9o", // Enter the Key ID generated from the Dashboard
																"amount": price * 100, // Amount is in currency subunits. Default currency is INR. Hence, 49900 refers to 49900 paise or INR ₹ 499.
																"currency": "INR",
																"name": "The Neighborhood Bengaluru",
																"description": "Come. Together.",
																"image": "https://theneighborhood.website/resources/images/the_neighborhood_logo.webp",
																"order_id": data,
																"handler": function (response) {
																	if (response) {
																		$.get('https://us-central1-theneighbor-hood.cloudfunctions.net/verifyPayment?razorpay_order_id=' + response.razorpay_order_id + '&razorpay_payment_id=' + response.razorpay_payment_id + '&razorpay_signature=' + response.razorpay_signature, function (data, status) {
																			// Store Razorpay data on Firebase
																			db.collection('chhota-bheem').doc('customer-data').collection('orders').doc(docId).update({
																				razorpay_order_id: response.razorpay_order_id,
																				razorpay_payment_id: response.razorpay_payment_id,
																				razorpay_signature: response.razorpay_signature,
																				order_status: true
																			}).then(function (doc) {
																				// Payment Successful; Handle webpage response
																				process = false;
																				$('input').prop('disabled', false);
																				$('#paymentLoader').hide();
																				M.Modal.getInstance(bookTicketModal).close();
																				setTimeout(function () { window.alert('Payment Successful!'); }, 1000);
																			}).catch(function (error) {
																				console.error(error);
																			});
																		});
																	}
																	else {
																		process = false;
																		$('input').prop('disabled', false);
																		$('#paymentLoader').hide();
																		M.Modal.getInstance(bookTicketModal).close();
																		// Alert user about failed payment
																		alert('Unfortunately, that payment has failed. For any questions/queries, write to info@theneighborhood.in');
																	}
																},
																"prefill": {
																	"name": first_name + ' ' + last_name,
																	"email": email,
																	"contact": phone
																},
																"notes": {
																	"address": "note value"
																},
																"theme": {
																	"color": "#CB3233"
																}
															});
															razorpay.open();
														});
													}
													else {
														console.error('Order creation failed!');
													}
												});
											}).catch(function (error) {
												console.error(error);
												// TODO: Perhaps refresh the page?
											});
										}
									}).catch(function (error) {
										console.error(error);
									});
								} else {
									signedIn = false;
								}
							});
						}
					}
				});
			});
		}, 1000);
	});

}