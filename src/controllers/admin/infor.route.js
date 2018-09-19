const { Router } = require("express");
const { InformationService } = require("../../services/information.service");

const infoRouter = Router();
// infoRouter.get('/create',(req,res)=>{
//     InformationService.Create()
//     .then(info => res.status(200).send({success:true, info}))
//     .catch(res.onError);
// });

infoRouter.post('/update', (req, res, next) => {
    InformationService.Update(req,res)
    .then(infor =>{
      // res.status(200).send({success:true, info});
      res.redirect('admin/infor', {infor, page: "inforUpdate"});
    })
    .catch(res.onError);
});

infoRouter.get('/',(req,res,next)=>{
  InformationService.Get()
  .then(infor=> res.render('admin/master', {infor, page: "inforUpdate"}))
  .catch(res.onError);
});

infoRouter.get('/get',(req,res,next)=>{
  InformationService.Get()
  .then(infor=> res.render("admin/test",{infor}))
  .catch(res.onError);
});

infoRouter.get('/',(req,res,next)=>{
  InformationService.Get()
  .then(infor=> res.send({success:true, infor}))
  .catch(res.onError);
});


module.exports = {infoRouter};