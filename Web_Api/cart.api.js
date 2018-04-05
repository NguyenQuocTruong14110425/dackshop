const Product = require('../Models/product');
const config = require('../Web_Config/database');
const Cart = require('../Models/cart');
module.exports = (router) => {
//add a item product
router.get('/cart/addcart/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    
    Product.findById(productId, function (err, product) {
        if(err)
        {
            res.json({ success: false, message: 'The product you selected is not available or has already been deleted on the system'});            
        }
        else
        {
        cart.add(product, product.id);
        req.session.cart = cart;
        res.json({ success: true, message: 'The success of the product is added to the cart',carts:cart});   
        }
    });
});

router.get('/cart/shoppingcart', function (req, res, next) {
    if (!req.session.cart) {
        res.json({ success: false, message: 'you do not have any products in your shopping cart',products:null });
    }
    else
    {
    var cart = new Cart(req.session.cart);
    res.json({ success: true, message: 'your cart!', products: cart.generateArray(), totalPrice: cart.totalPrice});
    }
});

router.get('/cart/removecart', function (req, res, next) {
    if (!req.session.cart) {
        res.json({ success: false, message: 'you do not have any products in your shopping cart' });
    }
    if(req.session.cart.items===undefined)
    {
        res.json({ success: false, message: 'products in your shopping cart have the problem!' });
    }
    else
    {
    req.session.destroy();
    res.json({ success: true, message: 'All products have been removed from the cart'});
    }
});
router.get('/cart/reduceitem/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.json({ success: true, message: 'you are reduce product!'});
});

router.get('/cart/increaseitem/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.increaseByOne(productId);
    req.session.cart = cart;
    res.json({ success: true, message: 'you are increase product!'});
});

router.get('/cart/removeitem/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.json({ success: true, message: 'you are remove a product to bag shoping!'});
});
router.get('/cart/checkout', function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.json({ success: true, total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

// router.post('/order', function(req, res, next) {
//     if (!req.session.cart) {
//         res.json({ success: false, message: 'you have not product in bag!'});
//     }
//     else
//     {
//     var cart = new Cart(req.session.cart);
//         var order = new Order({
//             cart: cart,
//             address: req.body.address,
//             name: req.body.name,
//             phone:req.body.phone,
//             dateorder:req.body.dateorder,
//             status:"process order",
//             paymentcard: req.body.paymentcard
//         });
//         order.save(function(err, result) {
//             req.session.cart = null;
//             res.json({ success: true, message: 'Successfully bought product!your order Id: '+result._id});
//         });
//     }
//     });

// //find all list user
// router.get('/listorder', (req, res) => {
//     Order.find({}, (err, orders) => {
//         if (err) {
//             res.json({ success: false, message: err });
//         } else {
//             if (!orders) {
//                 res.json({ success: false, message: 'No User found.' });
//             } else {
//                 res.json({ success: true, orders: orders});
//             }
//         }
//     }).sort({ '_id': -1 });
// });
// //search  order with phone number
// router.get('/phoneforoder/:phone', (req, res) => {
//     // Check if id is present in parameters
//     if (!req.params.phone) {
//       res.json({ success: false, message: 'phone number was provided.' }); // Return error message
//     } else {
//       // Check if the blog id is found in database
//       Order.find({ phone: req.params.phone }, (err, orders) => {
//         // Check if the id is a valid phone
//         if (err) {
//           res.json({ success: false, message: 'code bill error, try again!' }); // Return error message
//         } else {
//           // Check if blog was found by id
//           if (!orders) {
//             res.json({ success: false, message: 'Orders not found.' }); // Return error message
//           } else {
//             res.json({ success: true,message: 'Your order!', orders: orders}); // Return success
//           }
//         }
//       });
//     }
//   });   
// //detail order
// router.get('/detailorder/:id', (req, res) => {
//     // Check if id is present in parameters
//     if (!req.params.id) {
//       res.json({ success: false, message: 'No order ID was provided.' }); // Return error message
//     } else {
//       // Check if the blog id is found in database
//       Order.findOne({ _id: req.params.id }, (err, orders) => {
//         // Check if the id is a valid ID
//         if (err) {
//           res.json({ success: false, message: 'code bill error, try again!' }); // Return error message
//         } else {
//           // Check if blog was found by id
//           if (!orders) {
//             res.json({ success: false, message: 'Orders not found.' }); // Return error message
//           } else {
//             res.json({ success: true,message: 'Your order!', orders: orders,products: orders.cart.items }); // Return success
//           }
//         }
//       });
//     }
//   });   
//     router.get('/updateorder/:id/:status', function(req, res, next) {
//         if (!req.params.id) {
//             res.json({ success: false, message: 'There is no order available' });
//         }
//         else {
//             Order.findById({ _id: req.params.id }, (err, orders) => {
//                 if (err) {
//                     res.json({ success: false, message: err });
//                 } else {
//                     if (!orders) {
//                         res.json({ success: false, message: 'The error occurred in the process of work' });
//                     }
//                     else {
//                         orders.status = req.params.status;
//                         orders.save((err) => {
//                             if (err) {
//                                 res.json({ success: false, message: 'can not update status' });
//                             }
//                             else {
//                                 res.json({ success: true, message: 'status for order is '+ orders.status });
//                             }
//                         });
//                     }
//                 }
//             });

//         }
//         });
    return router;
}