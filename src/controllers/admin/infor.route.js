const { Router } = require("express");
const { InformationService } = require("../../services/information.service");

const infoRouter = Router();
// infoRouter.get('/create',(req,res)=>{
//     InformationService.Create()
//     .then(info => res.status(200).send({success:true, info}))
//     .catch(res.onError);
// });

infoRouter.put('/update', (req, res, next) => {
    InformationService.Update()
    .then(info => res.status(200).send({success:true, info}))
    .catch(res.onError);
});
infoRouter.get('/',(req,res,next)=>{
  InformationService.Get()
  .then(infor=> {     
      res.render('admin/master', { infor, page: "inforUpdate" });
    })
  .catch(err=>console.log(err))
});

module.exports = {infoRouter};