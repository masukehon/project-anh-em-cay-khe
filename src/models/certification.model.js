const mongoose = require("mongoose");

const { Schema } = mongoose;

const certificationSchema = new Schema({
    images: [{ type: String, trim: true }]
});

const Certification = mongoose.model('Certification',certificationSchema);

module.exports = { Certification };