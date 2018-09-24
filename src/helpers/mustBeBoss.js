const { Employee } = require("../models/employee.model");
const { ServerError } = require("../models/my-error.model");

async function mustBeBoss(req, res, next){
    const admin = await Employee.findById(req.idUser).populate('role');
    if(!admin)
        throw new ServerError("CANNOT_FIND_ADMIN",404);
    if(admin.role.slug !== "boss")
        throw new ServerError("UNAUTHORIZED",404);
    next();
}

module.exports = mustBeBoss;