const jwt = require('jsonwebtoken');
const config_app    = require('../config.json');
const mongoose = require('mongoose');

const Token = mongoose.model('Token');

const generateAccessToken = (userId) => {

    const payload = {
        userId,
    };

    const options = { expiresIn: config_app.jwt.tokens.access.expiresIn };
    return jwt.sign(payload, config_app.jwt.secret, options);
};

const replaceDbRefreshToken = (userId) => 
    Token.findOneAndDelete({ userId })
        .exec()
        .then(() => Token.create({ userId }));

module.exports = {
    generateAccessToken,
    replaceDbRefreshToken,
};