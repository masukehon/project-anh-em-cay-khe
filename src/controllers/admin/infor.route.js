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
    .then(info => res.status(200).send({success:true, info}))
    .catch(res.onError);
});
<<<<<<< HEAD
infoRouter.get('/',(req,res,next)=>{
  InformationService.Get()
  .then(infor=> {     
      res.render('admin/master', { infor, page: "inforUpdate" });
    })
=======

infoRouter.get('/get',(req,res,next)=>{
  InformationService.Get()
  .then(infor=> res.render("admin/test",{infor}))
  .catch(err=>console.log(err))
});

infoRouter.get('/',(req,res,next)=>{
  InformationService.Get()
  .then(infor=> res.send({success:true, infor}))
>>>>>>> 8620ed37b1f75416f2aa6372aa2e30bac0690eb9
  .catch(err=>console.log(err))
});


module.exports = {infoRouter};