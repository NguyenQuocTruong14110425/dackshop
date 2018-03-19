const Catalog = require('../Models/catalog');
const Branch = require('../Models/branch');
const config = require('../Web_Config/database');

module.exports = (router) => {

    
    //add catalog
    router.post('/addCatalog/:idBranch', (req, res) => {
        if (!req.body.catalogName  || !req.params.idBranch) {
            res.json({ success: false, message: 'The error occurred in the process of work' });
        }
        else {
            var newcatalog = new Catalog({
                idBranch: null,
                catalogName: req.body.catalogName,
            });
            newcatalog.save((err, result) => {
                if (err) {
                    if (err.code === 11000) {
                        res.json({ success: false, message: 'Catalog name allready exists' });
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
                //when add catalog success
                else {
                    //this id from Method Post
                    var idBranch = req.params.idBranch;
                    //find id of branch and update field categories of collection Branch
                    Branch.findByIdAndUpdate(idBranch, 
                    { "$push": { "cataloges": result } },
                    { "new": true, "upsert": true }, function (err, data) {
                        if (err) {
                            res.json(err);
                        } else {
                            
                            //update filed idBranch in Catalog
                            Catalog.findByIdAndUpdate(result._id, 
                                {$set:{idBranch: idBranch}}, {new: true},
                                function (err, dataNew) {
                                    if (err) {
                                        res.json(err);
                                    } else {
                                        
                                        res.json({ success: true, message: dataNew })
                                    }
            
                                });
                        }

                    });
                }
            });
        }
    });
//update catalog
router.put('/updateCatalog', (req, res) => {
    if (!req.body._id) {
        res.json({ success: false, message: 'The error occurred in the process of work' });
    }
    else {
        Catalog.findOne({ _id: req.body._id }, (err, catalog) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!catalog) {
                    res.json({ success: false, message: 'Cannot save the data' });
                }
                else {
                    catalog.catalogName = req.body.catalogName;
                    catalog.countProductInCatalog = req.body.countProductInCatalog;
                    catalog.idBranch = req.body.idBranch;


                    catalog.save((err) => {
                        if (err) {
                            res.json({ success: false, message: 'Cannot save the data' });
                        }
                        else {

                            //find id of branch and update new data field categories of collection Branch
                            Branch.findByIdAndUpdate(catalog.idBranch,
                                { "$push": { "cataloges": catalog } },
                                { "new": true, "upsert": true }, function (err, data) {
                                    if (err) {
                                        res.json(err);
                                    } else {

                                        res.json({ success: true, message: data });
                                        // Branch.findOne({ _id: catalog.idBranch }, (error, branch) => {
                                        //     if (error) {
                                        //         res.json({ success: false, message: error });
                                        //     } else {

                                        //         //when update catalog successfully
                                        //         Branch.findOneAndUpdate({ _id: branch._id },
                                        //             { $pull: { cataloges: catalog._id } }, function (err, data) {
                                        //                 if (err) {
                                        //                     res.json({ success: false, message: err });
                                        //                 } else {
                                        //                     res.json({ success: true, data: data });
                                        //                 }
                                        //             });
                                        //     }
                                        // });
                                    }

                                });
                        }
                    });
                }
            }
        });

    }
});

//remove catalog

router.delete('/deletecatalog/:_id', (req, res) => {
    if (!req.params._id) {
        res.json({ success: false, message: req.params._id });
    }
    else {
        Catalog.findOneAndRemove({ _id: req.params._id }, (err, catalog) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                if (!catalog) {
                    res.json({ success: false, message: 'can not found catalog' });
                }
                else {
                    //res.json({ success: true, message: catalog });

                    Branch.findOne({ _id: catalog.idBranch }, (error, branch) => {
                        if (error) {
                            res.json({ success: false, message: error });
                        } else {

                            //when update catalog successfully
                            Branch.findOneAndUpdate({ _id: branch._id },
                                { $pull: { cataloges: catalog._id } }, function (err, data) {
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

    //find all category
    router.get('/allcatalog', (req, res) => {
        Catalog.find((err, catalogs) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!catalogs) {
                    res.json({ success: false, message: 'No catalog found.' });
                } else {
                    res.json({ success: true,message:"The data was saved successfully! Please look at the latest update your website!", catalogs: catalogs });

                }
            }
        });
});
    //find all category of one branch
    router.get('/listcatalog/:idbranch', (req, res) => {
        //res.json({ success: false, message: req.params.branchName });
        Branch.find({_id: req.params.idbranch}, (err, branch) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!branch) {
                    res.json({ success: false, message: 'There is no branch available' });
                } else {
                    Catalog.find({idBranch: branch[0]['_id']}, (err, catalogs) => {
                        if (err) {
                            res.json({ success: false, message: err });
                        } else {
                            if (!catalogs) {
                                res.json({ success: false, message: 'There is no catalog available' });
                            } else {
                                res.json({ success: true, catalogs: catalogs });
            
                            }
                        }
                    })

                }
            }
        })
    });
    //search catalog
router.get('/searchcatalog/:namecatalog', (req, res) => {
    
            //find with products
            Catalog.find({ catalogName: {'$regex': req.params.namecatalog} }, (err, catalogs) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (!catalogs || catalogs=="") {
                        res.json({ success: true, message: "can not found" });
                    } else {
                        res.json({ success: true, message: "The data was saved successfully! Please look at the latest update your website!", catalogs: catalogs });
    
                    }
                }
            });
        });


    
    //find one a catalog
    router.get('/findCatalog/:catalogName', (req, res) => {
        Catalog.findOne({ catalogName: req.params.catalogName }, (err, catalog) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!catalog) {
                    res.json({ success: false, message: 'Catalog name is not found' });
                } else {
                    res.json({ success: true, message: 'The '+catalog.catalogName +  ' was saved successfully! Please look at the latest update your website!', catalog: catalog });
                }
            }
        }).populate('idBranch');
    });
    return router;
}