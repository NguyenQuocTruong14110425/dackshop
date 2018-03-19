const Product = require('../Models/product');
const Catalog = require('../Models/catalog');
const Branch = require('../Models/branch');
const config = require('../Web_Config/database');
const async = require('async'),
  ObjectId = require('mongodb').ObjectID,
  fs1 = require('fs'),
  fs2 = require('fs'),
  fs3 = require('fs'),
  fs4 = require('fs'),
  fs5 = require('fs'),
  fs6 = require('fs'),
  request = require('request');
// || !req.body.description || !req.body.price || !req.body.leftimage
// || !req.body.leftimagezoom || !req.body.underimage || !req.body.underimagezoom || !req.body.behindimage || !req.body.behindimagezoom
module.exports = (router) => {
  router.post('/createproduct', (req, res) => {
    if (!req.body.nameproduct) {
      res.json({ success: false, message: 'you must enter input' });
    }
    else {
      var GoogleTokenProvider = require('refresh-token').GoogleTokenProvider;

      const CLIENT_ID = '360407678538-ts6k1eceunflqbd5433kr9pt7o6agekd.apps.googleusercontent.com';
      const CLIENT_SECRET = 'LsfkQResnQY9rWEj_L9rC1Nv';
      const REFRESH_TOKEN = '1/7NHKOwX2AHxJ_Z4rhuz31NRQps20uUbGflvxn1yAqEc';
      const ENDPOINT_OF_GDRIVE = 'https://www.googleapis.com/drive/v2';
      const PARENT_FOLDER_ID = '0B8sFb7bO0YNiUjZiOFVGN00tdkU';
      const PNG_LEFT_IMAGE = req.body.leftimage;
      const PNG_LEFT_IMAGE_ZOOM = req.body.leftimagezoom;
      const PNG_UNDER_IMAGE = req.body.underimage;
      const PNG_UNDER_IMAGE_ZOOM = req.body.underimagezoom;
      const PNG_BEHIND_IMAGE = req.body.behindimage;
      const PNG_BEHIND_IMAGE_ZOOM = req.body.behindimagezoom;
      const name_product = req.body.nameproduct;
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
          var fs5tatus = fs5.statSync(PNG_BEHIND_IMAGE_ZOOM);
          fs5.open(PNG_BEHIND_IMAGE_ZOOM, 'r', function (status, fileDescripter) {
            if (status) {
              callback(status.message);
              return;
            }

            var buffer = new Buffer(fs5tatus.size);
            fs5.read(fileDescripter, buffer, 0, fs5tatus.size, 0, function (err, num) {

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
                      'title': PNG_BEHIND_IMAGE_ZOOM,
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
        },

      ], function (err, results) {
        if (!err) {
          let product = new Product({
            nameproduct: req.body.nameproduct,
            description: req.body.description,
            price: req.body.price,
            behindimagezoom: results.id,
            color: req.body.color,
            size: req.body.size,
            catalog: req.body.catalog,
            count_user_buy: 0,
            count_user_search: 0,
            amountproduct: req.body.amountproduct,
            checksale: req.body.checksale,
            checknew: true,
            promotion: req.body.promotion
          });

          product.save((err, product) => {
            if (err) {
              if (err.code === 11000) {
                res.json({ success: false, message: 'product allready exists' });
              }
              else {
                if (err.errors) {
                  res.json({ success: false, message: err.message });

                }
                else {
                  res.json({ success: false, message: 'Could not save product. Error: ', err });
                }
              }
            }
            else {


              Catalog.update({ catalogName: req.body.catalog },
                {
                  $push: {
                    "products": {
                      _id: product._id
                    }
                  }
                }, function (err, data) {
                  if (!err) {
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
                        var fs1tatus = fs1.statSync(PNG_LEFT_IMAGE);
                        fs1.open(PNG_LEFT_IMAGE, 'r', function (status, fileDescripter) {
                          if (status) {
                            callback(status.message);
                            return;
                          }

                          var buffer = new Buffer(fs1tatus.size);
                          fs1.read(fileDescripter, buffer, 0, fs1tatus.size, 0, function (err, num) {

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
                                    'title': PNG_LEFT_IMAGE,
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
                      },

                    ], function (err, results) {
                      if (!err) {
                        Product.update({ nameproduct: name_product }, { $set: { leftimage: results.id } }, function (err, product) {
                          if (!err) {
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
                                var fs2tatus = fs2.statSync(PNG_LEFT_IMAGE_ZOOM);
                                fs2.open(PNG_LEFT_IMAGE_ZOOM, 'r', function (status, fileDescripter) {
                                  if (status) {
                                    callback(status.message);
                                    return;
                                  }

                                  var buffer = new Buffer(fs2tatus.size);
                                  fs2.read(fileDescripter, buffer, 0, fs2tatus.size, 0, function (err, num) {

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
                                            'title': PNG_LEFT_IMAGE_ZOOM,
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
                              },

                            ], function (err, results) {
                              if (!err) {
                                Product.update({ nameproduct: name_product }, { $set: { leftimagezoom: results.id } }, function (err, product) {
                                  if (!err) {
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
                                        var fs3tatus = fs3.statSync(PNG_UNDER_IMAGE);
                                        fs3.open(PNG_UNDER_IMAGE, 'r', function (status, fileDescripter) {
                                          if (status) {
                                            callback(status.message);
                                            return;
                                          }

                                          var buffer = new Buffer(fs3tatus.size);
                                          fs3.read(fileDescripter, buffer, 0, fs3tatus.size, 0, function (err, num) {

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
                                                    'title': PNG_UNDER_IMAGE,
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
                                      },

                                    ], function (err, results) {
                                      if (!err) {
                                        Product.update({ nameproduct: name_product }, { $set: { underimage: results.id } }, function (err, product) {
                                          if (!err) {
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
                                                var fs4tatus = fs4.statSync(PNG_BEHIND_IMAGE);
                                                fs4.open(PNG_BEHIND_IMAGE, 'r', function (status, fileDescripter) {
                                                  if (status) {
                                                    callback(status.message);
                                                    return;
                                                  }

                                                  var buffer = new Buffer(fs4tatus.size);
                                                  fs4.read(fileDescripter, buffer, 0, fs4tatus.size, 0, function (err, num) {

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
                                                            'title': PNG_BEHIND_IMAGE,
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
                                              },

                                            ], function (err, results) {
                                              if (!err) {
                                                Product.update({ nameproduct: name_product }, { $set: { behindimage: results.id } }, function (err, product) {
                                                  if (!err) {
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
                                                        var fs6tatus = fs6.statSync(PNG_UNDER_IMAGE_ZOOM);
                                                        fs6.open(PNG_UNDER_IMAGE_ZOOM, 'r', function (status, fileDescripter) {
                                                          if (status) {
                                                            callback(status.message);
                                                            return;
                                                          }

                                                          var buffer = new Buffer(fs6tatus.size);
                                                          fs6.read(fileDescripter, buffer, 0, fs6tatus.size, 0, function (err, num) {

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
                                                                    'title': PNG_UNDER_IMAGE_ZOOM,
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
                                                      },

                                                    ], function (err, results) {
                                                      if (!err) {
                                                        Product.update({ nameproduct: name_product }, { $set: { underimagezoom: results.id } }, function (err, product) {
                                                          if (!err) {
                                                            res.json({ success: true, message: 'The data was saved successfully! Please look at the latest update your website!' });
                                                          }
                                                          else {
                                                            res.json({ success: false, message: 'Error' });
                                                          }
                                                        });
                                                      }
                                                      else {
                                                        console.error('---error');
                                                        console.error(err);
                                                      }
                                                    });

                                                  }
                                                });
                                              }
                                              else {
                                                console.error('---error');
                                                console.error(err);
                                              }
                                            });

                                          }
                                        });
                                      }
                                      else {
                                        console.error('---error');
                                        console.error(err);
                                      }
                                    });
                                  }
                                });
                              }
                              else {
                                console.error('---error');
                                console.error(err);
                              }
                            });
                          }
                        });
                      }
                      else {
                        console.error('---error');
                        console.error(err);
                      }
                    });
                  }
                  else {
                    res.json({ success: false, message: 'Error' });
                  }
                });
            }
          });

        }
        else {
          console.error('---error');
          console.error(err);
        }
      });
    }

  });
  router.get('/getallproducts', (req, res) => {
    // Search database for all blog posts
    Product.find({}, (err, product) => {
      // Check if error was found or not
      if (err) {
        res.json({ success: false, message: err }); // Return error message
      } else {
        // Check if blogs were found in database
        if (!product) {
          res.json({ success: false, message: 'There is no product available' }); // Return error of no blogs found
        } else {
          res.json({ success: true, product: product }); // Return success and blogs array
        }
      }
    }).sort({ '_id': -1 }); // Sort blogs from newest to oldest
  });
  router.get('/getallcatalogs', (req, res) => {
    // Search database for all blog posts
    Catalog.find({}, (err, catalog) => {
      // Check if error was found or not
      if (err) {
        res.json({ success: false, message: err }); // Return error message
      } else {
        // Check if blogs were found in database
        if (!catalog) {
          res.json({ success: false, message: 'There is no catalog available' }); // Return error of no blogs found
        } else {
          res.json({ success: true, catalog: catalog }); // Return success and blogs array
        }
      }
    }).sort({ '_id': -1 }); // Sort blogs from newest to oldest
  });
  router.put('/updateProduct', (req, res) => {
    // Check if id was provided
    if (!req.body._id) {
      res.json({ success: false, message: 'There is no product available' }); // Return error message
    } else {
      // Check if id exists in database
      Product.findOne({ _id: req.body._id }, (err, product) => {
        // Check if id is a valid ID
        if (err) {
          res.json({ success: false, message: 'he error occurred in the process of work' }); // Return error message
        } else {
          // Check if id was found in the database
          if (!product) {
            res.json({ success: false, message: 'product id was not found.' }); // Return error message
          } else {
            if (product.catalog != req.body.catalog) {
              Catalog.update({ catalogName: req.body.catalog },
                {
                  $push: {
                    "products": {
                      _id: product._id
                    }
                  }
                }, function (err, data) {
                  if (!err) {
                    Catalog.update({ catalogName: product.catalog },
                      {
                        $pull: {
                          "products": {
                            _id: ObjectId(product._id)
                          }
                        }
                      }, function (err, data) {
                        if (err) {
                          res.json({ success: false, message: 'error' });
                        }
                        else {
                          product.nameproduct = req.body.nameproduct; // Save latest blog title
                          product.description = req.body.description;
                          product.price = req.body.price;
                          product.size = req.body.size;
                          product.catalog = req.body.catalog;
                          product.color = req.body.color;
                          product.count_user_buy = 0;
                          product.count_user_search = 0;
                          product.amountproduct = req.body.amountproduct;
                          product.checksale = req.body.checksale;
                          product.checknew = true;
                          procduct.promotion = req.body.promotion;
                          product.save((err) => {
                            if (err) {

                              res.json({ success: false, message: err }); // Return error message

                            } else {
                              res.json({ success: true, message: 'The data was saved successfully! Please look at the latest update your website!' }); // Return success message
                            }
                          });


                        }
                      }

                    );
                  }


                });


            }
            else {
              product.nameproduct = req.body.nameproduct; // Save latest blog title
              product.description = req.body.description;
              product.price = req.body.price;
              product.size = req.body.size;
              product.catalog = req.body.catalog;
              product.color = req.body.color;
              product.count_user_buy = 0;
              product.count_user_search = 0;
              product.amountproduct = req.body.amountproduct;
              product.checksale = req.body.checksale;
              product.checknew = true;
              procduct.promotion = req.body.promotion;
              product.save((err) => {
                if (err) {

                  res.json({ success: false, message: err }); // Return error message

                } else {
                  res.json({ success: true, message: 'The data was saved successfully! Please look at the latest update your website!' }); // Return success message
                }
              });
            }
          }
        }
      });
    }
  });

  router.put('/countbuyproduct/:id', (req, res) => {
    // Check if id was provided
    if (!req.params._id) {
      res.json({ success: false, message: 'There is no product available' }); // Return error message
    } else {
      // Check if id exists in database
      Product.findOne({ _id: req.params._id }, (err, product) => {
        // Check if id is a valid ID
        if (err) {
          res.json({ success: false, message: 'Not a valid product id' }); // Return error message
        } else {
          // Check if id was found in the database
          if (!product) {
            res.json({ success: false, message: 'product id was not found.' }); // Return error message
          }
          else {
            product.count_user_buy=product.count_user_buy ++;
            product.amountproduct=product.amountproduct - req.body.totalqty;
            product.save((err) => {
              if (err) {
                res.json({ success: false, message: err }); // Return error message
              } else {
                res.json({ success: true, message: 'The data was saved successfully! Please look at the latest update your website!' }); // Return success message
              }
            });
          }
        }
      });
    }
  });
  router.delete('/deleteproduct/:id', function (req, res) {
    if (!req.params.id) {
      res.json({ success: false, message: 'There is no product available' });
    }
    else {
      Product.findByIdAndRemove({ _id: req.params.id }, function (err, product) {
        if (err) {
          res.json({ success: false, message: err }); // Return error
        }
        else {
          Catalog.update({ catalogName: product.catalog },
            {
              $pull: {
                "products": {
                  _id: ObjectId(product._id)
                }
              }
            }, function (err, data) {
              if (err) {
                res.json({ success: false, message: 'error' });
              }
              else {
                res.json({ success: true, message: 'Product have name: '+data.name_product+' was delete' });
              }
            }

          );
        }
      });
    }
  });

  router.get('/searchproduct/:nameproduct', (req, res) => {

    //find with products
    Product.find({ nameproduct: { '$regex': req.params.nameproduct } }, (err, products) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!products || products == "") {
          res.json({ success: false, message: err }); // Return error message

        } else {
          res.json({ success: true, message: "We found an results", products: products });
        }
      }
    });
  });
  router.get('/filtersize/:size', (req, res) => {

    //find with products
    Product.find({ size: req.params.size }, (err, products) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!products || products == "") {
          res.json({ success: false, message: err }); // Return error message
        } else {
          Catalog.find({ catalogName: products[0]['catalog'] }, (err, catalogs) => {
            if (!catalogs || catalogs == "") {
              res.json({ success: false, message: err }); // Return error message
            } else {
              Branch.find({ _id: catalogs[0]['idBranch'] }, (err, branches) => {
                if (!branches || branches == "") {
                  res.json({ success: false, message: err }); // Return error message
                }
                else {
                  res.json({ success: true, message: "We found an results", products: products, catalogs: catalogs, branches: branches });
                }
              });
            }
          })
        }
      }
    });
  });
  router.get('/filtercolor/:color', (req, res) => {

    //find with products
    Product.find({ color: req.params.color }, (err, products) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!products || products == "") {
          res.json({ success: false, message: err }); // Return error message
        } else {
          Catalog.find({ catalogName: products[0]['catalog'] }, (err, catalogs) => {
            if (!catalogs || catalogs == "") {
              res.json({ success: false, message: err }); // Return error message
            } else {
              Branch.find({ _id: catalogs[0]['idBranch'] }, (err, branches) => {
                if (!branches || branches == "") {
                  res.json({ success: false, message: err }); // Return error message
                }
                else {
                  res.json({ success: true, message: "We found an results", products: products, catalogs: catalogs, branches: branches });
                }
              });
            }
          })
        }
      }
    });
  });
  router.get('/listproduct/:idcatalog', (req, res) => {
    //res.json({ success: false, message: req.params.branchName });
    Catalog.find({ _id: req.params.idcatalog }, (err, catalogs) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!catalogs) {
          res.json({ success: false, message: 'No catalogs found.' });
        } else {
          Product.find({ catalog: catalogs[0]['catalogName'] }, (err, products) => {
            if (err) {
              res.json({ success: false, message: err });
            } else {
              if (!products) {
                res.json({ success: false, message: 'There is no product available' });
              } else {
                res.json({ success: true, message: catalogs[0]['catalogName'], products: products });

              }
            }
          });

        }
      }
    })
  });

  router.get('/singleProduct/:id', (req, res) => {
    // Check if id is present in parameters
    if (!req.params.id) {
      res.json({ success: false, message: 'No product ID was provided.' }); // Return error message
    } else {
      // Check if the blog id is found in database
      Product.findOne({ _id: req.params.id }, (err, product) => {
        // Check if the id is a valid ID
        if (err) {
          res.json({ success: false, message: 'An issue occurred during the product search' }); // Return error message
        } else {
          // Check if blog was found by id
          if (!product) {
            res.json({ success: false, message: 'Product have Id:'+ req.params.id+' does not exist or was deleted' }); // Return error message
          } else {
            res.json({ success: true, product: product }); // Return success

          }
        }
      });
    }
  });

  return router;
}