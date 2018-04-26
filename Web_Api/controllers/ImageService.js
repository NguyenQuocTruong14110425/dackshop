const Image = require('../../Models/image');
const Folder = require('../../Models/folder');
const Valid = require('../lib/Valid.js');
const EnumConstant = require('../../Web_Config/EnumConstant.js');
const GoogleTokenProvider = require('refresh-token').GoogleTokenProvider;
const async = require('async'),
    ObjectId = require('mongodb').ObjectID,
    fs = require('fs'),
    request = require('request');

var Enum = new EnumConstant();
var mess = {} = Enum.DataMessage;

class ImageService {
    constructor() { }
    // hàm tìm danh sách Image theo id Folder
    findAllImage(callback) {
        Image.find()
            .populate({ path: "FolderParent", select: "_id FolderName Contains" })
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    // hàm tìm danh sách Image theo id Folder
    findImageByFolder(idparam, callback) {
        Folder.findById(idparam)
            .populate({ path: "ImageChild" })
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data.ImageChild);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    // hàm tìm Images theo id Image truyền vào
    findImageById(idparam, callback) {
        Image.findById(idparam)
            .populate({ path: "FolderParent", select: "_id FolderName QtyImage" })
            .execAsync()
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.SearchFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    }
    //hàm them mới một Image
    addImage(ImageModel, callback) {
        let DataSet = this.getDataImageForInsert(ImageModel, ImageModel.IdFolder);
        Image.createAsync(DataSet)
            .then(function (Images) {
                var idImage = Images._id;
                Folder.findByIdAndUpdate(ImageModel.IdFolder,
                    { "$push": { "ImageChild": idImage } },
                    { "new": true, "upsert": true })
                    .then(DataFolder => Folder.findByIdAndUpdate(DataFolder._id, { DateUpdate: new Date(), Contains: Number(DataFolder.ImageChild.length) }))
                    .then(function (data) {
                        data = {
                            idNewImage: idImage
                        }
                        if (data == null || data == undefined) return callback(mess.AddFail);
                        return callback(null, data);
                    })
                    .catch(err => {
                        return callback(err.message);
                    })
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm xử lý cập nhật một Image
    updateImage(ImageModel, callback) {
        let dataSet = this.getDataImageForUpdate(ImageModel, null);
        Image.findByIdAndUpdateAsync(ImageModel._id,
            { $set: dataSet })
            .then(function (data) {
                if (data == null || data == undefined) return callback(mess.UpdateFail);
                return callback(null, data);
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm xóa tất cả Image có trong Folder
    removeAllImage(idparam, callback) {
        Folder.findByIdAsync(idparam)
            .then(function (Folders) {
                let countImage = Number(Folders.ImageChild.length)
                for (let index in Folders.ImageChild) {
                    if (index < countImage) {
                        Image.findByIdAndRemove(Folders.ImageChild[index])
                            .catch(err => {
                                return callback(err.message);
                            })
                    }
                }
                Folder.findByIdAndUpdate(idparam, { DateUpdate: new Date(), ImageChild: [], QtyImage: 0 })
                    .then(function (data) {
                        if (data == null || data == undefined) return callback(mess.RemoveFail);
                        return callback(null, data);
                    })
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    //hàm xó một Image bất kỳ
    removeImage(idparam, callback) {
        Image.findByIdAndRemove(idparam)
            .then(function (Images) {
                var FolderParent = Images.FolderParent;
                Folder.findByIdAndUpdate(FolderParent,
                    { $pull: { ImageChild: Images._id } },
                    { "new": true, "upsert": true })
                    .then(DataFolder => Folder.findByIdAndUpdate(DataFolder._id, { DateUpdate: new Date(), Contains: Number(DataFolder.ImageChild.length) }))
                    .then(function (data) {
                        data = {
                            idOldParent: FolderParent
                        }
                        if (data == null || data == undefined) return callback(mess.RemoveFail);
                        return callback(null, data);
                    })
                    .catch(err => {
                        return callback(err.message);
                    })
            })
            .catch(err => {
                return callback(err.message);
            })
    };
    
    //upload driver
    uploadImage(pathImage, nameImage, callback) {
        const CLIENT_ID = '1088713054587-q87ijh49ocejigt9qq8b747ovtkspvrh.apps.googleusercontent.com';
        const CLIENT_SECRET = 'xnO8q8Yz1wjtn00TPkCxMRp5';
        const REFRESH_TOKEN = '1/Y15gtYVIm_0u7fDFaG1VAsXe_ifp_HpJm5WCptap79i_dFth7LKtwKXp-LUIV-km';
        const ENDPOINT_OF_GDRIVE = 'https://www.googleapis.com/drive/v2';
        const PARENT_FOLDER_ID = '1FNAiz0q7ZBWONOnoQXR-50v4PohP2K-B';
        async.waterfall([
            function (callback) {
                var tokenProvider = new GoogleTokenProvider({
                    'refresh_token': REFRESH_TOKEN,
                    'client_id': CLIENT_ID,
                    'client_secret': CLIENT_SECRET
                });
                tokenProvider.getToken(callback);
            },
            function (accessToken, callback) {
                var fstatus = fs.statSync(pathImage);
                fs.open(pathImage, 'r', function (status, fileDescripter) {
                    if (status) {
                        callback(status.message);
                        return;
                    }

                    var buffer = new Buffer(fstatus.size);
                    fs.read(fileDescripter, buffer, 0, fstatus.size, 0, function (err, num) {

                        request.post({
                            'url': 'https://www.googleapis.com/upload/drive/v2/files',
                            'qs': {
                                //request module adds "boundary" and "Content-Length" automatically.
                                'uploadType': 'multipart'

                            },
                            'headers': {
                                'Authorization': 'Bearer ' + accessToken
                            },
                            'multipart': [
                                {
                                    'Content-Type': 'application/json; charset=UTF-8',
                                    'body': JSON.stringify({
                                        'title': nameImage,
                                        'parents': [
                                            {
                                                'id': PARENT_FOLDER_ID

                                            }
                                        ]
                                    })
                                },
                                {
                                    'Content-Type': 'image/png',
                                    'body': buffer
                                }
                            ]
                        }, callback);

                    });
                });
            },
            //----------------------------
            // Parse the response
            //----------------------------
            function (response, body, callback) {
                var body = JSON.parse(body);
                callback(null, body);
            }]
            , function (err, results) {
                if (err) return callback(err.message);
                if (results == null || results == undefined) return callback(mess.RemoveFail);
                return callback(null, results);
            }
        )

    }
    // hàm lấy data để thêm mới
    getDataImageForInsert(data, IdFolder) {
        let newImage = new Image();
        newImage.ImageName = data.ImageName,
            newImage.IdUrl = data.IdUrl,
            newImage.DateCreate = new Date(),
            newImage.DateUpdate = null,
            newImage.ImageLocal.data = data.readImage
        newImage.ImageLocal.contentType = data.contentType
        if (IdFolder != null) {
            newImage.FolderParent = IdFolder
        }
        return newImage;
    }
    // hàm lấy data để cập nhật
    getDataImageForUpdate(data) {
        let Image =
            {
                DateUpdate: new Date()
            }
        if (data.ImageName) {
            Image.ImageName = data.ImageName;
        }
        if (data.IdUrl) {
            Image.IdUrl = data.IdUrl;
        }
        if (data.readImage) {
            newImage.ImageLocal.data = data.readImage;
        }
        if (data.contentType) {
            newImage.ImageLocal.contentType = data.contentType;
        }
        if (data.IsDelete !== undefined) {
            Image.IsDelete = data.IsDelete;
        }
        return Image;
    }
    //
}

module.exports = new ImageService();