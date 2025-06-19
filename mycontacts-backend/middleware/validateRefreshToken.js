const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateRefreshToken = asyncHandler(async (req, res, next) => {
    const cookies = req.cookies;
    if(!cookies?.refreshToken){
        return res.status(401).json({message: "No refresh token provided"});
    }

    const refreshToken = cookies.refreshToken;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({message: "Invalid refresh token", error: err.message});
        }
        const accessToken = jwt.sign(
                    {user: {
                        username: decoded.user.name,
                        email: decoded.user.email,
                        id: decoded.user.id
                    }},
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '2m'});
        return res.status(200).json({accessToken});
    });
});

module.exports = validateRefreshToken;