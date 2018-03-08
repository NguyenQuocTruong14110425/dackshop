const crypto = require('crypto').randomBytes(256).toString('hex');


module.exports=
{
    uri:'mongodb://localhost/dbCRM',
    secret: crypto,
    db: 'dbCRM'
}