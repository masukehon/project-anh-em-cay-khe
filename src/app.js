const express = require("express");
const json = require("body-parser");

const app = express();
const { siteRouter } = require("./controllers/site/site.route");
const { employeeRouter } = require("./controllers/admin/employee.route");
const { infoRouter } = require("./controllers/admin/infor.route");
const { orderRouter } = require("./controllers/admin/order.route");
const { expRouter } = require("./controllers/admin/experience.route");
const { roleRouter } = require("./controllers/admin/role.route");

// app.engine('.ejs', require('ejs').__express);
// app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(json());
app.use((req,res,next)=>{
    res.onError = error => {
        res.status(error.statusCode || 500).send({success: false, message: error.message});
    };
    next();
});

app.use(siteRouter);
app.use('/admin/exp',expRouter);
app.use('/admin/role',roleRouter);
app.use('/admin/infor',infoRouter);
app.use('/admin/order',orderRouter);
app.use('/admin',employeeRouter);

module.exports = {app};