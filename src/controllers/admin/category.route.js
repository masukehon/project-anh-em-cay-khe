const { Router } = require("express");
const { CategoryService } = require("../../services/category.service");
const { Category } = require("../../models/category.model");
const cateRouter = Router();

// cateRouter.get('/', (req, res) => {
//     CategoryService.getAll()
//     .then(cate => res.send({success: true, cate}))
//     .catch(res.onError);
// });

// cateRouter.get('/create', (req, res) => {
//     CategoryService.createAll()
//     .then(cate => res.send({success: true, cate}))
//     .catch(res.onError);
// });

// cateRouter.get('/remove', (req, res) => {
//     CategoryService.removeAll()
//     .then(cate => res.send({success: true, cate}))
//     .catch(res.onError);
// });

module.exports = { cateRouter };