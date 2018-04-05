var _ = require('lodash');

const EnumConstant = require('../../Web_Config/EnumConstant.js');

var Enum = new EnumConstant();
var mess = {} = Enum.DataMessage;

// hàm xử lý khi gặp lỗi
exports.handleError = function (res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).json({message:err});
    };
}
//Hàm xử lý khi trả về kết quả
exports.responseWithResult= function(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
      if (entity) {
        res.status(statusCode).json({data:entity});
      }
    };
  }
  //Hàm xử lý in thông báo
exports.responseMessage= function(res, statusCode) {
      if (statusCode==200) {
        res.json({message:mess.UpdateFail});
  }
};
// Hàm xử lý khi Model null hoặc không tìm thấy model
exports.handleEntityNotFound = function (res) {
    return function (entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}
//Hàm xử lý tạo mới hoặc update
exports.saveUpdates = function (updates) {
    return function (entity) {
        var updated = _.merge(entity, updates);
        return updated.saveAsync()
            .spread(function (updated) {
                return updated;
            });
    };
}
//Hàm xử lý xóa một đối tượng
exports.removeEntity = function (res) {
    return function (entity) {
        if (entity) {
            return entity.removeAsync()
                .then(function () {
                    res.status(204).end();
                });
        }
    };
}
