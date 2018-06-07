const { VNPay } = require('vn-payments');

/* eslint-disable no-param-reassign */
const TEST_CONFIG = VNPay.TEST_CONFIG;
const vnpayconfig = new VNPay({
	paymentGateway: TEST_CONFIG.paymentGateway,
	merchant: TEST_CONFIG.merchant,
	secureSecret: TEST_CONFIG.secureSecret,
});
class VNPayHandler {
	constructor() { }
	checkoutVNPay(req, res) {
		const checkoutData = res.locals.checkoutData;

		checkoutData.returnUrl = `http://${req.headers.host}/payment/vnpay/callback`;
		checkoutData.orderInfo = 'Thanh toan giay adidas';
		checkoutData.orderType = 'fashion';
		console.log(vnpayconfig)
		console.log("next step 2")
		return vnpayconfig.buildCheckoutUrl(checkoutData).then(checkoutUrl => {
		console.log("test check out vnpay")
			return checkoutUrl;
		});
	}

	callbackVNPay(req, res) {
		const query = req.query;

		return vnpayconfig.verifyReturnUrl(query).then(results => {
			if (results) {
				res.locals.email = 'tu.nguyen@naustud.io';
				res.locals.orderId = results.transactionId || '';
				res.locals.price = results.amount;
				res.locals.isSucceed = results.isSuccess;
				res.locals.message = results.message;
			} else {
				res.locals.isSucceed = false;
			}
		});
	}
}
module.exports = new VNPayHandler();
