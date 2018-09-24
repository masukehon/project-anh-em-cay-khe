const { ServerError } = require("../models/my-error.model");
const { Order } = require("../models/order.model");
const { checkObjectId } = require("../helpers/checkObjectId");
const getOrdersNotSeen = require("../helpers/getOrdersNotSeen");
const dateFormat = require('dateformat');

class OrderService {

    static async getAll() {
        return Order.find({}).sort({ requiredDate: -1 })
            .then(orders => {
                orders.forEach(order => {
                    order.dateToString = dateFormat(order.requiredDate, "mmmm dS, yyyy, h:MM:ss TT");
                });
                return orders;
            });
    }

    static async getOne(req) {
        const { id } = req.params;
        checkObjectId(id);

        const order = await Order.findById(id);
        if (!order) throw new ServerError("ORDER_NOT_FOUND", 404);

        //khi lần đầu nhân viên xem, order này sẽ update isSeen
        if (!order.isSeen) {
            order.isSeen = true;
            const saveOrder = await order.save();
            if (saveOrder) {
                // getOrdersNotSeen()
                //     .then(orders => req.app.locals.ordersNotSeen = orders)
                //     .catch(error => console.log(error));
                return saveOrder;
            }
        }

        return order;
    }
    static async Create(name, email, phone, req) {
        if (!name || !email || !phone)
            throw new ServerError("INFORMATION_ORDER_INVALID", 400);

        const order = new Order({ customerName: name, email, phone, isSeen: false, requiredDate: Date.now() });
        const saveOrder = await order.save();
        if (saveOrder) {
            // getOrdersNotSeen()
            //     .then(orders => req.app.locals.ordersNotSeen = orders)
            //     .catch(error => console.log(error));
            return saveOrder;
        }
    }

}

module.exports = { OrderService };