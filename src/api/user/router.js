const express = require('express');
const { body } = require('express-validator');
const userRouter = express.Router();
const userController = require('./controller');
const checkAuth = require('../../middlewares/check-auth');

userRouter.get('/', (req, res) => {
    res.send('Hello');
})

userRouter.post('/register',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.register
);
userRouter.post('/login', userController.login);

module.exports = userRouter;
