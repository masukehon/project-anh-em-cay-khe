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
        .then(employee =>{
            req.flash('epl', 'Sign up success');
            res.redirect('back');
        })
        .catch(error => res.onError(error, null, 'epl'));
});

//lay role chuyen vao form insert
employeeRouter.get('/signup', mustBeBoss, (req, res, next) => {
    // res.render('admin/master', { page: "formEmployeeInsert" });
    res.render('admin/master',
    {page:"formEmployeeInsert", messages: req.flash('epl')});
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
        .then(employee => {
            req.flash('epl', 'update information success');
            res.redirect('back');
        })
        .catch(error => res.onError(error, null, 'epl'));
});

employeeRouter.post('/update/password', (req, res) => {
    const { oldPassword, newPassword, againPassword } = req.body;
    EmployeeService.updatePassword(req.idUser, oldPassword, newPassword, againPassword)
        .then(employee => {
            req.flash('epl', 'update password success');
            res.redirect('back');
        })
        .catch(error => res.onError(error, null, 'epl'));
});

employeeRouter.post('/update/role/:id', (req, res) => {
    const { nameRoleSlug } = req.body;
    EmployeeService.updateRole(req.idUser, req.params.id, nameRoleSlug)
        .then(employee => res.send({ sucess: true, employee }))
        .catch(res.onError);
});

employeeRouter.get('/all', mustBeBoss, (req, res, next) => {
    EmployeeService.getAll()
        .then(employees => {
            res.render('admin/master',
            { page:"formEmployeeGet", employees, messages: req.flash('epl')});
        })
        .catch(error => res.onError(error, null, 'epl'));
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
employeeRouter.get('/remove/:id',(req,res)=>{
    EmployeeService.remove(req.params.id)
    .then(epl=>{
        req.flash('epl', 'remove password success');
        res.redirect('back');
    })
    .catch(error => res.onError(error, null, 'epl'));
});
//form thong tin va cap nhat thong tin
employeeRouter.get('/inforStaff',(req,res)=>{
    EmployeeService.getByIdEpl(req.idUser)
    .then(epl=>{
        res.render('admin/master',{page:"formStaff_InforGet",epl, messages: req.flash('epl')});
    })
    .catch(error => res.onError(error, null, 'epl'));
})


module.exports = { employeeRouter };