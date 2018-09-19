const { Router } = require("express");

const siteRouter = Router();

siteRouter.get('/', (req, res, next) => {
    res.send('hello world');
});

module.exports = {siteRouter};