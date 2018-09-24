const { ServerError } = require("../models/my-error.model");
const { Order } = require("../models/order.model");

async function getOrdersNotSeen(){
    return Order.find({ isSeen: false })
        .then(orders => {
            orders.forEach(order => {
                order.distanceTime = Math.floor((new Date().getTime() - order.requiredDate.getTime())/1000); //=> ra giây
                if(order.distanceTime < 60)
                    order.distanceTime = "Vừa xong";
                else if(order.distanceTime < 3600) {
                    const minutes = Math.floor(order.distanceTime/60);
                    order.distanceTime = minutes + " phút trước";
                }
                else if(order.distanceTime < 86400) {
                    const hours = Math.floor(order.distanceTime/3600);
                    order.distanceTime = hours + " giờ trước";
                }
                else if(order.distanceTime < 2592000){
                    const days = Math.floor(order.distanceTime/86400);
                    order.distanceTime = days + " ngày trước";
                }
                else if(order.distanceTime < 31104000){
                    const months = Math.floor(order.distanceTime/2592000);
                    order.distanceTime = months + " tháng trước";
                }
                else {
                    order.distanceTime = "";
                }
            });
            return orders;
        });
}

module.exports = getOrdersNotSeen;