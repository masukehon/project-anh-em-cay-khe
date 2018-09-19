const { Router } = require("express");

const adminRouter = Router();

adminRouter.get('/', (req, res, next) => {
    res.render('index');
});

module.exports = {adminRouter};