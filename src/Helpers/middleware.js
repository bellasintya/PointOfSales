const form = require ('./form'),
    jwt = require ('jsonwebtoken');
    secretKey = process.env.SECRET_KEY;

exports.validateUser = (req, res, next) => {
    jwt.verify (req.headers['x-access-token'], secretKey, (err, decoded) => {
        if (err) {
            form.error (res, err.message);
        } else {
            req.body.id_user = decoded.id_user;
            req.body.username = decoded.username;
            next ();
        }
    });
}