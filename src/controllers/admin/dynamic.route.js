const { Router } = require("express");
const { DynamicService } = require("../../services/dynamic.service");
const mustBeAdmin = require("../../helpers/mustBeAdmin");
const dynamicRouter = Router();

dynamicRouter.use(mustBeAdmin);

dynamicRouter.get('/:dynamicName/', (req, res) => {
    DynamicService.getAll(req.params.dynamicName)
    .then(feat => res.send({success: true, feat}))
    .catch(res.onError);
});

dynamicRouter.get('/:dynamicName/form', (req, res) => {
    res.render("test");
});

dynamicRouter.post('/:dynamicName/create', (req, res) => {
    DynamicService.create(req,res)
    .then(feat => res.send({success: true, feat}))
    .catch(res.onError);
});

module.exports = { dynamicRouter };