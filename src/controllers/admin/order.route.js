const { Router } = require("express");
const { OrderService } = require("../../services/order.service");

const orderRouter = Router();

orderRouter.get('/', (req, res, next) => {
    OrderService.getAll()
    .then(orders => res.status(200).send({success:true, orders}))
    .catch(res.onError);
});

orderRouter.get('/:id', (req, res, next) => {
    OrderService.getOne(req.params.id)
    .then(orders => res.status(200).send({success:true, orders}))
    .catch(res.onError);
});

orderRouter.post('/create', (req, res, next) => {
    const {name, email, phone} = req.body;
    OrderService.Create(name, email, phone)
    .then(orders => res.status(200).send({success:true, orders}))
    .catch(res.onError);
});

module.exports = {orderRouter};