const { ServerError } = require("../models/my-error.model");
const { Order } = require("../models/order.model");
const { checkObjectId } = require("../helpers/checkObjectId");

class OrderService {

    static async getAll() {
        return Order.find({}).sort({ requiredDate: -1});
    }

    static async getOne(_id) {
        checkObjectId(_id);

        const order = await Order.findById( _id);
        if(!order) throw new ServerError("ORDER_NOT_FOUND",404);

        //khi lần đầu nhân viên xem, order này sẽ update isSeen
        if(!order.isSeen) {
            order.isSeen = true;
            return order.save();
        }

        return order;
    }
    static async Create(name, email, phone) {
        if(!name || !email || !phone)
            throw new ServerError("INFORMATION_ORDER_INVALID",400);
        
        const order = new Order({customerName: name, email, phone, isSeen: false, requiredDate: Date.now()});
        return order.save();
    }
   
}

module.exports = {OrderService};