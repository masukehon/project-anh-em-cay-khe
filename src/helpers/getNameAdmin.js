const { ServerError } = require("../models/my-error.model");
const { Employee } = require("../models/employee.model");

async function getNameAdmin(req, res, next){
    if (req.originalUrl === '/admin/order/create' ||
        req.originalUrl === '/admin/signin' ||
        req.originalUrl === '/admin/signup')
    return next();
    
    const admin = await Employee.findById(req.idUser);
    if(!admin)
        throw new ServerError("CANNOT_FIND_ADMIN",404);
    req.app.locals.adminName = admin.name;
    next();
}

module.exports = getNameAdmin;