const { Router } = require("express");
const { EmployeeService } = require("../../services/employee.service");

const employeeRouter = Router();

employeeRouter.get('/', (req, res, next) => {
    res.render('admin/master',{page:"dashboard"});//get infor
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
    .then(employee => res.send({success:true, employee}))
    .catch(res.onError);
});
module.exports = {employeeRouter};