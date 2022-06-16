const express = require('express');
const apiRouter = express.Router();

const userRouter = require('./user/router');
const profileRouter = require('./profile/router');

apiRouter.use('/user', userRouter);
apiRouter.use('/profile', profileRouter);

module.exports = apiRouter;
