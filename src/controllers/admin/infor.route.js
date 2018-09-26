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
      req.flash('infor', 'Update success');
      res.redirect('back');
    })
    .catch(error => res.onError(error, null, 'infor'));
});

infoRouter.get('/',(req,res,next)=>{
  InformationService.Get()
  .then(infor=> {
    res.render('admin/master',{ page:"inforUpdate", infor, messages: req.flash('infor')});
  })
  .catch(error => res.onError(error, null, 'infor'));
});


module.exports = {infoRouter};