
const Temp = require('../../Models/temp');
const Temp1 = require('../../Models/temp1');

exports.GetData =function (req, res, next) {
    Temp.findById({ _id: req.params.id }, (err, temp1data) => {
        if (!err) {
            req.data = temp1data;
            next();
        }
        else {
            next(res.json({msg:"error temp"}));
        }
    });
  }
  var findObjectById = function (id, callback) {
    Temp1.findById({ _id: id }, (err, temp1data) => {
        if (err) {
            return callback(err);
        }
        else {
            return callback(null, temp1data);
                    }
    });
  };

  exports.PushList = function (idparam,dataTemp,callback)
  {
    findObjectById(idparam, function (err, Temp1data) {
        if (err) {
            return callback(err);
        } else {
            var tempQtyadd;
            Temp1data.tempQty!= null ? tempQtyadd = Temp1data.tempQty + 1 : tempQtyadd= 1;
            Temp1.findByIdAndUpdate(idparam,
                { "$push": { "templist": dataTemp},tempQty:tempQtyadd },
                { "new": true, "upsert": true }, function (err, data) {
                    if (err) {
                        return callback(err);
                    } else {
                        
                        return callback(null, data)
                    }
                });
        }
    });
      
  }

  var CheckIdList = function (idparam, idlist, callback) {
      try
      {
    Temp1.findById({ _id: idparam }, (err, temp1data) => {
        if (err) {
            return callback(err);
        }
        else {
            for(var i in temp1data.templist)
            {
            if (temp1data.templist[i]!=idlist) {
                return callback(err);
            } else {

                return callback(null, temp1data.templist[i])
            }
            }
        }
    });
}
catch (ex) {
    callback(ex)
  }  
};

  exports.PullList = function (object,dataTemp,callback)
  {
    try {
            var tempQtyadd;
            object[0].tempQty!= -1 ? tempQtyadd = object[0].tempQty - 1 : tempQtyadd= 0;
            CheckIdList(object[0]._id,dataTemp, function (err, data) {
                if (err) {
                    return callback(err);
                } else {    
                    Temp1.findByIdAndUpdate(object[0]._id,
                        { $pull: { templist: dataTemp},tempQty:tempQtyadd }, function (err, data) {
                            if (err) {
                                return callback(err);
                            } else {
                                
                                return callback(null, data)
                            }
                        })
                }
            });
        }
        catch (ex) {
            callback(ex)
          }  
      
  }



  var CheckIdListTempDemo = function (idparam, idlist, callback) {
    try
    {
  Temp1.findById({ _id: idparam }, (err, temp1data) => {
      if (err) {
          return callback(err);
      }
      else {
          for(var i in temp1data.Temp)
          {
          if (temp1data.Temp[i]._id!=idlist) {
              return callback(err);
          } else {

              return callback(null, temp1data.Temp[i])
          }
          }
      }
  });
}
catch (ex) {
    callback(ex)
  }  
};



var FindModelById = function (model,idparam, callback) {
    try
    {
            if(model== 'Menu')
            {
                    Menu.findOne({_id:idparam},function (err, menus) {
                        if (err) {
                            callback(err, null);
                            return;
                        }
                        else {
                            return callback(null,menus);
                        }
                    });
            }
            else if(model== 'Branch')
            {
                Branch.find({_id:idparam},function (err, branch) {
                    if (err) {
                        callback(err, null);
                        return;
                    }
                    else {
                        return callback(null,branch);
                    }
                });
            }
            else if(model== 'Catalog')
            {
                Catalog.find({_id:idparam},function (err, catalog) {
                    if (err) {
                        callback(err, null);
                        return;
                    }
                    else {
                        return callback(null,catalog);
                    }
                });
            }
            else
            {
                callback(err, null);
            }
}
catch (ex) {
  callback(ex)
}  
};