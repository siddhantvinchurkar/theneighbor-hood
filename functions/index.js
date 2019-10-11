const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//exports.helloWorld = functions.https.onRequest((request, response) => {
//	response.send("Hello from Firebase!");
//});
const rp = require('request-promise');
const cors = require('cors')({ origin: true });

const Razorpay = require('razorpay');

const crypto = require("crypto");

const admin = require('firebase-admin');
admin.initializeApp();

const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey('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');

const httprequest = require('request');

exports.sendEmail = functions.https.onRequest((request, response) => {
	sendgrid.send({
		to: request.query.email,
		from: 'The Neighborhood <info@theneighborhood.website>',
		templateId: 'd-2fa02122bebb44f6902f16b5ff63fe65',
		substitutionWrappers: ['{{', '}}'],
		dynamic_template_data: {
			"q": parseInt(request.query.amount) / 499,
			"a": parseInt(request.query.amount),
			"qr": request.query.qr
		}
	});
	httprequest('http://login.smsocean.in/api/sendhttp.php?authkey=298008AxJrBBKiB5d9dc199&mobiles=91' + request.query.phone + '&message=Hi%2C%20' + request.query.name + '!%20Welcome%20to%20the%20neighborhood.%20We%20have%20emailed%20you%20your%20passes%20and%20here%20is%20a%20transaction%20reference%20just%20in%20case%3A%20' + request.query.qr + '.&sender=TNBCB&route=4&country=0', function (error, response, body) {
		console.error('error:', error); // Print the error if one occurred
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		console.log('body:', body); // Print the HTML for the Google homepage.
	});
	admin.firestore().collection('chhota-bheem').doc('customer-data').collection('orders').doc(request.query.qr).update({
		email_sent: true
	}).then(() => {
		cors(request, response, () => { response.send('Email Sent!'); });
		return true;
	}).catch(error => {
		console.error(error);
		cors(request, response, () => { response.send('Email Not Sent!'); });
		return true;
	});
});

exports.createOrder = functions.https.onRequest((request, response) => {
	var orderid = 0;
	admin.firestore().collection('chhota-bheem').doc('customer-data').collection('orders').orderBy('order_id', 'desc').get().then(querySnapshot => {
		if (querySnapshot.docs[0].data()) {
			orderid = parseInt(querySnapshot.docs[0].data().order_id) + 1;
			admin.firestore().collection('chhota-bheem').doc('customer-data').collection('orders').add({
				email: request.query.email,
				order_id: orderid,
				order_status: false,
				timestamp: new Date(),
				amount: parseInt(request.query.amount)
			}).then(doc => {
				cors(request, response, () => { response.send({ order_id: orderid, docId: doc.id }); });
				return true;
			}).catch(error => {
				console.error(error);
				cors(request, response, () => { response.send("Error writing data! Check logs for more details."); });
				return true;
			});
		}
		else {
			console.error(error);
			cors(request, response, () => { response.send("Error reading data! Check logs for more details."); });
			return true;
		}
		return true;
	}).catch(error => {
		console.error(error);
		cors(request, response, () => { response.send("Error reading data! Check logs for more details."); });
		return true;
	});
});

exports.verifyPayment = functions.https.onRequest((request, response) => {
	var generated_signature = crypto.createHmac("sha256", 'aVE71WfkSvFW8yfy2sHUygkO').update(request.query.razorpay_order_id + "|" + request.query.razorpay_payment_id).digest("hex");
	if (generated_signature === request.query.razorpay_signature) {
		cors(request, response, () => { response.send("Oh damn! Payment successful."); });
		return true;
	}
	else {
		cors(request, response, () => { response.send("Oops. That payment verification got fucked."); });
		return true;
	}
});

exports.processPayment = functions.https.onRequest((request, response) => {
	var order_status = false;
	var order_details = null;
	var instance = new Razorpay({
		key_id: 'rzp_test_SwmUgymsMwyA9o',
		key_secret: 'aVE71WfkSvFW8yfy2sHUygkO'
	});
	var options = {
		amount: request.query.amount,  // amount in the smallest currency unit (For INR that's paisa; so 49900 ps. = ₹ 499.00)
		currency: "INR",
		receipt: request.query.order_id,	// Razorpay generated order_id
		payment_capture: '0'
	};
	instance.orders.create(options, (err, order) => {
		if (order) {
			console.log(order);
			order_status = true;
			order_details = order;
		}
		else if (err) {
			console.error(err);
			order_status = false;
		}
		if (order_status) {
			cors(request, response, () => { response.send(order_details.id); });
		}
		else if (!order_status) {
			cors(request, response, () => { response.send("Oops. That payment got fucked."); });
		}
	});
});

exports.checkRecaptcha = functions.https.onRequest((req, res) => {
	const response = req.query.response;
	const remoteip = req.query.remoteip;
	console.log("recaptcha response", response);
	console.log("recaptcha remoteip", remoteip);
	rp({
		uri: 'https://recaptcha.google.com/recaptcha/api/siteverify',
		method: 'POST',
		formData: {
			secret: '6LfcJbwUAAAAACKj4qshxdmj20bfzUHwFSdP_npX',
			response: response,
			remoteip: remoteip
		},
		json: true
	}).then(result => {
		console.log("recaptcha result", result)
		if (result.success) {
			cors(req, res, () => { res.send("You're good to go, human."); });
			return true;
		}
		else {
			cors(req, res, () => { res.send("Recaptcha verification failed. Are you a robot?"); });
			return false;
		}
	}).catch(reason => {
		console.log("Recaptcha request failure", reason);
		cors(req, res, () => { res.send("Recaptcha request failed."); });
	})
})