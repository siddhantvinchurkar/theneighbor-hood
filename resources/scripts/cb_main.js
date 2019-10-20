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
var coupon_codes = [];
var isAnonymous = null;
var uid = null;
var errorCode = null;
var errorMessage = null;
var errored = false;
var signedIn = false;
var reCAPTCHA_ready = false;
var coupon_snapshot = null;
var video_control = false;

var deploy_mode = 'production'; // Switch between debug and production modes at will

function onrecaptchaload() {
	reCAPTCHA_ready = true;
}

function onSubmit(token) {
	reCAPTCHA_token = token;
}

window.onload = function () {

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.register('sw.js')
			.then(function () { console.log('%c Service worker up and running.', 'background: #222222; color: #BADA55 ; font-weight:bold;'); });
	}

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
			//console.clear();
			console.log('%c You are in development mode!', 'background-color:#777777; color:#AA0000;');
			if (reCAPTCHA_ready) console.log('%c This site is protected by reCAPTCHA.', 'background: #001AFA; color: #FFFFFF ; font-weight:bold;');
		}, 2000);
	}

	// Fetch coupon codes
	var firestore = firebase.firestore();
	firestore.collection('chhota-bheem').doc('admin-data').collection('coupon-codes').onSnapshot(function (querySnapshot) {
		coupon_snapshot = querySnapshot;
		querySnapshot.forEach(function (doc) {
			if (doc.data().valid) coupon_codes.push(doc.data().coupon_code);
		});
	});

	// Play video if loaded
	setTimeout(function () {
		if ($(this).width() > 1280) {
			$('#header-video').show();
			$('#header-banner').hide();
		}
	}, 3000);
	$(window).on('resize', function () {
		$('#video-id').width($(window).width());
		if ($(this).width() < 1280) {
			$('#header-video').hide();
			$('#header-banner').show();
			$('#video-id').trigger('pause');
		}
		else if ($(this).width() >= 1280) {
			$('#header-video').show();
			$('#header-banner').hide();
			$('#video-id').trigger('play');
		}
	});
	document.getElementById('video-id').ontimeupdate = function () {
		if (document.getElementById('video-id').currentTime > 89.9) {
			$('#video-id').trigger('pause');
			$('#header-video').hide();
			$('#header-banner').show();
		}
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
	$('.datepicker#birthday').datepicker({ container: 'body', maxDate: tempdate, defaultDate: tempdate, setDefaultDate: true, format: 'mmmm dd, yyyy', yearRange: [1930, 2016], onSelect: function (thisdate) { birthday_poll(thisdate); } });
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
		// Check if a coupon code was used
		if (coupon_codes.includes(coupon_code)) {
			coupon_snapshot.forEach(function (doc) {
				if (doc.data().coupon_code == coupon_code) {
					if (doc.data().type == 'single' || doc.data().type == 'timed') {
						if (doc.data().valid) { $('#price').html(parseInt($('#price').html()) - doc.data().value); }
					}
				}
			});
		}
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
		if (!process && (first_name !== null || first_name !== '') && email.match('[a-z0-9._%+-]+@+[a-z]+.+[a-z]') !== null && phone.length == 10 && (gender !== null || gender !== '') && (coupon_code.length == 9 || coupon_code == null || coupon_code == '') && (coupon_codes.indexOf(coupon_code) > -1 || coupon_code == null || coupon_code == '') && (coupon_codes.includes(coupon_code) || coupon_code == null || coupon_code == '')) {
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
						if (data == 'You\'re good to go, human.' || data == 'Recaptcha verification failed. Are you a robot?') {
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
								if (user || !user) {
									if (user) isAnonymous = user.isAnonymous;
									if (user) uid = user.uid;
									signedIn = true;
									// Check if user profile exists and then branch flow of code.
									var db = firebase.firestore();
									//console.log(email);
									db.collection('chhota-bheem').doc('customer-data').collection('profiles').where('email', '==', email).get().then(function (querySnapshot) {
										var testBool = false;
										var docId = null;
										try {
											querySnapshot.forEach(function (doc) {
												if (doc.data().email == email) {
													testBool = true;
													docId = doc.id;
												}
												else {
													testBool = false;
												}
											});
										} catch (error) {
											console.error(error);
										}
										if (testBool) {
											if (price == 0) {
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
															var docId = data.docId;
															db.collection('chhota-bheem').doc('customer-data').collection('orders').doc(docId).update({
																order_status: true,
																coupon_used: coupon_code
															}).then(function (doc) {
																db.collection('chhota-bheem').doc('admin-data').collection('coupon-codes').where('coupon_code', '==', coupon_code).get().then(function (querySnapshot) {
																	querySnapshot.forEach(function (doc) {
																		if (doc.data().type == 'single') {
																			db.collection('chhota-bheem').doc('admin-data').collection('coupon-codes').doc(doc.id).update({
																				valid: false
																			}).then(function (doc) {
																				// Payment Successful; send out transactional email
																				$.get('https://us-central1-theneighbor-hood.cloudfunctions.net/sendEmail?email=' + email + '&amount=' + (price + 499) * quantity + '&qr=' + docId + '&phone=' + phone + '&name=' + first_name, function (data, status) {
																					if (data === 'Email Sent!') {
																						// Process complete; handle webpage response
																						process = false;
																						$('input').prop('disabled', false);
																						$('#paymentLoader').hide();
																						M.Modal.getInstance(bookTicketModal).close();
																						setTimeout(function () {
																							Swal.fire(
																								'Payment Successful!',
																								'Transaction Reference: <b>' + docId + '</b>',
																								'success'
																							);
																						}, 1000);
																					}
																					else {
																						console.error('Email not sent!');
																					}
																				});
																			}).catch(function (error) {
																				console.error(error);
																			});
																		}
																		else {
																			// Payment Successful; send out transactional email
																			$.get('https://us-central1-theneighbor-hood.cloudfunctions.net/sendEmail?email=' + email + '&amount=' + (price + 499) * quantity + '&qr=' + docId + '&phone=' + phone + '&name=' + first_name, function (data, status) {
																				if (data === 'Email Sent!') {
																					// Process complete; handle webpage response
																					process = false;
																					$('input').prop('disabled', false);
																					$('#paymentLoader').hide();
																					M.Modal.getInstance(bookTicketModal).close();
																					setTimeout(function () {
																						Swal.fire(
																							'Payment Successful!',
																							'Transaction Reference: <b>' + docId + '</b>',
																							'success'
																						);
																					}, 1000);
																				}
																				else {
																					console.error('Email not sent!');
																				}
																			});
																		}
																	});
																}).catch(function (error) {
																	console.error(error);
																});
															}).catch(function (error) {
																console.error(error);
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
																	/* "key": "rzp_test_SwmUgymsMwyA9o", // Test Key ID */
																	"key": "rzp_live_yXMkn5hXpjV3Rx", // Live Key ID */
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
																					order_status: true,
																					coupon_used: coupon_code
																				}).then(function (doc) {
																					// Payment Successful; send out transactional email
																					$.get('https://us-central1-theneighbor-hood.cloudfunctions.net/sendEmail?email=' + email + '&amount=' + price + '&qr=' + docId + '&phone=' + phone + '&name=' + first_name, function (data, status) {
																						if (data === 'Email Sent!') {
																							if (coupon_code.length == 9 && parseInt(coupon_code) > 8000) {
																								db.collection('chhota-bheem').doc('admin-data').collection('coupon-codes').where('coupon_code', '==', coupon_code).get().then(function (querySnapshot) {
																									querySnapshot.forEach(function (doc) {
																										if (doc.data().valid) {
																											if (doc.data().type == 'cashback') {
																												var vall = doc.data().value;
																												db.collection('chhota-bheem').doc('customer-data').collection('profiles').where('email', '==', email).get().then(function (querySnapshot) {
																													querySnapshot.forEach(function (doc) {
																														db.collection('chhota-bheem').doc('customer-data').collection('profiles').doc(doc.id).update({
																															wallet: parseInt(vall)
																														}).then(function (doc) {
																															// Process complete; handle webpage response
																															process = false;
																															$('input').prop('disabled', false);
																															$('#paymentLoader').hide();
																															M.Modal.getInstance(bookTicketModal).close();
																															setTimeout(function () {
																																Swal.fire(
																																	'Payment Successful!',
																																	'Transaction Reference: <b>' + docId + '</b>',
																																	'success'
																																);
																															}, 1000);
																														}).catch(function (error) {
																															console.error(error);
																														});
																													});
																												}).catch(function (error) {
																													console.error(error);
																												});
																											}
																											else {
																												// Process complete; handle webpage response
																												process = false;
																												$('input').prop('disabled', false);
																												$('#paymentLoader').hide();
																												M.Modal.getInstance(bookTicketModal).close();
																												setTimeout(function () {
																													Swal.fire(
																														'Payment Successful!',
																														'Transaction Reference: <b>' + docId + '</b>',
																														'success'
																													);
																												}, 1000);
																											}
																										}
																									});
																								}).catch(function (error) {
																									console.error(error);
																								});
																							}
																							else {
																								// Process complete; handle webpage response
																								process = false;
																								$('input').prop('disabled', false);
																								$('#paymentLoader').hide();
																								M.Modal.getInstance(bookTicketModal).close();
																								setTimeout(function () {
																									Swal.fire(
																										'Payment Successful!',
																										'Transaction Reference: <b>' + docId + '</b>',
																										'success'
																									);
																								}, 1000);
																							}
																						}
																						else {
																							console.error('Email not sent!');
																						}
																					});
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
										}
										else {
											if (price == 0) {
												// Prepare user profile data on firebase and proceed to payment
												db.collection('chhota-bheem').doc('customer-data').collection('profiles').add({
													first_name: first_name,
													last_name: last_name,
													gender: gender,
													phone: phone,
													email: email,
													birthday: birthday
												}).then(function (doc) {
													$.get('https://us-central1-theneighbor-hood.cloudfunctions.net/createOrder?email=' + email + '&amount=' + (price + 499) * quantity, function (data, status) {
														if (data) {
															var docId = data.docId;
															db.collection('chhota-bheem').doc('customer-data').collection('orders').doc(docId).update({
																order_status: true
															}).then(function (doc) {
																db.collection('chhota-bheem').doc('admin-data').collection('coupon-codes').where('coupon_code', '==', coupon_code).get().then(function (querySnapshot) {
																	querySnapshot.forEach(function (doc) {
																		if (doc.data().type == 'single') {
																			db.collection('chhota-bheem').doc('admin-data').collection('coupon-codes').doc(doc.id).update({
																				valid: false,
																				coupon_used: coupon_code
																			}).then(function (doc) {
																				// Payment Successful; send out transactional email
																				$.get('https://us-central1-theneighbor-hood.cloudfunctions.net/sendEmail?email=' + email + '&amount=' + (price + 499) * quantity + '&qr=' + docId + '&phone=' + phone + '&name=' + first_name, function (data, status) {
																					if (data === 'Email Sent!') {
																						// Process complete; handle webpage response
																						process = false;
																						$('input').prop('disabled', false);
																						$('#paymentLoader').hide();
																						M.Modal.getInstance(bookTicketModal).close();
																						setTimeout(function () {
																							Swal.fire(
																								'Payment Successful!',
																								'Transaction Reference: <b>' + docId + '</b>',
																								'success'
																							);
																						}, 1000);
																					}
																					else {
																						console.error('Email not sent!');
																					}
																				});
																			}).catch(function (error) {
																				console.error(error);
																			});
																		}
																		else {
																			// Payment Successful; send out transactional email
																			$.get('https://us-central1-theneighbor-hood.cloudfunctions.net/sendEmail?email=' + email + '&amount=' + (price + 499) * quantity + '&qr=' + docId + '&phone=' + phone + '&name=' + first_name, function (data, status) {
																				if (data === 'Email Sent!') {
																					// Process complete; handle webpage response
																					process = false;
																					$('input').prop('disabled', false);
																					$('#paymentLoader').hide();
																					M.Modal.getInstance(bookTicketModal).close();
																					setTimeout(function () {
																						Swal.fire(
																							'Payment Successful!',
																							'Transaction Reference: <b>' + docId + '</b>',
																							'success'
																						);
																					}, 1000);
																				}
																				else {
																					console.error('Email not sent!');
																				}
																			});
																		}
																	});
																}).catch(function (error) {
																	console.error(error);
																});
															}).catch(function (error) {
																console.error(error);
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
																	"key": "rzp_test_SwmUgymsMwyA9o", // Test Key ID */
																	/* "key": "rzp_live_yXMkn5hXpjV3Rx", // Live Key ID */
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
																					order_status: true,
																					coupon_used: coupon_code
																				}).then(function (doc) {
																					// Payment Successful; send out transactional email
																					$.get('https://us-central1-theneighbor-hood.cloudfunctions.net/sendEmail?email=' + email + '&amount=' + price + '&qr=' + docId + '&phone=' + phone + '&name=' + first_name, function (data, status) {
																						if (data === 'Email Sent!') {
																							if (coupon_code.length == 9 && parseInt(coupon_code) > 8000) {
																								db.collection('chhota-bheem').doc('admin-data').collection('coupon-codes').where('coupon_code', '==', coupon_code).get().then(function (querySnapshot) {
																									querySnapshot.forEach(function (doc) {
																										if (doc.data().valid) {
																											if (doc.data().type == 'cashback') {
																												var vall = doc.data().value;
																												db.collection('chhota-bheem').doc('customer-data').collection('profiles').where('email', '==', email).get().then(function (querySnapshot) {
																													querySnapshot.forEach(function (doc) {
																														db.collection('chhota-bheem').doc('customer-data').collection('profiles').doc(doc.id).update({
																															wallet: parseInt(vall)
																														}).then(function (doc) {
																															// Process complete; handle webpage response
																															process = false;
																															$('input').prop('disabled', false);
																															$('#paymentLoader').hide();
																															M.Modal.getInstance(bookTicketModal).close();
																															setTimeout(function () {
																																Swal.fire(
																																	'Payment Successful!',
																																	'Transaction Reference: <b>' + docId + '</b>',
																																	'success'
																																);
																															}, 1000);
																														}).catch(function (error) {
																															console.error(error);
																														});
																													});
																												}).catch(function (error) {
																													console.error(error);
																												});
																											}
																										}
																									});
																								}).catch(function (error) {
																									console.error(error);
																								});
																							}
																							else {
																								// Process complete; handle webpage response
																								process = false;
																								$('input').prop('disabled', false);
																								$('#paymentLoader').hide();
																								M.Modal.getInstance(bookTicketModal).close();
																								setTimeout(function () {
																									Swal.fire(
																										'Payment Successful!',
																										'Transaction Reference: <b>' + docId + '</b>',
																										'success'
																									);
																								}, 1000);
																							}
																						}
																						else {
																							console.error('Email not sent!');
																						}
																					});
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
