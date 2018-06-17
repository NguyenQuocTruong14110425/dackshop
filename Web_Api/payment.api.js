const   OnePayHandler  = require ('./libvnpay/onepay-handlers'),
        VNPayHandler = require ('./libvnpay/vnpay-handlers'), 
        NganLuongHandler = require ( './libvnpay/nganluong-handlers'), 
        SoHaHandler = require ('./libvnpay/sohapay-handlers');
var payconfig = require('./lib/payconfig');


module.exports = (router) => {
    router.post('/payment/checkout', (req, res) => {
        console.log("check")
        var ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    var dateFormat = require('dateformat');
    var tmnCode = payconfig.vnp_TmnCode
    var secretKey = payconfig.vnp_HashSecret
    var vnpUrl = payconfig.vnp_Url
    var returnUrl = payconfig.vnp_ReturnUrl

    var date = new Date();

    var createDate = dateFormat(date, 'yyyymmddHHmmss');
    var orderId = dateFormat(date, 'HHmmss');
    var amount = req.body.Cart.totalOrder
    var bankCode = req.body.paymentMethod;
    
    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = req.body.language;
    if(locale === null || locale === ''){
        locale = 'vn';
    }
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'thanh toan';
    vnp_Params['vnp_OrderType'] = 'fashion';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if(bankCode !== null && bankCode !== ''){
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);
    console.log(vnp_Params)
    var querystring = require('qs');
    var signData = secretKey + querystring.stringify(vnp_Params, { encode: false });

    var md5 = require('md5');
    var secureHash = md5(signData);
    vnp_Params['vnp_SecureHashType'] =  'MD5';
    vnp_Params['vnp_SecureHash'] = secureHash;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: true });
    //Neu muon dung Redirect thi dong dong ben duoi
    console.log(vnpUrl)
    res.status(200).json({code: '00', success: true, data: vnpUrl})
    //Neu muon dung Redirect thi mo dong ben duoi va dong dong ben tren
    //res.redirect(vnpUrl)
    })
    router.get('/vnpay_ipn', function (req, res, next) {
        var vnp_Params = req.query;
        var secureHash = vnp_Params['vnp_SecureHash'];
    
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];
    
        vnp_Params = sortObject(vnp_Params);
        var config = require('config');
        var secretKey = config.get('vnp_HashSecret');
        var querystring = require('qs');
        var signData = secretKey + querystring.stringify(vnp_Params, { encode: false });
        
        var md5 = require('md5');
    
        var checkSum = md5(signData);
    
        if(secureHash === checkSum){
            var orderId = vnp_Params['vnp_TxnRef'];
            var rspCode = vnp_Params['vnp_ResponseCode'];
            //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
            res.status(200).json({RspCode: '00',success: true, message: 'success'})
        }
        else {
            res.status(200).json({RspCode: '97',success: false,  message: 'Fail checksum'})
        }
    });

    router.get('/vnpay_return', function (req, res, next) {
        var vnp_Params = req.query;
    
        var secureHash = vnp_Params['vnp_SecureHash'];
    
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];
    
        vnp_Params = sortObject(vnp_Params);
    
        var config = require('config');
        var tmnCode = payconfig.vnp_TmnCode;
        var secretKey = payconfig.vnp_HashSecret
    
        var querystring = require('qs');
        var signData = secretKey + querystring.stringify(vnp_Params, { encode: false });
    
        var md5 = require('md5');
    
        var checkSum = md5(signData);
    
        if(secureHash === checkSum){
            //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
    
            res.render('success', {code: vnp_Params['vnp_ResponseCode']})
        } else{
            res.render('success', {code: '97'})
        }
    });
    
    router.post('/payment/checkout1', (req, res) => {
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
        
    function sortObject(o) {
        var sorted = {},
            key, a = [];

        for (key in o) {
            if (o.hasOwnProperty(key)) {
                a.push(key);
            }
        }

        a.sort();

        for (key = 0; key < a.length; key++) {
            sorted[a[key]] = o[a[key]];
        }
        return sorted;
    }
    return router;
    
}