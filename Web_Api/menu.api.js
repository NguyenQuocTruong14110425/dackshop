const Menu = require('../Models/menu');
const config = require('../Web_Config/database');
var fs = require('fs');
module.exports = (router) => {
    router.post('/createmenu', (req, res) => {
        if (!req.body.menuname) {
            if (err.code === 11000) {
                res.json({ success: false, message: 'menu name allready exists' });
            }
            else {
                if (err.errors) {
                    res.json({ success: false, message: err.message });

                }
                else {
                    res.json({ success: false, message: 'The error occurred in the process of work', err });
                }
            }
        }
        else {
            var NewMenu = new Menu();
            NewMenu.menuname = req.body.menuname;
            NewMenu.save((err, menus) => {
                if (err) {
                    res.json({ success: false, message: 'Cannot save the data' }); // Return error
                }
                else {
                    res.json({ success: true, message: 'The data was saved successfully! Please look at the latest update your website!', menus: menus }); // Return sucess
                }
            });
        }
    });
    router.get('/listmenu', function (req, res, next) {
        Menu.find(function (err, menus) {
            if (err) {
                res.json({ success: false, message: err }); // Return error
            }
            else {
                res.json({ success: true, message: 'The results in your system.', menus: menus }); // Return sucess
            }
        }).sort({ '_id': -1 }).populate('branchs');
    });
    //find one a menu
    router.get('/findmenu/:id', (req, res) => {
        Menu.findId({ _id: req.params.id }, (err, menus) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!user) {
                    res.json({ success: false, message: 'Your Menu name is currently not available in the system' });
                } else {
                    res.json({ success: true, message: 'We found an results', menus: menus });
                }
            }
        });
    });
    router.delete('/deletemenu/:id', function (req, res) {
        if (!req.params.id) {
            res.json({ success: false, message: 'There is no menu available!' });
        }
        else {
            Menu.findByIdAndRemove({ _id: req.params.id }, function (err, menu) {
                if (err) {
                    res.json({ success: false, message: err }); // Return error
                }
                else {
                    res.json({ success: true, message: "Menu " + menu.menuname + " was deleted" });
                }
            });
        }
    });
    return router;
}