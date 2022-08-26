const User = require('../model/User');
const jwt = require('jsonwebtoken'); // #12

//in authControllers.js, we SAVE the refreshToken in cookie!
  
const handleRefreshToken = async (req, res) => {

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 

    jwt.verify(
        refreshToken,
        REFRESH_TOKEN_SECRET='94798a0e0afc9267d37a13f307b38a03831b4d687eee2800d37b2373633fb586126059100f901ff6d9e24bf7015c0b9204c9a7cb7aad66d40707f5499926f971',

        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);

            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                ACCESS_TOKEN_SECRET='7eaf16ab9e748ad053ca069d5909c08c913d1e18b311bb62c1453043b3e7eea3253e1fe83c4ca1dfc7ca12cbdd8e13a677ac2fb614cc0dae8283ac05e8d81e26',
                { expiresIn: '50min' }
            );
       
            res.json({ roles, accessToken })
        }
    );
}
module.exports = { handleRefreshToken }