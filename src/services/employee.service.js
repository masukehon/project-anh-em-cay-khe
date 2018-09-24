const { ServerError } = require("../models/my-error.model");
const { Employee } = require("../models/employee.model");
const { Role } = require("../models/role.model");
const { hash, compare } = require("bcrypt");
const { sign } = require("../helpers/jwt");
const { checkObjectId } = require("../helpers/checkObjectId");

class EmployeeService {

    static async SignUp(name, email, password, address, phone) {
        const employee = await Employee.findOne({email});
        if (employee)
            throw new ServerError("EMAIL_EXISTED",400);
        const passHashed = await hash(password, 8);
        const roleNhanVien = await Role.findOne({slug: "nhan-vien"});
        const data = {name, email, address, phone, password: passHashed, role: roleNhanVien._id};
        const newEmployee = new Employee(data);
        return newEmployee.save();
    }

    static async SignIn(email, password, res) {
        const employee = await Employee.findOne({email});

        if (!employee)
            throw new ServerError("USER_INFO_INVALID",404);
        const checkPass = await compare(password, employee.password);
        
        if(!checkPass)
            throw new ServerError("USER_INFO_INVALID",404);
        const token = await sign(employee)
        .catch(error => new ServerError("TOKEN_ERROR",500));
        res.cookie('auth',token);
        return employee;
    }

    static async getAll() {
        return Employee.find({}).populate({
            path: 'role',
            match: {
              slug: 'nhan-vien'
            }
          }).then(employees => {
              const filterEmp = employees.filter(em => em.role);
              return filterEmp;
          });
    }

    static async updateInfo(idUser, name, address, phone) {
        checkObjectId(idUser);
        if(!name)
            throw new ServerError("NAME_INVALID",404);

        const employee = await Employee.findById(idUser);
        if (!employee)
            throw new ServerError("CANNOT_FIND_EMPLOYEE",404);
        
        const newEmployee = await Employee.findByIdAndUpdate(idUser, {name, address, phone}, {new: true});
        if (!newEmployee)
            throw new ServerError("CANNOT_FIND_EMPLOYEE",404);

        return newEmployee;
    }

    static async updatePassword(idUser, oldPassword, newPassword,againPassword) {
        checkObjectId(idUser);
        if(!newPassword) throw new ServerError("NEW_PASSWORD_INVALID",400);
        
        const user = await Employee.findById(idUser);
        if(!user) throw new ServerError("CANNOT_FIND_EMPLOYEE",404);

        const checkOldPass = await compare(oldPassword, user.password);
        if(!checkOldPass) throw new ServerError("OLD_PASSWORD_INVALID",404);
        if(againPassword != newPassword) throw new ServerError("AGAIN_PASSWORD_INVALID")
        const newPasswordHash = await hash(newPassword, 8);
        user.password = newPasswordHash;
        return user.save();
    }
    
    static async updateRole(idUserCurrent, idUserUpdate, nameRoleSlug) {
        
        checkObjectId(idUserCurrent, idUserUpdate);

        const adminCurrent = await Employee.findById(idUserCurrent).populate('role');
        if(!adminCurrent)
            throw new ServerError("CANNOT_FIND_ADMIN",404);
        //admin hiện tại ko phải boss thì ko cho update
        if(adminCurrent.role.slug !== "boss")
            throw new ServerError("UNAUTHORIZED",400);
        if(idUserCurrent === idUserUpdate)
            throw new ServerError("CANNOT_UPDATE_YOURSELF",400);

        const roleUpdate = await Role.findOne({slug: nameRoleSlug});
        if(!roleUpdate)
            throw new ServerError("CANNOT_FIND_ROLE",400);
        //ko thể sửa chức vụ thành boss. Chỉ có 1 người là boss
        if(roleUpdate.slug === "boss")
            throw new ServerError("UNAUTHORIZED",400);

        const adminUpdate = await Employee.findByIdAndUpdate(idUserUpdate, {role: roleUpdate._id}, {new: true});
        if(!adminUpdate)
            throw new ServerError("ERROR_NOT_DEFINE",400);
        
        return adminUpdate;
    }

    static async logout(res) {
        res.cookie("auth", '');
        return true;
    }
    // static async getByID(id){
    //     return (await Employee.findById(id).populate('role')).role.name;
    // }
    static async remove(id){
        return Employee.findByIdAndRemove(id);
    }
    static async getByIdEpl(id){
        return Employee.findById(id);
    }
}

module.exports = { EmployeeService };