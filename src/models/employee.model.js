const mongoose = require("mongoose");

const { Schema } = mongoose;

const employeeSchema = new Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true }
});

const Employee = mongoose.model('Employee',employeeSchema);

module.exports = { Employee };