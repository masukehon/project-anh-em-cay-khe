const { Router } = require("express");
const { EmployeeService } = require("../../services/employee.service");
const mustBeAdmin = require("../../helpers/mustBeAdmin");
const mustBeBoss = require("../../helpers/mustBeBoss");
const getNameAdmin = require("../../helpers/getNameAdmin");


const employeeRouter = Router();

employeeRouter.get('/signin', (req, res, next) => {
    res.render('admin/login');
});

employeeRouter.post('/signup', mustBeBoss, (req, res, next) => {
    const { name, email, password, address, phone } = req.body;
    EmployeeService.SignUp(name, email, password, address, phone)
        .then(employee =>res.redirect('back'))
        .catch(res.onError);
});

employeeRouter.post('/signin', (req, res, next) => {
    const { email, password } = req.body;
    EmployeeService.SignIn(email, password, res)
        .then(employee => res.redirect('/admin'))
        .catch(res.onError);
});

employeeRouter.get('/', (req, res, next) => {
    res.render('admin/master', { page: "dashboard" });//get infor
});

employeeRouter.post('/update/info', (req, res) => {
    const { name, address, phone } = req.body;
    EmployeeService.updateInfo(req.idUser, name, address, phone)
        .then(employee => res.send({ sucess: true, employee }))
        .catch(res.onError);
});

employeeRouter.post('/update/password', (req, res) => {
    const { oldPassword, newPassword } = req.body;
    EmployeeService.updatePassword(req.idUser, oldPassword, newPassword)
        .then(employee => res.send({ sucess: true, employee }))
        .catch(res.onError);
});

employeeRouter.post('/update/role/:id', (req, res) => {
    const { nameRoleSlug } = req.body;
    EmployeeService.updateRole(req.idUser, req.params.id, nameRoleSlug)
        .then(employee => res.send({ sucess: true, employee }))
        .catch(res.onError);
});

employeeRouter.get('/all', mustBeBoss, (req, res, next) => {
    EmployeeService.getAll()
        .then(employees => res.render('admin/master', { employees, page: "formEmployeeGet" }))
        .catch(error => console.log(error));
});

//lay role chuyen vao form insert
employeeRouter.get('/signup', mustBeBoss, (req, res, next) => {
    res.render('admin/master', { page: "formEmployeeInsert" });
});

// employeeRouter.get('/all/formUpdate/:id', (req, res, next) => {
//     EmployeeService.getByID(req.params.id)
//     .then(roleName=>res.render('admin/master', { roleName ,page: "formEmployeeUpdate" }))
//     .catch(res.onError);
// });

employeeRouter.get('/logout', (req, res, next) => {
    EmployeeService.logout(res)
    .then(result => res.redirect('/admin/login'))
    .catch(res.onError);
});

module.exports = { employeeRouter };