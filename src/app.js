const express = require("express");
const json = require("body-parser");

const app = express();
const { siteRouter } = require("./controllers/site/site.route");
const { employeeRouter } = require("./controllers/admin/employee.route");
const { infoRouter } = require("./controllers/admin/infor.route");
const { orderRouter } = require("./controllers/admin/order.route");
const { expRouter } = require("./controllers/admin/experience.route");
const { roleRouter } = require("./controllers/admin/role.route");
const { certiRouter } = require("./controllers/admin/certification.route");
const { imgUMRouter } = require("./controllers/admin/img-user-mannual.route");
const { cateRouter } = require("./controllers/admin/category.route");
const { dynamicRouter } = require("./controllers/admin/dynamic.route");

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


app.use('/admin/exp', expRouter);
app.use('/admin/role',roleRouter);
app.use('/admin/dynamic', dynamicRouter);
app.use('/admin/category', cateRouter);
app.use('/admin/imgUserMannual', imgUMRouter);
app.use('/admin/certification', certiRouter);
app.use('/admin/infor', infoRouter);
app.use('/admin/order', orderRouter);
app.use('/admin', employeeRouter);
app.use('/', siteRouter);
module.exports = {app};