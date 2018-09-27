const { Router } = require("express");
const { ExperienceService } = require("../../services/experience.service");

const expRouter = Router();

expRouter.get('/', (req, res) => {
    ExperienceService.getAll()
    .then(exps =>res.render('admin/master',{ page:"formExperienceGet", exps, messages: req.flash('exp')}))
    .catch(error => res.onError(error, null, 'epl'));
});
expRouter.get('/:id', (req, res) => {
    ExperienceService.getById(req.params.id)
    .then(exp =>{
        res.render('admin/master',{ page:"formExperienceUpdate", exp, messages: req.flash('exp')});
    })
    .catch(error => res.onError(error, null, 'exp'));
});
expRouter.get('/insert/exp',(req,res)=>{
    res.render('admin/master',{ page:"formExperienceInsert", messages: req.flash('exp')});
});
expRouter.post('/create', (req, res) => {
    const { title, link } = req.body;
    ExperienceService.create(title, link)
    .then(exp =>{
        req.flash('exp', 'Insert information success');
        res.redirect('back');
    })
    .catch(error => res.onError(error, null, 'exp'));
});

expRouter.post('/update/:id', (req, res) => {
    const { title, link } = req.body;
    ExperienceService.update(req.params.id, title, link)
    .then(exp =>{
        req.flash('exp', 'Update information success');
        res.redirect('back');
    })
    .catch(error => res.onError(error, null, 'exp'));
});

expRouter.get('/remove/:id', (req, res) => {
    ExperienceService.remove(req.params.id)
    .then(exp =>{
        req.flash('exp', 'remove information success');
        res.redirect('back');
    })
    .catch(error => res.onError(error, null, 'exp'));
});
module.exports = { expRouter };

