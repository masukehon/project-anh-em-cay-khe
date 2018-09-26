const { Router } = require("express");
const { SiteService } = require("../../services/site.service");

const siteRouter = Router();

siteRouter.get('/', (req, res, next) => {
   SiteService.getAll()
   .then(data => res.render('site/index', { data }))
   .catch(error => console.log(error));
   
});

module.exports = { siteRouter };