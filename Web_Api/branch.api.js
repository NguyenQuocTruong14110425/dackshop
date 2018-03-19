const Branch = require('../Models/branch');
const Menu = require('../Models/menu');
const Catalog = require('../Models/catalog');
const config = require('../Web_Config/database');

module.exports = (router) => {

    //add branch
    router.post('/addbranch/:idmenu', (req, res) => {
        if (!req.body.branchName || !req.body.image ||
            !req.body.description || !req.params.idmenu) {
            res.json({ success: false, message: 'The error occurred in the process of work' });
        }
        else {
            var newbranch = new Branch({
                idmenu: null,
                branchName: req.body.branchName,
                image: req.body.image,
                description: req.body.description
            });
            newbranch.save((err, result) => {
                if (err) {
                    if (err.code === 11000) {
                        res.json({ success: false, message: 'Branch name allready exists' });
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
                //when add branch success
                else {
                    //this id from Method Post
                    var idmenu = req.params.idmenu;
                    //find id of branch and update field branchs of collection menu
                    Menu.findByIdAndUpdate(idmenu,
                        { "$push": { "branches": result } },
                        { "new": true, "upsert": true }, function (err, data) {
                            if (err) {
                                res.json(err);
                            } else {
                                //update filed idMenu in Menu
                                Branch.findByIdAndUpdate(result._id,
                                    { $set: { idmenu: idmenu } }, { new: true },
                                    function (err, dataNew) {
                                        if (err) {
                                            res.json(err);
                                        } else {
                                            res.json({ success: true,message: 'The data was saved successfully! Please look at the latest update your website!',branchs: dataNew })
                                        }

                                    });
                            }

                        });
                }
            });

        }
    });
    //find all branch
 router.get('/allbranch', (req, res) => {
                Branch.find((err, branches) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        if (!branches) {
                            res.json({ success: false, message: 'There is no branch available' });
                        } else {
                            res.json({ success: true,message:"The data was saved successfully! Please look at the latest update your website!", branches: branches });
        
                        }
                    }
                });
});
//search product
router.get('/searchbranch/:namebranch', (req, res) => {
    
            //find with products
            Branch.find({ branchName: {'$regex': req.body.namebranch} }, (err, branches) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (!branches || branches=="") {
                        res.json({ success: true, message: "There is no branch available" });
                    } else {
                        res.json({ success: true, message: "The data was saved successfully! Please look at the latest update your website!", branches: branches });
    
                    }
                }
            });
        });
 //find all category of one branch
 router.get('/listbranch/:idmenu', (req, res) => {
    //res.json({ success: false, message: req.params.branchName });
    Menu.find({_id: req.params.idmenu}, (err, menu) => {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            if (!menu) {
                res.json({ success: false, message: 'No menu found.' });
            } else {
                Branch.find({idmenu: menu[0]['_id']}, (err, branches) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        if (!branches) {
                            res.json({ success: false, message: 'There is no branch available' });
                        } else {
                            res.json({ success: true,message:menu[0]['_id'], branches: branches });
        
                        }
                    }
                });

            }
        }
    })
});

router.delete('/deletebranch/:id', function (req, res) {
    if (!req.params.id) {
        res.json({ success: false, message: req.params.id });
    }
    else {
        Branch.findOneAndRemove({ _id: req.params.id }, (err, branch) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                if (!branch) {
                    res.json({ success: false, message: 'can not found branch' });
                }
                else {
                    //res.json({ success: true, message: catalog });

                    Menu.findOne({ _id: branch.idmenu }, (error, menu) => {
                        if (error) {
                            res.json({ success: false, message: error });
                        } else {

                            //when update catalog successfully
                            Menu.findOneAndUpdate({ _id: menu._id },
                                { $pull: { branches: branch._id } }, function (err, data) {
                                    if (err) {
                                        res.json({ success: false, message: err });
                                    } else {
                                        res.json({ success: true, data: data });
                                    }
                                });
                        }
                    });
                }
            }
        });
    }
  });

    return router;
}