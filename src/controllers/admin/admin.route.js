const { Router } = require("express");

const adminRouter = Router();

adminRouter.get('/', (req, res, next) => {
    res.render('admin/masterPage');
});

module.exports = {adminRouter};