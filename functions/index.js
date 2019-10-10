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