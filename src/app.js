const express = require("express");
const json = require("body-parser");
const cookieParser = require('cookie-parser')
const mustBeAdmin = require("./helpers/mustBeAdmin");
const getOrdersNotSeen = require("./helpers/getOrdersNotSeen");
const getNameAdmin = require("./helpers/getNameAdmin");

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

var flash = require('connect-flash-plus');
var session = require('express-session');

app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 }
  })); 
  app.use(flash());

// getOrdersNotSeen(req, res, next)
//     .then(orders => app.locals.ordersNotSeen = orders)
//     .catch(error => console.log(error));

//nếu chỉ như hàm ở trên. thì nó chỉ chạy duy nhất 1 lần.
//như ở dưới với middleware thì với mỗi request lên. nó sẽ chạy.

app.use(getOrdersNotSeen);
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(json());
app.use(cookieParser());
app.use((req,res,next)=>{
    res.onError = (error, pageName, flashName) => {
        if(error && !pageName && flashName) {
            //route trỏ tới bị lỗi
            req.flash(flashName, error.message);
            res.redirect('back');
        }
        else if (error && pageName && !flashName) {
            //nhận lỗi từ chính trang đó
            res.render('admin/master',{cer, page: pageName, messages: error.message})
        }
    };
    next();
});
app.use('/', siteRouter);

// app.use(mustBeAdmin);
// app.use(getNameAdmin);
app.use('/admin', employeeRouter);

app.use('/admin/exp', expRouter);
app.use('/admin/role',roleRouter);
app.use('/admin/dynamic', dynamicRouter);
app.use('/admin/category', cateRouter);
app.use('/admin/imgUserMannual', imgUMRouter);
app.use('/admin/certification', certiRouter);
app.use('/admin/infor', infoRouter);
app.use('/admin/order', orderRouter);


module.exports = {app};