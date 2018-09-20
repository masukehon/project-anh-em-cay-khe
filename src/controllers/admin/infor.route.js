const { Router } = require("express");
const { InformationService } = require("../../services/information.service");
const mustBeAdmin = require("../../helpers/mustBeAdmin");

const infoRouter = Router();
// infoRouter.get('/create',(req,res)=>{
//     InformationService.Create()
//     .then(info => res.status(200).send({success:true, info}))
//     .catch(res.onError);
// });
// infoRouter.use(mustBeAdmin);

infoRouter.post('/update', (req, res, next) => {
    InformationService.Update(req,res)
    .then(infor =>{
      res.redirect('/admin/infor');
    })
    .catch(res.onError);
});

infoRouter.get('/',(req,res,next)=>{
  InformationService.Get()
  .then(infor=> res.render('admin/master', {infor, page: "inforUpdate"}))
  .catch(res.onError);
});


module.exports = {infoRouter};