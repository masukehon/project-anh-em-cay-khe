const { Router } = require("express");
const { EmployeeService } = require("../../services/employee.service");
const mustBeAdmin = require("../../helpers/mustBeAdmin");

const employeeRouter = Router();

employeeRouter.get('/signin',(req,res,next)=>{
    res.render('admin/login');
});

employeeRouter.post('/signup',(req, res, next) => {
    const {name,email,password,address,phone} = req.body;
    EmployeeService.SignUp(name, email, password, address, phone)
    .then(employee => res.send({success:true, employee}))
    .catch(res.onError);
});
employeeRouter.post('/signin',(req, res, next) => {
    const {email,password} = req.body;
    EmployeeService.SignIn(email,password)
    .then(employee => res.send({success: true, employee}))
    .catch(res.onError);
});

// employeeRouter.use(mustBeAdmin);

employeeRouter.get('/all', (req, res, next) => {
    EmployeeService.getAll()
    .then(employees => res.send({success: true, employees}))
    .catch(error => console.log(error));
});

employeeRouter.get('/', (req, res, next) => {
    res.render('admin/master',{page:"dashboard"});//get infor
});

employeeRouter.post('/update/info', (req, res) => {
    const {name, address, phone} = req.body;
    EmployeeService.updateInfo(req.idUser, name, address, phone)
    .then(employee => res.send({sucess: true, employee}))
    .catch(res.onError);
}); 

employeeRouter.post('/update/password', (req, res) => {
    const {oldPassword, newPassword} = req.body;
    EmployeeService.updatePassword(req.idUser, oldPassword, newPassword)
    .then(employee => res.send({sucess: true, employee}))
    .catch(res.onError);
}); 

employeeRouter.post('/update/role/:id', (req, res) => {
    const { nameRoleSlug } = req.body;
    EmployeeService.updateRole(req.idUser, req.params.id, nameRoleSlug)
    .then(employee => res.send({sucess: true, employee}))
    .catch(res.onError);
}); 
module.exports = {employeeRouter};