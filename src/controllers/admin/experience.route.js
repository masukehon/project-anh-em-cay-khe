const { Router } = require("express");
const { ExperienceService } = require("../../services/experience.service");
const mustBeAdmin = require("../../helpers/mustBeAdmin");

const expRouter = Router();

expRouter.get('/', (req, res) => {
    ExperienceService.getAll()
    .then(exps =>res.render('admin/master', {exps, page: "formExperienceGet"}))
    .catch(res.onError);
});
expRouter.get('/:id', (req, res) => {
    ExperienceService.getById(req.params.id)
    .then(exp =>res.render('admin/master', {exp, page: "formExperienceUpdate"}))
    .catch(res.onError);
});
expRouter.get('/insert/exp',(req,res)=>{
    res.render('admin/master', { page: "formExperienceInsert"});
});
expRouter.post('/create', (req, res) => {
    const { title, link } = req.body;
    ExperienceService.create(title, link)
    .then(exp =>{
        res.redirect('back');
    })
    .catch(res.onError);
});

expRouter.post('/update/:id', (req, res) => {
    const { title, link } = req.body;
    ExperienceService.update(req.params.id, title, link)
    .then(exp => res.redirect('back'))
    .catch(res.onError);
});

expRouter.get('/remove/:id', (req, res) => {
    ExperienceService.remove(req.params.id)
    .then(exp =>res.redirect('back'))
    .catch(res.onError);
});
module.exports = { expRouter };

