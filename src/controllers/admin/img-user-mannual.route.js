const { Router } = require("express");
const { ImgUserMannualService } = require("../../services/img-user-mannual.service");
const mustBeAdmin = require("../../helpers/mustBeAdmin");
const { ImgUserMannual } = require("../../models/image-user-manual.model");
const imgUMRouter = Router();

// imgUMRouter.get('/', (req, res) => {
//   res.render('test');
// });

// imgUMRouter.get('/create', (req, res) => {
//   ImgUserMannualService.create()
//   .then(imgUM =>{
//     res.status(200).send({success:true, imgUM});
//   })
//   .catch(res.onError);
// });

// imgUMRouter.get('/remove', (req, res) => {
//   ImgUserMannualService.create()
//   .then(imgUM =>{
//     res.status(200).send({success:true, imgUM});
//   })
//   .catch(res.onError);
// });

//load form va lay tat ca
imgUMRouter.get('/', (req, res) => {
  ImgUserMannualService.getAll()
  .then(imgUM=>{
    res.render('admin/master',{ page:"formImgUM", imgUM, messages: req.flash('imgUM')});
  })
  .catch(error => res.onError(error, null, 'imgUM'));
});

imgUMRouter.post('/update', (req, res, next) => {
  
  ImgUserMannualService.update(req.idUser, req, res)
  .then(imgUM =>{
    req.flash('imgUM', 'Update success');
    res.redirect('back');
  })
  .catch(error => res.onError(error, null, 'imgUM'));
});

module.exports = { imgUMRouter };