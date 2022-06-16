const express = require('express');
const userRouter = express.Router();
const userController = require('./controller');

userRouter.get('/', (req, res) => {
    res.send('Hello');
})

module.exports = userRouter;
