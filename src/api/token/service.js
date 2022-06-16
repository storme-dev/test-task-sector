const TokenModel = require('./model');
const jwt = require("jsonwebtoken");
const JWT_CONFIG = require('../../../config').jwt;

class TokenService {
    generate(payload) {
        const accessToken = jwt.sign(payload, JWT_CONFIG.JWT_ACCESS_SECRET, {expiresIn: '15s'})
        const refreshToken = jwt.sign(payload, JWT_CONFIG.JWT_REFRESH_SECRET, {expiresIn: '30s'})

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({ where: { userId }})
        if (tokenData !== null) {
            tokenData.refreshToken = refreshToken;
            return await tokenData.save();
        }
        return await TokenModel.create({userId, refreshToken});
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, JWT_CONFIG.JWT_ACCESS_SECRET);
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, JWT_CONFIG.JWT_REFRESH_SECRET);
        } catch (e) {
            return null;
        }
    }

    async removeToken(refreshToken) {
        return await TokenModel.destroy({where: {refreshToken}});
    }

    async findToken(refreshToken) {
        return await TokenModel.findOne({where: {refreshToken}});
    }
}

module.exports = new TokenService();
