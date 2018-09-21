const { Router } = require("express");
const { DynamicService } = require("../../services/dynamic.service");
const mustBeAdmin = require("../../helpers/mustBeAdmin");
const dynamicRouter = Router();

dynamicRouter.use(mustBeAdmin);

dynamicRouter.get('/:dynamicName', (req, res) => {
    DynamicService.getAll(req.params.dynamicName)
    .then(feats => {
        // res.send({success: true, feat});
        res.render('admin/master',{ feats, page:"formDynamicGet"});
    })
    .catch(res.onError);
});
//form insert dynamic
dynamicRouter.get('/:dynamicName/insert',(req,res)=>{
    res.render('admin/master',{page:"formDynamicInsert",dynamicForm:req.params.dynamicName});
});
dynamicRouter.post('/:dynamicName/create', (req, res) => {

    DynamicService.create(req,res)
    .then(feat => res.send({success: true, feat}))
    .catch(res.onError);
});

module.exports = { dynamicRouter };