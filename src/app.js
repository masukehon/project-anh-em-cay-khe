const express = require("express");
const json = require("body-parser");
// const mustBeAdmin = require("./helpers/mustBeAdmin");
const app = express();
const { siteRouter } = require("./controllers/site/site.route");
const { adminRouter } = require("./controllers/admin/admin.route");

// app.engine('.ejs', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(json());
app.use((req,res,next)=>{
    res.onError = error => {
        res.status(error.statusCode).send({success: false, message: error.message});
    };
    next();
});
// app.use(mustBeAdmin);
app.use(siteRouter);
app.use('/admin',adminRouter);

module.exports = {app};