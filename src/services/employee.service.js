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

    static async SignIn(email, password) {
        const employee = await Employee.findOne({email});
        if (!employee)
            throw new ServerError("USER_INFO_INVALID",404);
        const checkPass = await compare(password, employee.password);
        
        if(!checkPass)
            throw new ServerError("USER_INFO_INVALID",404);
        const token = await sign(employee)
        .catch(error => new ServerError("TOKEN_ERROR",500));

        employee.token = token;
        return employee;
    }

    static async getAll() {
        return Employee.find({});
    }

    static async updateInfo(idUser = '5ba1f1421958eb1950ee3c0a', name, address, phone) {
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

    static async updatePassword(idUser = '5ba1f1421958eb1950ee3c0a', oldPassword, newPassword) {
        checkObjectId(idUser);
        if(!newPassword) throw new ServerError("NEW_PASSWORD_INVALID",400);
        
        const user = await Employee.findById(idUser);
        if(!user) throw new ServerError("CANNOT_FIND_EMPLOYEE",404);

        const checkOldPass = await compare(oldPassword, user.password);
        if(!checkOldPass) throw new ServerError("CANNOT_FIND_EMPLOYEE",404);
        
        const newPasswordHash = await hash(newPassword, 8);
        user.password = newPasswordHash;
        return user.save();
    }

    static async updateRole(idUserCurrent = '5ba3d0e93430442304c5576d', idUserUpdate, nameRoleSlug) {
        
        //nameRole = slug
        checkObjectId(idUserCurrent, idUserUpdate);
        const adminCurrent = await Employee.findById(idUserCurrent).populate('role');
        if(!adminCurrent)
            throw new ServerError("CANNOT_FIND_ADMIN",404);
        if(adminCurrent.role.slug !== "boss")
            throw new ServerError("UNAUTHORIZED",400);
        if(idUserCurrent === idUserUpdate)
            throw new ServerError("CANNOT_UPDATE_YOURSELF",400);
        const roleUpdate = await Role.findOne({slug: nameRoleSlug});
        if(!roleUpdate)
            throw new ServerError("CANNOT_FIND_ROLE",400);
        const adminUpdate = await Employee.findByIdAndUpdate(idUserUpdate, {role: roleUpdate._id}, {new: true});
        if(!adminUpdate)
            throw new ServerError("ERROR_NOT_DEFINE",400);
        return adminUpdate;
    }
}

module.exports = { EmployeeService };