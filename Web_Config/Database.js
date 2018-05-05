const crypto = require('crypto').randomBytes(256).toString('hex');


module.exports=
{
    // uri:'mongodb://192.168.0.101/dbwebshoe',
    uri:'mongodb://localhost/dbwebshoe',
    secret: crypto,
    db: 'dbwebshoe',
    // hosting:'http://192.168.0.104:4200'
    hosting:'http://localhost:4200',
    domain:'localhost'
}