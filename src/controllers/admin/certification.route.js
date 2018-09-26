const { Router } = require("express");
const { CertificationService } = require("../../services/certification.service");
const { Certification } = require("../../models/certification.model");
const certiRouter = Router();

certiRouter.get('/', (req, res) => {
  CertificationService.getAll()
  .then(cer=> res.render('admin/master',{cer, page:"formCertificationGet", messages: req.flash('cer')}))
  .catch(error => res.onError(error,"formCertificationGet",'cer'));
});

// certiRouter.post('/create', (req, res) => {
//   CertificationService.create()
//   .then(cer =>{
//     res.status(200).send({success:true, cer});
//   })
//   .catch(res.onError);
// });

// certiRouter.get('/getall', (req, res) => {
//   Certification.find({})
//   .then(cer =>{
//     res.status(200).send({success:true, cer});
//   })
//   .catch(res.onError);
// });

// certiRouter.get('/removeall', (req, res) => {
//   Certification.remove({})
//   .then(cer =>{
//     res.status(200).send({success:true, cer});
//   })
//   .catch(res.onError);
// });

certiRouter.post('/update', (req, res, next) => {
  
  CertificationService.update(req.idUser, req, res)
  .then(cer =>{
    req.flash('cer', 'Update success')
    res.redirect('back');
  })
  .catch(error => res.onError(error, null, 'cer'));
});

// certiRouter.get('/',(req,res,next)=>{
//   RoleService.getAll()
//     .then(roles =>{
//       res.status(200).send({success:true, roles});
//     })
//     .catch(res.onError);
// });


module.exports = { certiRouter };