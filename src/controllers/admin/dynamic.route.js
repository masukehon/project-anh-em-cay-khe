const { Router } = require("express");
const { DynamicService } = require("../../services/dynamic.service");
const mustBeAdmin = require("../../helpers/mustBeAdmin");
const dynamicRouter = Router();

dynamicRouter.use(mustBeAdmin);

dynamicRouter.get('/:dynamicName', (req, res) => {
    DynamicService.getAll(req.params.dynamicName)
    .then(dyna => {
        // res.send({success: true, feat});
        res.render('admin/master',{ dyna, page:"formDynamicGet", dynamicForm: req.params.dynamicName});
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

dynamicRouter.get('/remove/:id', (req,res)=> {
    DynamicService.remove(req.params.id)
    .then(feat=>res.redirect('back'))
    .catch(res.onError);
})
//form update
dynamicRouter.get('/:dynamicName/frUpdate/:id',(req,res)=> {
    DynamicService.getOne(req.params.id)
    .then(feat=>res.render('admin/master',{feat,page:"formDynamicUpdate",dynamicForm:req.params.dynamicName}))
    .catch(res.onError);
})
dynamicRouter.post('/update/:id',(req, res)=> {
    DynamicService.update(req,res,req.params.id)
    .then(feat=>res.redirect('back'))
    .catch(res.onError);
});

module.exports = { dynamicRouter };