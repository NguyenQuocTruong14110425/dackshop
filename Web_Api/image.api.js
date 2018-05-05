const config = require('../Web_Config/database');
const ImageService = require('./controllers/ImageService');
const FolderService = require('./controllers/FolderService');
var fs = require('fs');
const path = require('path');
var Base64 = require('@ronomon/base64');
var multer = require('multer');
const EnumConstant = require('../Web_Config/EnumConstant.js');
module.exports = (router) => {
    var Enum = new EnumConstant();
    var mess = {} = Enum.DataMessage;
    // Tìm tất cả Image 
    router.post('/image/uploadimage/', (req, res) => {
        var path = req.body.path;
        var namefile = req.body.ImageName;
        var IdFolder = req.body.IdFolder;
        ImageService.uploadImage(path, namefile, function (err, Images) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.SaveSuccess });
            } else {
                var ModelImage =
                    {
                        ImageName: namefile,
                        IdUrl: Images.id,
                        IdFolder: IdFolder
                    }
                ImageService.addImage(ModelImage, function (err, dataImages) {
                    if (err) {
                        res.json({ message: err ? err : mess.AddFail });
                    } else {
                        ImageService.findImageById(dataImages.idNewImage, function (err, Images) {
                            if (err) {
                                res.json({ success: false, message: err ? err : mess.AddFail });
                            } else {
                                res.json({ success: true, message: mess.AddSuccess, data: Images });
                            }

                        });
                    }
                });
            }

        });
    });

    var storage = multer.diskStorage({
        // destino del fichero
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        // renombrar fichero
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });

    var upload = multer({ storage: storage });
    // Tìm tất cả Image 
    router.post('/image/uploadmutil/:idparam', upload.array("uploads[]", 12), (req, res) => {
        var flag =0;
        var lstFileName = Array.from(req.files)
            .map(files => files.filename)
        var contentType = Array.from(req.files)
            .map(files => files.mimetype);               
        for (let index = 0; index < lstFileName.length; index++) {       
            var filepath = './uploads/' + lstFileName[index]
            var filename = lstFileName[index];
            var IdFolder = req.params.idparam;
                ImageService.uploadImage(filepath, filename, function (err, Images) {
                    if (err) {
                        flag=0;
                        res.json({ success: false, message: err ? err : mess.SaveSuccess });
                    } else {
                        let ModelImage =
                            {
                                ImageName: lstFileName[index],
                                IdUrl: Images.id,
                                IdFolder: IdFolder,
                                readImage:fs.readFileSync('./uploads/' + lstFileName[index]),
                                contentType:contentType[index]
                            }                  
                        ImageService.addImage(ModelImage, function (err, dataImages) {
                            if (err) {
                                res.json({ message: err ? err : mess.AddFail });
                            } else {
                                flag=flag+1;
                            }
                        });
                    }
        
                });
        }
        if(flag=lstFileName.length)
        {
         res.json({ success: true, message: mess.AddSuccess });
        }
        else
        {
        res.json({ success: false, message:"Can not upload file"  });
        }
    });
    // Tìm tất cả Image 
    router.get('/image/allimage/', (req, res) => {
        ImageService.findAllImage(function (err, Images) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.SaveSuccess });
            } else {
                res.json({ success: true, message: mess.SearchSuccess, data: Images });
            }

        });
    });
    // Tìm tất cả Image có trong Folder có id Folder là  Idpram truyền vào
    router.get('/image/all/:idparam', (req, res) => {
        ImageService.findImageByFolder(req.params.idparam, function (err, Images) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.SaveSuccess });
            } else {
                res.json({ success: true, message: mess.SearchSuccess, data: Images });
            }

        });
    });

    // Tìm một Image bất kỳ co Idpram truyền vào
    router.get('/image/detail/:idparam', (req, res) => {
        ImageService.findImageById(req.params.idparam, function (err, Images) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.AddFail });
            } else {
                res.json({ success: true, message: mess.SearchSuccess, data: Images });
            }

        });
    });
    // thêm mới một Image vào môt Folder với Id Folder là Idpram truyền vào
    router.post('/image/add/', (req, res) => {
        ImageService.addImage(req.body, function (err, dataImages) {
            if (err) {
                res.json({ message: err ? err : mess.AddFail });
            } else {
                ImageService.findImageById(dataImages.idNewImage, function (err, Images) {
                    if (err) {
                        res.json({ success: false, message: err ? err : mess.AddFail });
                    } else {
                        res.json({ success: true, message: mess.AddSuccess, data: Images });
                    }

                });
            }

        });
    });


    //cập nhật một Image bất kỳ với id là idparam truyên vào
    router.put('/image/update/', (req, res) => {
        ImageService.updateImage(req.body, function (err, dataImages) {
            if (err) {
                res.json({ message: err ? err : mess.UpdateFail });
            } else {
                res.json({ success: true, message: mess.UpdateSuccess, data: dataImages });
            }

        });
    });
    // xóa một Image nằm trong một Folder bất kỳ với id Folder là id param truyền vào
    router.delete('/image/delete/:idparam', (req, res) => {
        ImageService.removeImage(req.params.idparam, function (err, Images) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.RemoveFail });
            } else {
                FolderService.findFolderById(Images.idOldParent, function (err, Folders) {
                    if (err) {
                        res.json({ success: false, message: err ? err : mess.RemoveFail });
                    } else {
                        res.json({ success: true, message: mess.RemoveSuccess, data: Folders });
                    }

                });
            }

        });
    });
    //xóa tất cả Image nằm trong một Folder bất kỳ với id Folder là idparam truyền vào
    router.delete('/image/removeall/:idparam', (req, res) => {
        ImageService.removeAllImage(req.params.idparam, function (err, data) {
            if (err) {
                res.json({ success: false, message: err ? err : mess.RemoveFail });
            } else {
                FolderService.findFolderById(req.params.idparam, function (err, Folders) {
                    if (err) {
                        res.json({ success: false, message: err ? err : mess.RemoveFail });
                    } else {
                        res.json({ success: true, message: mess.RemoveSuccess, data: Folders });
                    }

                });
            }

        });
    });


    return router;
}