const mongoose = require("mongoose");

const { Schema } = mongoose;

const roleSchema = new Schema({
    name: { type: String, trim: true, required: true },
    slug: { type: String, trim: true, required: true }
});

const Role = mongoose.model('Role',roleSchema);

module.exports = { Role };