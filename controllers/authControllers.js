const User = require('../model/User');
const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken'); //#1

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized  

    const match = await bcryptjs.compare(pwd, foundUser.password);
    if (match) {

        const roles = Object.values(foundUser.roles).filter(Boolean);
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            ACCESS_TOKEN_SECRET='7eaf16ab9e748ad053ca069d5909c08c913d1e18b311bb62c1453043b3e7eea3253e1fe83c4ca1dfc7ca12cbdd8e13a677ac2fb614cc0dae8283ac05e8d81e26',
            { expiresIn: '20m' }
        );

        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            REFRESH_TOKEN_SECRET='94798a0e0afc9267d37a13f307b38a03831b4d687eee2800d37b2373633fb586126059100f901ff6d9e24bf7015c0b9204c9a7cb7aad66d40707f5499926f971',
            { expiresIn: '1d' }
        );
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000});
        res.json({ roles, accessToken ,name: result.username});
    } else {
        res.sendStatus(401);
    }

}

module.exports = { handleLogin };