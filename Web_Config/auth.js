// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '1920417771335885', // your App ID
        'clientSecret'    : '7859462fd0e8a1639a03c1af8f4ede1c', // your App Secret
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields'   : ['id', 'email', 'name'] // For requesting permissions from Facebook API

    },

    'googleAuth' : {
        'clientID'         : '63355359421-pffbmmovvnplgp5fgvug3na4a2apjf19.apps.googleusercontent.com',
        'clientSecret'     : 'uwcmf-OPyQJAWuuvQoNNb3_2',
        'callbackURL'      : 'http://localhost:8080/auth/google/callback'
    }

};
