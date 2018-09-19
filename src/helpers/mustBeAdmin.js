const { verify,sign } = require("./jwt");
const { ServerError } = require("../models/my-error.model");

async function mustBeAdmin(req, res, next){
    const token = req.header.token;
    const user = await verify(token);
    if(!user)
        throw new ServerError("INVALID_TOKEN", 400);
    req.idUser = user._id;
    next();
}

module.exports = mustBeAdmin;