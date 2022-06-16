const express = require('express');
const sequelize = require('./db');

const app = express();
app.use(express.json());
app.use('/static', express.static('static'));

const apiRouter = require('./api');
app.use('/api', apiRouter);

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
