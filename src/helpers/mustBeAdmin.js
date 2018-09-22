const { verify, sign, getToken } = require("./jwt");
const { ServerError } = require("../models/my-error.model");

async function mustBeAdmin(req, res, next){
    const token = req.cookies.auth;
    verify(token)
    .then(user => {
        req.idUser = user._id;
        next();
    })
    .catch(error => res.redirect('/admin/signin'));
    
    //nếu để await verify(token).catch(res.redirect('/'))
    //thì sẽ lỗi vì trong 1 hàm chỉ được 1 lần set res.
}

module.exports = mustBeAdmin;