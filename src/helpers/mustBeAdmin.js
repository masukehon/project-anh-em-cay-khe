const { verify, sign, getToken } = require("./jwt");
const { ServerError } = require("../models/my-error.model");

async function mustBeAdmin(req, res, next){
    // const token = req.header.token;
    const token = getToken();
    const user = await verify(token);
    //nếu để await verify(token).catch(res.redirect('/'))
    //thì sẽ lỗi vì trong 1 hàm chỉ được 1 lần set res.
    if(!user)
        return res.redirect('/');

    req.idUser = user._id;
    next();
}

module.exports = mustBeAdmin;