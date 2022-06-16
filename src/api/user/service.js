const bcrypt = require('bcrypt');

const UserModel = require('./model');
const UserDto = require('./dto');
const ApiError = require('../../exceptions/ApiError');
const TokenService = require('../token/service');

class UserService {

    async registration(firstName, email, password) {
        const candidate = await UserModel.findOne({ where: { email } });
        if (candidate !== null) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует!`);
        }
        const hashPassword = await bcrypt.hash(password, 4);

        const user = await UserModel.create({
            email,
            firstName,
            password: hashPassword,
        });

        const userDto = new UserDto(user);
        const tokens = TokenService.generate({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async login(email, password) {
        const user = await UserModel.findOne({ where: { email } });
        if (user === null) {
            throw ApiError.BadRequest('Пользователь с таким почтовым адресом не найден');
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = TokenService.generate({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        return await TokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.Unauthorized();
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.Unauthorized();
        }
        const user = await UserModel.findOne({ where: { id: userData.id } });
        const userDto = new UserDto(user);
        const tokens = TokenService.generate({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto};
    }
}

module.exports = new UserService();
