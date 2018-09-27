const { ServerError } = require("../models/my-error.model");
const { Employee } = require("../models/employee.model");

async function getNameAdmin(req, res, next){
    if (req.originalUrl === '/admin/order/create' ||
        req.originalUrl === '/admin/signin')
    return next();
    
    const admin = await Employee.findById(req.idUser).populate('role');
    if(!admin)
    res.redirect('/admin/signin');
    req.app.locals.adminName = admin.name;
    req.app.locals.roleName = admin.role.slug;
    next();
}

module.exports = getNameAdmin;