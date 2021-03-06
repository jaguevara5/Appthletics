const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKEY = fs.readFileSync('./backend/routes/keys/private.key', 'utf8');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, privateKEY);
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Auth failed! (Middleware)'
        });
    }
};
