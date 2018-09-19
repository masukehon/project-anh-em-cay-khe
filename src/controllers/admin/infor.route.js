const { Router } = require("express");
const { InformationService } = require("../../services/information.service");

const infoRouter = Router();

infoRouter.post('/update', (req, res, next) => {

    InformationService.Update()
    .then(info => res.status(200).send({success:true, info}))
    .catch(res.onError);
});

module.exports = {infoRouter};