const { Router } = require("express");
const { EmployeeService } = require("../../services/employee.service");

const adminRouter = Router();

adminRouter.get('/', (req, res, next) => {
    res.render('admin/index');
});

adminRouter.post('/signup',(req, res, next) => {
    const {name,email,password} = req.body;
    EmployeeService.SignUp(name, email, password)
    .then(employee => res.send({success:true, employee}))
    .catch(res.onError);
});

adminRouter.post('/signin',(req, res, next) => {
    const {email,password} = req.body;
    EmployeeService.SignIn(email,password)
    .then(employee => res.send({success:true, employee}))
    .catch(res.onError);
});
module.exports = {adminRouter};