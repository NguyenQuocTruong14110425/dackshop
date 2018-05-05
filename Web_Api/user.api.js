const config = require('../Web_Config/database');
const UserService = require('./controllers/UserService');
var fs = require('fs');
const EnumConstant = require('../Web_Config/EnumConstant.js');

module.exports = (router) => {
    var Enum = new EnumConstant();
    var mess = {} = Enum.DataMessage;
    //đăng ký tài khoản một user
    router.post('/user/register', (req, res) => {
        if (!req.body.Email || !req.body.UserName || !req.body.Password) {
            res.json({ success: false, message: mess.NotInput });
        }
        else {
            UserService.addUser(req.body, function (err, Users) {
                if (err) {
                    if (err.code === 11000) {
                        res.json({ success: false, message: mess.UserExits });
                    }
                    else {
                        if (err.errors) {
                            res.json({ success: false, message: err ? err : mess.RegisterError });

                        }
                        else {
                            res.json({ success: false, message: err ? err : mess.RegisterNotSave });
                        }
                    }
                }
                else {
                    res.json({ success: true, message: mess.RegisterSuccess, data: Users })
                }
            });
        }
    });
    //cập nhật thông tin một user
    router.put('/user/update/', (req, res) => {
        UserService.updateUser(req.body, function (err, Users) {
            if (err) {
                res.json({ success: false, message: err ? err : null });
            } else {
                UserService.findUserById(req.body._id, function (err, Users) {
                    if (err) {
                        res.json({ success: false, message: err ? err : mess.SearchFail });
                    } else {
                        res.json({ success: true, message: mess.UpdateSuccess, data: Users });
                    }

                });
            }

        });
    });
    // xóa một user
    router.delete('/user/delete/:idparam', (req, res) => {
        UserService.removeUser(req.params.idparam, function (err, Users) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.RemoveFail });
            } else {
                res.json({ success: true, message: mess.RemoveSuccess, data: Users });
            }

        });
    });
    //kiểm tra một email có tồn tại hay không
    router.get('/user/checkemail/:email', (req, res) => {
        if (!req.params.email) {
            res.json({ success: false, message: mess.NotProvide });
        } else {
            UserService.checkEmail(req.params.email, function (err, Users) {
                if (err) {
                    res.json({ message: err });
                } else {
                    if (Users) {
                        res.json({ success: false, message: mess.EmailTaken });
                    } else {
                        res.json({ success: true, message: mess.EmailAvalible, data: Users });
                    }
                }
            });
        }
    });
    //kiểm tra một user name có tồn tại hay không
    router.get('/user/checkusername/:username', (req, res) => {
        if (!req.params.username) {
            res.json({ success: false, message: mess.NotProvide });
        } else {
            UserService.checkUserName(req.params.username, function (err, Users) {
                if (err) {
                    res.json({ message: err });
                } else {
                    if (Users) {
                        res.json({ success: false, message: mess.UserNameTaken });
                    } else {
                        res.json({ success: true, message: mess.UserNameAvalible, data: Users });
                    }
                }
            });
        }
    });
    //Tìm tất cả User và nhãn hiệu con nằm trong User ||data:{dữ liệu trả về} message:{lỗi thông báo}
    router.get('/user/all/', (req, res) => {
        UserService.findAllUser(function (err, Users) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.SearchFail });
            } else {
                res.json({ success: true, message: mess.SearchSuccess, data: Users });
            }
        });
    });
    // tìm thông tin của một người
    router.get('/user/detail/:idparam', (req, res) => {
        UserService.findUserById(req.params.idparam, function (err, Sizes) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.SearchFail });
            } else {
                res.json({ success: true, message: mess.SearchSuccess, data: Sizes });
            }

        });
    });
    // tìm thông tin của một người
    router.get('/user/profile/', (req, res) => {
        if (!req.session.customer) {
            res.json({ success: false, message: mess.NotSignUser });
        }
        else {
            var user = req.session.customer.user
            UserService.findUserById(user, function (err, Sizes) {
                if (err) {
                    res.json({ success: false, message: err ? err : mess.SearchFail });
                } else {
                    res.json({ success: true, message: mess.SearchSuccess, data: Sizes });
                }

            });
        }

    });
    //logout
    router.get('/user/logout', function (req, res, next) {
        if (!req.session.customer) {
            res.json({ success: false, message: mess.NotSignUser });
        }
        else {
            req.session.destroy();
            res.json({ success: true, message: mess.LogoutSuccess });
        }
    });
    //     /* ========
    //   LOGIN ROUTE
    //   ======== */
    router.post('/user/login', (req, res) => {
        // Check if username was provided
        if (!req.body.UserName) {
            res.json({ success: false, message: mess.NotProvide }); // Return error
        } else {
            // Check if password was provided
            if (!req.body.Password) {
                res.json({ success: false, message: mess.NotProvide }); // Return error
            } else {
                // Check if username exists in database
                UserService.Login(req.body.UserName, req.body.Password, (err, Users) => {
                    // Check if error was found
                    if (err) {
                        res.json({ success: false, message: err ? err : mess.LoginError }); // Return error
                    } else {
                        req.session.customer = {
                            user: Users._id,
                            cart: null
                        }
                        res.json({ success: true, message: mess.WellcomeUser, user: Users }); // Return success and token to frontend
                    }
                });
            }
        }
    });



    return router;
}