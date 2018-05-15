const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const MongoStore = require('connect-mongo')(session);
const userRouter = require('./Web_Api/user.api')(router);
const productRouter = require('./Web_Api/product.api')(router);
const menuRouter = require('./Web_Api/menu.api')(router);
const branchRouter = require('./Web_Api/branch.api')(router);
const catalogRouter = require('./Web_Api/catalog.api')(router);
const sizeRouter = require('./Web_Api/size.api')(router);
const colorRouter = require('./Web_Api/color.api')(router);
const folderRouter = require('./Web_Api/folder.api')(router);
const imageRouter = require('./Web_Api/image.api')(router);
const shippingRouter = require('./Web_Api/shipping.api')(router);
const promotionRouter = require('./Web_Api/promotion.api')(router);
const orderRouter = require('./Web_Api/order.api')(router);
const cartRouter = require('./Web_Api/cart.api')(router);
const config = require('./Web_Config/database');
var ws = require('nodejs-websocket');
const port = process.env.PORT || 8080;
const angularHostting = config.hosting|| 'http://localhost:4200';
//start connect database
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('Could Not connect to database : ', err);
    }
    else {
        console.log('Connect to database : '  +config.db);
    }
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));
app.use(express.static(__dirname + '/Views/dist/'));
//default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/Views/dist/index.html'));
});
//session
app.use(cookieParser());
app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(function (req, res, next) {
    req.session.cookie.maxAge = 180 * 60 * 1000; // 3 hours
    next();
});
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});
//

app.use(cors(corsOptions),
    catalogRouter,
    branchRouter,
    menuRouter,
    productRouter,
    sizeRouter,
    colorRouter,
    folderRouter,
    imageRouter,
    promotionRouter,
    shippingRouter,
    orderRouter,
    userRouter);

var corsOptions = {
    origin: angularHostting,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
// app.use(cors({
//     orgin: 'http://localhost:4200'
// }));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('can not found url');
    err.status = 404;
    next(res.json({message:err.message}));
});
// development error handler
// start server
var chatServer = ws.createServer(function (conn) {
	console.log('New Chat connection established.', new Date().toLocaleTimeString());
	conn.on('text', function (msg) {
		// simple object transformation (= add current time)
		var msgObj = JSON.parse(msg);
		msgObj.newDate = new Date().toLocaleTimeString();
		var newMsg = JSON.stringify(msgObj);

		// echo message including the new field to all connected clients
		chatServer.connections.forEach(function (conn) {
			conn.sendText(newMsg);
			console.log('server emit: ',newMsg);
		});
	});
	conn.on('close', function (code, reason) {
		console.log('Chat connection closed.', new Date().toLocaleTimeString(), 'code: ', code);
	});

	conn.on('error', function (err) {
		// only throw if something else happens than Connection Reset
		if (err.code !== 'ECONNRESET') {
			console.log('Error in Chat Socket connection', err);
			throw  err;
		}
	})
}).listen(3000, function () {
	console.log('Chat socketserver running on::' + config.domain + '::3000' );
});

var server = app.listen(port,config.domain, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
