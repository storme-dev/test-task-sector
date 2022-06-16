const express = require('express');
const { body } = require('express-validator');
const userRouter = express.Router();
const userController = require('./controller');
const checkAuth = require('../../middlewares/check-auth');

userRouter.post('/register',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.register
);
userRouter.post('/login', userController.login);
userRouter.get('/uploadPhoto', userController.uploadPhoto);
userRouter.post('/upload', userController.upload);

module.exports = userRouter;
