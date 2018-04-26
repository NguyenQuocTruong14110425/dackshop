const User = require('../../Models/User');
const Valid = require('../lib/Valid.js');
const bcrypt = require('bcrypt-nodejs');
const EnumConstant = require('../../Web_Config/EnumConstant.js');
var Enum = new EnumConstant();
var mess = {} = Enum.DataMessage;

class UserService {
    constructor() { }
    //hàm tìm tất cả User
    findAllUser(idparam, callback) {
        User.find()
            .populate({ path: "Promotion" })
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm tìm một User theo id tuyền vào
    findUserById(idparam, callback) {
        User.findById(idparam)
            .populate({ path: "Promotion" })
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    // hàm thêm một User
    addUser(UserModel, callback) {
        let DataSet = this.getDataUserForInsert(UserModel);
        User.createAsync(DataSet)
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.AddFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm cập nhật một User
    updateUser(idparam, UserModel, callback) {
        let dataSet = this.getDataUserForUpdate(UserModel, null);
        User.findByIdAndUpdateAsync(idparam,
            { $set: dataSet })
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.UpdateFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm xóa một User
    removeUser(idparam, callback) {
        User.findByIdAndRemoveAsync(idparam)
            .then(function (data) {
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //Kiểm tra một email có tồn tại hay không
    checkEmail(email, callback) {
        User.findOne({ Email: email })
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.ObjectNull);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //Kiểm tra một username có tồn tại hay không
    checkUserName(username, callback) {
        User.findOne({ UserName: username })
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.ObjectNull);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };

    //login vào hệ thống
    Login(UserName, Password, callback) {
        User.findOne({ UserName: UserName.toLowerCase() })
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.ObjectNull);
                else {

                    bcrypt.compare(Password, data.Password, function(err, res) {
                    console.log(res);
                        if (!res) {
                            return callback(mess.PasswordValid); // Return error
                        }
                        else {
                            console.log(data);
                            return callback(null, data);
                        }
                    });
                }
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm lấy dữ liệu khi thêm mới
    getDataUserForInsert(data) {
        let newUser = new User();
        newUser.UserName = data.UserName,
            bcrypt.hash(data.Password, null, null, (err, hash) => {
                if (err) {
                    newUser.Passwor = Valid.hashPassword(data.Password);
                }
                else {
                    newUser.Password = hash;
                }
            }),
            newUser.FullName = data.FullName,
            newUser.Email = data.Email,
            newUser.Address = data.Address,
            newUser.NumberPhone = data.NumberPhone,
            newUser.Gender = data.Gender,
            newUser.Age = data.Age,
            newUser.Promotion = Valid.getObjectIDIfValid(data.Promotion);
        newUser.DateCreate = new Date()
        return newUser;
    }
    //hàm lây dữ liệu khi cập nhật
    getDataUserForUpdate(data) {
        let User =
            {
                DateUpdate: new Date()
            }
        if (data.UserName) {
            User.UserName = data.UserName;
        }
        if (data.Password) {
            User.Password=Valid.hashPassword(data.Password);
        }
        if (data.FullName) {
            User.FullName = data.FullName;
        }
        if (data.Email) {
            User.Email = data.Email;
        }
        if (data.Address) {
            User.Address = data.Address;
        }
        if (data.NumberPhone) {
            User.NumberPhone = data.NumberPhone;
        }
        if (data.Gender) {
            User.Gender = data.Gender;
        }
        if (data.Age) {
            User.Age = data.Age;
        }
        if (data.DaskPoint) {
            User.DaskPoint = data.DaskPoint;
        }
        if (data.IsDelete!==undefined) {
            User.IsDelete = data.IsDelete;
        }
        if (data.Promotion) {
            User.Promotion = Valid.getObjectIDIfValid(data.Promotion);
        }
        console.log(User );
        return User;
    }

}

module.exports = new UserService();