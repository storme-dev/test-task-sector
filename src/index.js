const express = require('express');
const cookieParser = require('cookie-parser')
const sequelize = require('./db');
const errorMiddleware = require('./middlewares/error');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/static', express.static('static'));

const apiRouter = require('./api');
app.use('/api', apiRouter);
//
app.use(errorMiddleware);

(async function () {

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        throw error;
    }

    await sequelize.sync();

    app.listen(3000);

})();
