const express = require('express');
const profileRouter = express.Router();
const profileController = require('./controller');
const checkAuth = require('../../middlewares/check-auth');
const {body} = require("express-validator");

profileRouter.put('/:id',
    body('email').isEmail().optional(),
    body('firstName').isLength({min: 2, max: 16}).optional(),
    body('lastName').isLength({min: 2, max: 16}).optional(),
    body('gender').custom((value, {req, loc, path}) => {
        if (value !== 'male' && value !== 'female') {
            throw new Error("Gender could me only male of female");
        } else {
            return value;
        }
    }).optional(),
    profileController.editProfile
);

profileRouter.get('/:id', profileController.getProfile)
profileRouter.get('/', profileController.getProfiles)

module.exports = profileRouter;
