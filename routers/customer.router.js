const Customer = require('../models/customerdb');
const config = require('../config/database');

module.exports = (router) =>{
    router.post('/newcustomer', (req, res) => {
        if (!req.body.fullname || !req.body.numberphone || !req.body.address || !req.body.birthday) {
            res.json({ success: false, message: 'you must enter input' });
        }
        else {
            if(Customer.findOne({fullname : req.body.fullname}, function(err, user)
            {
                if(user)
                {
                    res.json({success: false, message: "User exist!"})
                }
                else
                {
                let customer = new Customer({
                    fullname: req.body.fullname,
                    address: req.body.address,
                    birthday: req.body.birthday,
                    numberphone: req.body.numberphone
    
                });
                customer.save((err) => {
                    if (err) {
                        if (err.code === 11000) {
                            res.json({ success: false, message: 'Username or e-mail allready exists' });
                        }
                        else {
                            if (err.errors) {
                                res.json({ success: false, message: err.message });
                                
                            }
                            else {
                                res.json({ success: false, message: 'Could not save user. Error: ', err });
                            }
                        }
                    }
                    else {
                        res.json({ success: true, message: 'user saved!' })
                    }
                });
            }
            }));
           
         
        }
    });
    router.get('/getallcustomers', (req, res) => {
        Customer.find({}, (err, customer) => {
          if (err) {
            res.json({ success: false, message: err }); 
          } else {
            if (!customer) {
              res.json({ success: false, message: 'No customer found.' });
            } else {
              res.json({ success: true, customer: customer });
            }
          }
        }).sort({ '_id': -1 });
      });

      // router.put('/updatecustomer', (req, res) => {
      //   if (!req.body._id) {
      //     res.json({ success: false, message: 'No customer id provided' }); 
      //   } else {
      //     Customer.findOne({ _id: req.body._id }, (err, customer) => {
      //       if (err) {
      //         res.json({ success: false, message: 'Not a valid customer id' }); 
      //       } else {
      //         if (!customer) {
      //           res.json({ success: false, message: 'customer id was not found.' }); 
      //         } else { 
      //           customer.fullname = req.body.fullname;
      //           customer.address = req.body.address;
      //           customer.birthday = req.body.birthday;
      //           customer.numberphone = req.body.numberphone;               
      //           customer.save((err) => {
      //             if (err) {

      //                 res.json({ success: false, message: err }); 
                    
      //             } else {
      //               res.json({ success: true, message: 'Customer Updated!' }); 
      //             }
      //           })
      //         }
      //       }
      //     });
      //   }
      // });
      // router.get('/getsinglecustomer/:id', (req, res) => {
      //   if (!req.params.id) {
      //     res.json({ success: false, message: 'No customer ID was provided.' }); // Return error message
      //   } else {
      //     Customer.findOne({ _id: req.params.id }, (err, customer) => {
      //       if (err) {
      //         res.json({ success: false, message: 'Not a valid customer id' }); // Return error message
      //       } else {
      //         if (!customer) {
      //           res.json({ success: false, message: 'customer not found.' }); // Return error message
      //         } else {   
      //                   res.json({ success: true, customer: customer }); // Return success
                      
      //               }
      //       }
      //     });
      //   }
      // });
    return router;
}
