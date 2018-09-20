const mongoose = require("mongoose");

const { Schema } = mongoose;

const roleSchema = new Schema({
    roleName: { type: String, trim: true, required: true }
});

const Role = mongoose.model('Role',roleSchema);

module.exports = { Role };