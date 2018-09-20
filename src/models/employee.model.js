const mongoose = require("mongoose");

const { Schema } = mongoose;

const employeeSchema = new Schema({
    name: { type: String, trim: true, required: true },
    phone: { type: String, trim: true},
    address: { type: String, trim: true},
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    idRole: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' }
});

const Employee = mongoose.model('Employee',employeeSchema);

module.exports = { Employee };