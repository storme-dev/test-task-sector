const UserService = require('./service');
const { validationResult } = require('express-validator');
const ApiError = require('../../exceptions/ApiError');
const path = require('path');

class UserController {
    async register(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка в параметрах запроса', errors.array()))
            }
            const { firstName, email, password } = req.body;
            const userData = await UserService.registration(firstName, email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await UserService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async uploadPhoto(req, res, next) {
        res.send(`
        <form ref='uploadForm' 
            id='uploadForm' 
            action='/api/user/upload' 
            method='post' 
            encType="multipart/form-data"
        >
            <input type="file" name="sampleFile" />
            <input type='submit' value='Upload!' />
        </form> 
       `);
    }

    async upload(req, res, next) {
        try {
            const userId = 1;
            const file = req.files.sampleFile;

            if (file.mimetype.indexOf('image') === -1) {
                throw ApiError.BadRequest('Файл должен являться изображением!')
            }

            if (file.size > 3 * 1024 * 1024) {
                throw ApiError.BadRequest('Размер файла не более 3 МБ!');
            }

            file.mv(appRootPath + '/static/photos/' + userId.toString() + path.extname(file.name), (err) => {
                if (err) next(err);
                res.send({ ok: true });
            });

        } catch (e) {
            next(e);
        }

    }
}


module.exports = new UserController();
