const express = require('express');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const sequelize = require('./db');
const errorMiddleware = require('./middlewares/error');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/static', express.static('static'));
app.use(fileUpload({
    uploadTimeout: 30000,
    limits: { fileSize: 5 * 1024 * 1024 },
}));
global.appRootPath = path.resolve(__dirname, '..');

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
