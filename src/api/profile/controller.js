const {validationResult} = require("express-validator");
const ApiError = require("../../exceptions/ApiError");
const ProfileService = require("./service");

class ProfileController {
    async editProfile(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка в параметрах запроса', errors.array()))
            }

            const { email, firstName, lastName, gender } = req.body;
            await ProfileService.editProfile(req.params.id, email, firstName, lastName, gender);

            res.send({ ok: true });
        } catch (e) {
            next(e);
        }
    }

    async getProfile(req, res, next) {
        try {
            const profile = await ProfileService.getProfile(req.params.id);
            res.json(profile);
        } catch (e) {
            next(e);
        }
    }

    async getProfiles(req, res, next) {
        try {
            const page = req.query.page || 1;

            const profiles = await ProfileService.getProfiles(page);
            res.json(profiles);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ProfileController();
