const { Router } = require("express");
const { ImgUserMannualService } = require("../../services/img-user-mannual.service");
const mustBeAdmin = require("../../helpers/mustBeAdmin");
const { ImgUserMannual } = require("../../models/image-user-manual.model");
const imgUMRouter = Router();

imgUMRouter.get('/', (req, res) => {
  res.render('test');
});

// imgUMRouter.post('/create', (req, res) => {
//   ImgUserMannualService.create()
//   .then(imgUM =>{
//     res.status(200).send({success:true, imgUM});
//   })
//   .catch(res.onError);
// });

imgUMRouter.get('/getall', (req, res) => {
  ImgUserMannual.find({})
  .then(imgUM =>{
    res.status(200).send({success:true, imgUM});
  })
  .catch(res.onError);
});

// certiRouter.get('/removeall', (req, res) => {
//   Certification.remove({})
//   .then(cer =>{
//     res.status(200).send({success:true, cer});
//   })
//   .catch(res.onError);
// });

imgUMRouter.post('/update', (req, res, next) => {
  
  ImgUserMannualService.update(req.idUser, req, res)
  .then(imgUM =>{
    res.status(200).send({success:true, imgUM});
  })
  .catch(res.onError);
});

// certiRouter.get('/',(req,res,next)=>{
//   RoleService.getAll()
//     .then(roles =>{
//       res.status(200).send({success:true, roles});
//     })
//     .catch(res.onError);
// });


module.exports = { imgUMRouter };