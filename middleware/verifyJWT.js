const jwt = require('jsonwebtoken'); 
const verifyJWT = (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];


    jwt.verify(
        token,
        ACCESS_TOKEN_SECRET='7eaf16ab9e748ad053ca069d5909c08c913d1e18b311bb62c1453043b3e7eea3253e1fe83c4ca1dfc7ca12cbdd8e13a677ac2fb614cc0dae8283ac05e8d81e26',
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}


module.exports = verifyJWT