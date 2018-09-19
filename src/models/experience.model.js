const mongoose = require("mongoose");

const { Schema } = mongoose;

const experienceSchema = new Schema({
    title: { type: String, trim: true, required: true },
    link:  { type: String, trim: true, required: true }
});

const Experience = mongoose.model('Experience',experienceSchema);

module.exports = { Experience };