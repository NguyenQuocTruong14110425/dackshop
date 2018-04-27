const crypto = require('crypto').randomBytes(256).toString('hex');


module.exports=
{
    uri:'mongodb://192.168.0.104/dbwebshoe',
    secret: crypto,
    db: 'dbwebshoe',
    hosting:'http://192.168.0.104:4200'
}