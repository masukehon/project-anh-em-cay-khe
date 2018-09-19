const mongoose = require("mongoose");

const { Schema } = mongoose;

const informationSchema = new Schema({
    hotline: { type: String, trim: true},
    facebook: { type: String, trim: true},
    instagram: { type: String, trim: true},
    email: { type: String, trim: true},
    address: { type: String, trim: true},
    banner: { type: String, trim: true },
    centerImage: { type: String, trim: true}
});

const Information = mongoose.model('Information',informationSchema);

module.exports = { Information };