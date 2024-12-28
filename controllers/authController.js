const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = async (req, res) => {
    const { username, email,contactnumber} = req.body;
    try {
        const newUser = new User({ username, email,contactnumber });
        await newUser.save();
        res.status(201).json({ message: 'User signup successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error signup user', error: err });
    }
};

