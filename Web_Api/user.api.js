const User = require('../Models/user');
const config = require('../Web_Config/database');


module.exports = (router) => {
    router.post('/register', (req, res) => {
        if (!req.body.email || !req.body.fullname ||  !req.body.username || !req.body.address || !req.body.numberphone||  !req.body.password) {
            res.json({ success: false, message: 'you must enter input' });
        }
        else {
            let user = new User({
                email: req.body.email.toLowerCase(),
                username: req.body.username.toLowerCase(),
                fullname: req.body.fullname.toLowerCase(),
                address: req.body.address.toLowerCase(),
                numberphone: req.body.numberphone.toLowerCase(),
                password: req.body.password
            });
            user.save((err) => {
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
    });
    router.put('/updateuser', (req, res) => {
        if (!req.body.username) {
            res.json({ success: false, message: 'no find username' });
        }
        else {
            User.findOne({ username: req.body.username }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (!user) {
                        res.json({ success: false, message: 'false' });
                    }
                    else {
                        user.email = req.body.email;
                        user.password = req.body.password;
                        user.address=req.body.address;
                        user.numberphone=req.body.numberphone;
                        user.fullname=req.body.fullname;
                        user.save((err) => {
                            if (err) {
                                res.json({ success: false, message: 'can not save' });
                            }
                            else {
                                res.json({ success: true, message: 'data is updated' });
                            }
                        });
                    }
                }
            });

        }
    });
    // DELETES A USER FROM THE DATABASE
    router.delete('/deleteuser', (req, res) => {
        if (!req.body.username) {
            res.json({ success: false, message: 'no find username' });
        }
        else {
            User.findOneAndRemove({ username: req.body.username }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                }
                else {
                    if (!user) {
                        res.json({ success: false, message: 'can not found username' });
                    }
                    else {
                        res.json({ success: true, message: "User " + user.username + " was deleted" });
                    }
                }
            });
        }
    });
    router.get('/checkEmail/:email', (req, res) => {
        if (!req.params.email) {
            res.json({ success: false, message: 'E-mail was not provided' });
        } else {
            User.findOne({ email: req.params.email }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (user) {
                        res.json({ success: false, message: 'E-mail is already taken' });
                    } else {
                        res.json({ success: true, message: 'E-mail is avilable' });
                    }
                }
            });
        }
    }); 
    router.get('/checkUsername/:username', (req, res) => {
        if (!req.params.username) {
            res.json({ success: false, message: 'User Name was not provided' });
        } else {
            User.findOne({ username: req.params.username }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (user) {
                        res.json({ success: false, message: 'User name is already taken' });
                    } else {
                        res.json({ success: true, message: 'User name is avilable' });
                    }
                }
            });
        }
    });  
//find all list user
    router.get('/listmember', (req, res) => {
        User.find({}, (err, users) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!users) {
                    res.json({ success: false, message: 'No User found.' });
                } else {
                    res.json({ success: true, users: users });
                }
            }
        }).sort({ '_id': -1 });
    });
    //find one a user
    router.get('/profile', (req, res) => {
        User.findOne({ username: req.session.user }, (err, users) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!users) {
                    res.json({ success: false, message: 'User name is not found',users:{} });
                } else {
                    res.json({ success: true, users: users });
                }
            }
        });
    });
//logout
router.get('/logout', function (req, res, next) {
    if (!req.session.user) {
        res.json({ success: false, message: 'You have not signed in to any accounts yet' });
    }
    else
    {
    req.session.destroy();
    res.json({ success: true, message: 'You have successfully logged out'});
    }
});
    /* ========
  LOGIN ROUTE
  ======== */
  router.post('/login', (req, res) => {
    // Check if username was provided
    if (!req.body.username) {
      res.json({ success: false, message: 'No username was provided' }); // Return error
    } else {
      // Check if password was provided
      if (!req.body.password) {
        res.json({ success: false, message: 'No password was provided.' }); // Return error
      } else {
        // Check if username exists in database
        User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
          // Check if error was found
          if (err) {
            res.json({ success: false, message: err }); // Return error
          } else {
            // Check if username was found
            if (!user) {
              res.json({ success: false, message: 'Username not found.' }); // Return error
            } else {
              const validPassword = user.comparePassword(req.body.password); // Compare password provided to password in database
              // Check if password is a match
              if (!validPassword) {
                res.json({ success: false, message: 'Password invalid' }); // Return error
              } else {
                req.session.user=user.username;
                res.json({ success: true, message: 'wellcome !',user: { username: user.username } }); // Return success and token to frontend
              }
            }
          }
        });
      }
    }
  });

    return router;
}