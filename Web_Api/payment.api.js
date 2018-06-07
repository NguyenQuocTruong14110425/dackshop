const   OnePayHandler  = require ('./libvnpay/onepay-handlers'),
        VNPayHandler = require ('./libvnpay/vnpay-handlers'), 
        NganLuongHandler = require ( './libvnpay/nganluong-handlers'), 
        SoHaHandler = require ('./libvnpay/sohapay-handlers')


module.exports = (router) => {

    router.post('/payment/checkout', (req, res) => {
        const userAgent = req.headers['user-agent'];
        console.log('userAgent', userAgent);
    
        const params = Object.assign({}, req.body);
    
        const clientIp =
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            (req.connection.socket ? req.connection.socket.remoteAddress : null);
    
        const amount = parseInt(params.Cart.totalOrder, 10);
        const now = new Date();
    
        // NOTE: only set the common required fields and optional fields from all gateways here, redundant fields will invalidate the payload schema checker
        const checkoutData = {
            amount,
            clientIp: clientIp.length > 15 ? '127.0.0.1' : clientIp,
            locale: 'vn',
            billingCity: params.billingCity || '',
            billingPostCode: params.billingPostCode || '',
            billingStateProvince: params.billingStateProvince || '',
            billingStreet: params.billingStreet || '',
            billingCountry: params.billingCountry || '',
            deliveryAddress: params.billingStreet || '',
            deliveryCity: params.billingCity || '',
            deliveryCountry: params.billingCountry || '',
            currency: 'VND',
            deliveryProvince: params.billingStateProvince || '',
            customerEmail: params.Email,
            customerPhone: params.PhoneNumber,
            orderId: `node-${now.toISOString()}`,
            // returnUrl: ,
            transactionId: `node-${now.toISOString()}`, // same as orderId (we don't have retry mechanism)
            customerId: params.Email,
        };
    
        // pass checkoutData to gateway middleware via res.locals
        res.locals.checkoutData = checkoutData;
    
        // Note: these handler are asynchronous
        let asyncCheckout = null;
        switch (params.paymentMethod) {
            case 'onepayInternational':
		        console.log("test onepayInternational")
                asyncCheckout = OnePayHandler.checkoutOnePayInternational(req, res);
                break;
            case 'onepayDomestic':
		        console.log("test onpay")
                asyncCheckout = OnePayHandler.checkoutOnePayDomestic(req, res);
                break;
            case 'vnPay':
		        console.log("test vn pay")
                asyncCheckout = VNPayHandler.checkoutVNPay(req, res);
                break;
            case 'nganluong':
                // this param is not expected in other gateway
                checkoutData.customerName = `${params.FullName || ''}`.trim();
                checkoutData.paymentMethod = 'ATM_ONLINE';
                checkoutData.bankCode = 'BAB';
		        console.log("test ngan luong pay")
                asyncCheckout = NganLuongHandler.checkoutNganLuong(req, res);
                break;
            case 'nganluongvisa':
                // this param is not expected in other gateway
                checkoutData.customerName = `${params.FullName || ''}`.trim();
                checkoutData.paymentMethod = 'VISA';
		        console.log("test visa pay")
                asyncCheckout = NganLuongHandler.checkoutNganLuong(req, res);
                break;
            case 'sohaPay':
		        console.log("test so ha pay")
                asyncCheckout = SoHaHandler.checkoutSohaPay(req, res);
                break;
            default:
                break;
        }
    
        if (asyncCheckout) {
            asyncCheckout
                .then(checkoutUrl => {
                    console.log(checkoutUrl)
                    // var url = checkoutUrl.href.replace('https:\/\/sandbox.nganluong.vn:8088\/nl30\/checkout\/version31\/index\/token_code\/',"");
                    console.log("conver url")
                    // console.log(url)
                    res.json({ success: true, data: checkoutUrl.href });
                })
                .catch(err => {
                    res.json({ success: false, message: "payment exxx"  });
                });
        } else {
            res.json({ success: false, message: 'Payment method not found' });
        }
    });
    
    router.get('/payment/:gateway/callback', (req, res) => {
        const gateway = req.params.gateway;
        console.log('gateway', req.params.gateway);
        let asyncFunc = null;
    
        switch (gateway) {
            case 'onepaydom':
                asyncFunc = OnePayHandler.callbackOnePayDomestic(req, res);
                break;
            case 'onepayintl':
                asyncFunc = OnePayHandler.callbackOnePayInternational(req, res);
                break;
            case 'vnpay':
                console.log("test vnpay callback")
                asyncFunc = VNPayHandler.callbackVNPay(req, res);
                break;
            case 'sohapay':
                asyncFunc = SoHaHandler.callbackSohaPay(req, res);
                break;
            case 'nganluong':
                asyncFunc = NganLuongHandler.callbackNganLuong(req, res);
                break;
            default:
                break;
        }
    
        if (asyncFunc) {
            asyncFunc.then(() => {
                var DataPayment = {
                    title: `Nau Store Payment via ${gateway.toUpperCase()}`,
                    isSucceed: res.locals.isSucceed,
                    email: res.locals.email,
                    orderId: res.locals.orderId,
                    price: res.locals.price,
                    message: res.locals.message,
                    billingStreet: res.locals.billingStreet,
                    billingCountry: res.locals.billingCountry,
                    billingCity: res.locals.billingCity,
                    billingStateProvince: res.locals.billingStateProvince,
                    billingPostalCode: res.locals.billingPostalCode,
                }
                res.json({ success: true, data: DataPayment });
            });
        } else {
            res.json({ success: false, message: err ? err : mess.AddFail });
        }
    });
    return router;
    
}