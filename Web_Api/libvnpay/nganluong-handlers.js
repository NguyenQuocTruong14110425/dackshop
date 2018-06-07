const { NganLuong } = require('vn-payments');
/* eslint-disable no-param-reassign */
const TEST_CONFIG = NganLuong.TEST_CONFIG;
const nganluongconfig = new NganLuong({
	paymentGateway: TEST_CONFIG.paymentGateway,
	merchant: TEST_CONFIG.merchant,
	receiverEmail: TEST_CONFIG.receiverEmail,
	secureSecret: TEST_CONFIG.secureSecret,
});


class NganLuongHandler {
	constructor() { }
	
 checkoutNganLuong(req, res) {
	const checkoutData = res.locals.checkoutData;
	checkoutData.returnUrl = `http://${req.headers.host}/payment/nganluong/callback`;
	checkoutData.cancelUrl = `http://${req.headers.host}/`;
	checkoutData.orderInfo = 'Thanh toan giay adidas';
	checkoutData.locale = checkoutData.locale === 'en' ? 'en' : 'vi';
	checkoutData.paymentType = '1';
	checkoutData.totalItem = '1';
	return nganluongconfig.buildCheckoutUrl(checkoutData).then(checkoutUrl => {
		console.log("test url")
		// res.locals.checkoutUrl = checkoutUrl;
		return checkoutUrl;
	});
}

 callbackNganLuong(req, res) {
	console.log("callbackNganLuong")
	const query = req.query;
	console.log(query)
	return nganluongconfig.verifyReturnUrl(query).then(results => {
		if (results) {
			res.locals.email = results.customerEmail;
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
module.exports = new NganLuongHandler();
