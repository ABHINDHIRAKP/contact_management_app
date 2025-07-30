const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//@desc register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }
    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email
        });
    }else {
        res.status(400);
        throw new Error('Invalid user date');
    }

});

//@desc user log in
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }
    const user = await User.findOne({email});
    if (user && await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(
            {user: {
                username: user.name,
                email: user.email,
                id: user.id
            }},
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '2m'});

        const refreshToken = jwt.sign(
            {user: {
                username: user.name,
                email: user.email,
                id: user.id
            }},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d'});
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
            secure: false, // Set to true in production with HTTPS

        });
        res.json({accessToken});
    }else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
});

//@desc current user
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

//@desc user logout
//@route POST /api/users/logout
//@access private
const logoutUser = asyncHandler(async (req, res) => {
    console.log('Logout request received');
    console.log('Cookies before logout:', req.cookies);
    res.clearCookie('refreshToken', {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        secure: false, // Set to true in production with HTTPS

    });
    
    
    
    
    console.log('Cookie clearing attempted');
    res.json({ message: 'Logged out successfully' });
});

module.exports =  {registerUser, loginUser, currentUser, logoutUser};