const { ServerError } = require("../models/my-error.model");
const { Employee } = require("../models/employee.model");
const { hash, compare } = require("bcrypt");
const { sign } = require("../helpers/jwt");

class EmployeeService {

    static async SignUp(name, email, password) {
        const employee = await Employee.findOne({email});
        if (employee)
            throw new ServerError("EMAIL_EXISTED",400);
        let passHashed = await hash(password, 8);
        const newEmployee = new Employee({name, email, password: passHashed});
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
    static async Update() {

    }
}

module.exports = { EmployeeService };