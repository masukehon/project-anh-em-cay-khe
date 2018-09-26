const { Router } = require("express");
const { DynamicService } = require("../../services/dynamic.service");
const dynamicRouter = Router();


dynamicRouter.get('/:dynamicName', (req, res) => {
    DynamicService.getAll(req.params.dynamicName)
    .then(dyna => {
        res.render('admin/master',
        {dynamicForm:req.params.dynamicName, page:"formDynamicGet",dyna, messages: req.flash('dnm')});
    })
    .catch(res.onError);
});
//form insert dynamic
dynamicRouter.get('/:dynamicName/insert',(req,res)=>{
    res.render('admin/master',{dynamicForm:req.params.dynamicName, page:"formDynamicInsert", messages: req.flash('dnm')});
    // res.render('admin/master',{page:"formDynamicInsert",dynamicForm:req.params.dynamicName});
});

dynamicRouter.post('/:dynamicName/create', (req, res) => {

    DynamicService.create(req,res)
    .then(feat => {
        req.flash('dnm', 'Insert success');
        res.redirect('back');
    })
    .catch(error => res.onError(error, null, 'dnm'));
});

dynamicRouter.get('/remove/:id', (req,res)=> {
    DynamicService.remove(req.params.id)
    .then(feat=>{
        req.flash('dnm', 'remove success');
        res.redirect('back');
    })
    .catch(res.onError);
})
//form update
dynamicRouter.get('/:dynamicName/frUpdate/:id',(req,res)=> {
    DynamicService.getOne(req.params.id)
    .then(feat=>{
        res.render('admin/master',
        {dynamicForm:req.params.dynamicName, page:"formDynamicUpdate",feat, messages: req.flash('dnm')});
    })
    .catch(error => res.onError(error, null, 'dnm'));
})
dynamicRouter.post('/update/:id',(req, res)=> {
    DynamicService.update(req,res,req.params.id)
    .then(feat=>{
        req.flash('dnm', 'Update success');
        res.redirect('back');
    })
    .catch(error => res.onError(error, null, 'dnm'));
});

module.exports = { dynamicRouter };