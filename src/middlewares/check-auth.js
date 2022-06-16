const ApiError = require('../exceptions/ApiError');
const TokenService = require('../api/token/service');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.Unauthorized());
        }

        const accessToken = authorizationHeader.split(' ')[1];

        //console.log(accessToken);

        if (!accessToken) {
            return next(ApiError.Unauthorized());
        }

        const userData = TokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.Unauthorized());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.Unauthorized());
    }
};
