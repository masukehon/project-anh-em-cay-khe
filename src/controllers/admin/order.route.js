const { Router } = require("express");
const { OrderService } = require("../../services/order.service");

const orderRouter = Router();

orderRouter.get('/', (req, res, next) => {
    OrderService.getAll()
    .then(orders => {
        res.render('admin/master',{ page:"formOrderGet", orders, messages: req.flash('order')});
    })
    .catch(error => res.onError(error, null, 'order'));
});

orderRouter.get('/:id', (req, res, next) => {
    OrderService.getOne(req)
    .then(orders => {
        req.flash('order', 'Successful status change');
        res.redirect('back');
    })
    .catch(error => res.onError(error, null, 'order'));
});

orderRouter.post('/create', (req, res, next) => {
    const {name, email, phone} = req.body;
    OrderService.Create(name, email, phone, req)
    .then(orders => {
        console.log('thanh cong');
    })
    .catch(res.onError);
});

module.exports = {orderRouter};