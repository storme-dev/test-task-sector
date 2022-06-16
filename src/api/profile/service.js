const UserModel = require('../user/model');
const ApiError = require("../../exceptions/ApiError");
const UserDto = require('../user/dto');

class ProfileService {

    async editProfile(id, email, firstName, lastName, gender) {
        //console.log({ email, firstName, lastName, gender });
        const result = await UserModel.update({ email, firstName, lastName, gender }, {
            where: {
                id
            }
        });
        if(result[0] === 0) {
            throw ApiError.BadRequest('Неверный ID пользователя');
        }
    }

    async getProfile(id) {
        const profile = await UserModel.findByPk(id);
        if(profile === null) {
            throw ApiError.BadRequest('Неверный ID пользователя');
        }
        return new UserDto(profile);
    }

    async getProfiles(page) {
        const itemsOnPage = 10;

        const profiles = await UserModel.findAll({ offset: (page-1) * itemsOnPage, limit: itemsOnPage });
        return profiles.map(profile => new UserDto(profile));
    }
}

module.exports = new ProfileService();
