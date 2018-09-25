const { Router } = require("express");

const siteRouter = Router();

siteRouter.get('/', (req, res, next) => {
   res.render('site/index');
});

module.exports = {siteRouter};