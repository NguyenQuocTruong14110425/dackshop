// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
const Valid = require('../Web_Api/lib/Valid.js');
// load up the user model
var User = require('../Models/User');
// load the auth variables
var configAuth = require('./auth'); // use this one for testing

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    var fbStrategy = configAuth.facebookAuth;
    fbStrategy.passReqToCallback = true;  // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    passport.use(new FacebookStrategy(fbStrategy,
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        console.log(profile)
                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.facebook.token) {
                            user.facebook.token = token;
                            user.FullName  = profile.name.givenName + ' ' + profile.name.familyName;
                            user.Email = (profile.emails[0].value || '').toLowerCase();
                            user.DateUpdate  = new Date();
                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                    
                                return done(null, user);
                            });
                        }

                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
        
                        if(profile.emails[0].value!=null || profile.emails[0].value != undefined)
                        {
                            User.findOne({'Email': profile.emails[0].value}, function(err, user) {
                                if (err)
                                    return done(err);
            
                                if (user) {
                                    user.facebook.id    = profile.id;
                                    user.facebook.token = token;
                                    user.DateUpdate  = new Date();
                                    user.save(function(err) {
                                        if (err)
                                            return done(err);
                                        return done(null, user);
                                    }); 
                                }
                                else
                                {
                                    var newUser            = new User();
                                    newUser.facebook.id    = profile.id;
                                    newUser.facebook.token = token;
                                    newUser.FullName  = profile.name.givenName + ' ' + profile.name.familyName;
                                    newUser.Email = (profile.emails[0].value || '').toLowerCase();
                                    newUser.UserName  = (profile.emails[0].value || '').toLowerCase();
                                    newUser.Gender  = profile.gender;
                                    newUser.Password  =  Valid.hashPassword('0123');
                                    newUser.DateCreate  = new Date();
                                    newUser.save(function(err) {
                                        if (err)
                                            return done(err);
                                        return done(null, newUser);
                                    });
                                }
                            })
                        }
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user            = req.user; // pull the user out of the session
                user.facebook.id    = profile.id;
                user.facebook.token = token;
                user.FullName  = profile.name.givenName + ' ' + profile.name.familyName;
                user.Email = (profile.emails[0].value || '').toLowerCase();
                user.DateUpdate  = new Date();
                user.save(function(err) {
                    if (err)
                        return done(err);
                        
                    return done(null, user);
                });

            }
        });

    }));

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ 'google.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.google.token) {
                            user.google.token = token;
                            user.FullName  = profile.displayName;
                            user.Email = (profile.emails[0].value || '').toLowerCase(); // pull the first Email
                            user.Address  = profile.formatted_address;
                            user.Avatar = profile.photos[0].value || '';
                            user.Gender  = profile.gender;
                            user.DateUpdate  = new Date();
                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                return done(null, user);
                            });
                        }

                        return done(null, user);
                    } else {
                        if(profile.emails[0].value!=null || profile.emails[0].value != undefined)
                        {
                            User.findOne({'Email': profile.emails[0].value}, function(err, user) {
                                if (err)
                                    return done(err);
            
                                if (user) {
                                    user.google.id    = profile.id;
                                    user.google.token = token;
                                    user.DateUpdate  = new Date();
                                    user.save(function(err) {
                                        if (err)
                                            return done(err);
                                        return done(null, user);
                                    }); 
                                }
                                else
                                {
                                    var newUser          = new User();
                                    newUser.google.id    = profile.id;
                                    newUser.google.token = token;
                                    newUser.Email = (profile.emails[0].value || '').toLowerCase(); // pull the first Email
                                    newUser.FullName  = profile.displayName;
                                    newUser.UserName  = (profile.emails[0].value || '').toLowerCase();
                                    newUser.Avatar = profile.photos[0].value || '';
                                    newUser.Gender  = profile.gender;
                                    newUser.Password  =  Valid.hashPassword('0123');
                                    newUser.DateCreate = new Date();
                                    newUser.save(function(err) {
                                        if (err)
                                            return done(err);
                                            
                                        return done(null, newUser);
                                    });
                                }
                            })
                        }

                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user = req.user; // pull the user out of the session
                user.google.id    = profile.id;
                user.google.token = token;
                user.Email = (profile.emails[0].value || '').toLowerCase(); // pull the first Email
                user.FullName  = profile.displayName;
                user.Address  = profile.formatted_address;
                user.Avatar = profile.photos[0].value || '';
                user.Gender  = profile.gender;
                user.DateUpdate  = new Date();
                user.save(function(err) {
                    if (err)
                        return done(err);
                        
                    return done(null, user);
                });

            }

        });

    }));

};
