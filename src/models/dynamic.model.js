const mongoose = require("mongoose");

const { Schema } = mongoose;

const dynamicSchema = new Schema({
    title: { type: String, trim: true },
    content: { type: String, trim: true },
    isHighLight: { type: Boolean },
    unit: { type: Number, trim: true },
    imagePrimary: { type: String, trim: true},
    imageSub: { type: String, trim: true},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

const Dynamic = mongoose.model('Dynamic',dynamicSchema);

module.exports = { Dynamic };