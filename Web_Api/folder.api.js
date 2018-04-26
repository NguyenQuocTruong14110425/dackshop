const config = require('../Web_Config/database');
const FolderService = require('./controllers/FolderService');
var fs = require('fs');
const EnumConstant = require('../Web_Config/EnumConstant.js');

module.exports = (router) => {
    var Enum = new EnumConstant();
    var mess = {} = Enum.DataMessage;

    //Tìm tất cả Folder và nhãn hiệu con nằm trong Folder ||data:{dữ liệu trả về} message:{lỗi thông báo}
    router.get('/folder/all/', (req, res) => {
        FolderService.findAllFolder(function (err, Folders) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.SearchFail });
            } else {
                res.json({ success: true, message: mess.SearchSuccess, data: Folders });
            }

        });
    });
    //Tìm Folder theo id mắc định là  req.params.idparam ||data:{dữ liệu trả về} message:{lỗi thông báo}
    router.get('/folder/detail/:idparam', (req, res) => {
        FolderService.findFolderById(req.params.idparam, function (err, Folders) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.SearchFail });
            } else {
                res.json({ success: true, message: mess.SearchSuccess, data: Folders });
            }

        });
    });
    // tạo mới một đối tượng Folder vào database
    // lưu ý : req.body truyền vào phải tương ứng với Entity name trong model

    router.post('/folder/add/', (req, res) => {
        FolderService.addFolder(req.body, function (err, Folders) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.AddFail });
            } else {
                res.json({ success: true, message: mess.AddSuccess, data: Folders });
            }

        });
    });
    //cập nhật một đối tượng Folder vào database theo id mắc định là  req.params.idparam
    //lưu ý : req.body truyền vào phải tương ứng với Entity name trong model
    //Nếu có tồn tại req.body._id thì sẽ bị remove, chỉ nhận thuộc tịnh params.idpram
    // router.put('/:idparam', FolderController.UpdateFolder);
    router.put('/folder/update/', (req, res) => {
        FolderService.updateFolder(req.body, function (err, Folders) {
            if (err) {
                res.json({ success: false, message: err ? err : null });
            } else {
                FolderService.findFolderById(req.body._id, function (err, Folders) {
                    if (err) {
                        res.json({ success: false, message: err ? err : mess.SearchFail });
                    } else {
                        res.json({ success: true, message: mess.UpdateSuccess, data: Folders });
                    }

                });
            }

        });
    });
    //xóa một đối tượng Folder vào database theo id mắc định là  req.params.idparam

    router.delete('/folder/delete/:idparam', (req, res) => {
        FolderService.removeFolder(req.params.idparam, function (err, Folders) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.RemoveFail });
            } else {
                res.json({ success: true, message: mess.RemoveSuccess, data: Folders });
            }

        });
    });

    return router;
}