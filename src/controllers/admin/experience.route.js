const { Router } = require("express");
const { ExperienceService } = require("../../services/experience.service");
const mustBeAdmin = require("../../helpers/mustBeAdmin");

const expRouter = Router();

expRouter.get('/', (req, res) => {
    ExperienceService.getAll()
    .then(exps => res.send({success: true, exps}))
    .catch(res.onError);
});

expRouter.post('/create', (req, res) => {
    const { title, link } = req.body;
    ExperienceService.create(title, link)
    .then(exp => res.send({success: true, exp}))
    .catch(res.onError);
});

expRouter.post('/update/:id', (req, res) => {
    const { title, link } = req.body;
    ExperienceService.update(req.params.id, title, link)
    .then(exp => res.send({success: true, exp}))
    .catch(res.onError);
});

expRouter.post('/remove/:id', (req, res) => {
    ExperienceService.remove(req.params.id)
    .then(exp => res.send({success: true, exp}))
    .catch(res.onError);
});

module.exports = { expRouter };

