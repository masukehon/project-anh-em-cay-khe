const { Router } = require("express");
const { RoleService } = require("../../services/role.service");
const { Employee } = require("../../models/employee.model");

const roleRouter = Router();
// infoRouter.get('/create',(req,res)=>{
//     InformationService.Create()
//     .then(info => res.status(200).send({success:true, info}))
//     .catch(res.onError);
// });

roleRouter.post('/create', (req, res, next) => {
    const { name } = req.body;
    RoleService.create(name)
    .then(role =>{
      res.status(200).send({success:true, role});
    })
    .catch(res.onError);
});

roleRouter.post('/remove/:id', (req, res, next) => {
  RoleService.remove(req.params.id)
  .then(role =>{
    res.status(200).send({success:true, role});
  })
  .catch(res.onError);
});

roleRouter.get('/',(req,res,next)=>{
  RoleService.getAll()
    .then(roles =>{
      res.status(200).send({success:true, roles});
    })
    .catch(res.onError);
});


module.exports = { roleRouter };