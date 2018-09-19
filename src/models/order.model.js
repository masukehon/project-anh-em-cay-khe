const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
    customerName: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true }
});

const Order = mongoose.model('Order',orderSchema);

module.exports = { Order };