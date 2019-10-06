const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//exports.helloWorld = functions.https.onRequest((request, response) => {
//	response.send("Hello from Firebase!");
//});
const rp = require('request-promise');
const cors = require('cors')({ origin: true });

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