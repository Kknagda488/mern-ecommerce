'use strict';

module.exports = function (Order) {
    Order.fetchOrdersByUser = async function (userId, cb) {
        try {
            const orders = await Order.find({ where: { user: userId } });
            cb(null, orders);
        } catch (err) {
            cb(err);
        }
    };
    Order.createOrder = async function (order, cb) {
        try {
            for (const item of order.items) {
                if (!item.product || !item.product.id) {
                    // Handle the case where item.product or item.product.id is undefined
                    return cb(new Error('Invalid item or product ID.'));
                }
                const product = await Order.app.models.Product.findById(item.product.id);
                await product.updateAttributes({ stock: product.stock - item.quantity });
            }

            const createdOrder = await Order.create(order);
            const user = await Order.app.models.User.findById(order.user);
            // Use `await` for sending the email
            await Order.app.services.common.sendMail({
                to: user.email,
                html: Order.app.services.common.invoiceTemplate(order),
                subject: 'Order Received',
            });
            cb(null, createdOrder);
        } catch (err) {
            cb(err);
        }
    };

    Order.deleteOrder = async function (id, cb) {
        try {
            const order = await Order.findById(id);
            if (!order) {
                return cb({ statusCode: 404, message: 'Order not found' });
            }
            await order.delete();
            cb(null, order);
        } catch (err) {
            cb(err);
        }
    };

    Order.updateOrder = async function (id, data, cb) {
        try {
            const order = await Order.findById(id);
            if (!order) {
                return cb({ statusCode: 404, message: 'Order not found' });
            }
            const updatedOrder = await order.updateAttributes(data);
            cb(null, updatedOrder);
        } catch (err) {
            cb(err);
        }
    };

    Order.fetchAllOrders = async function (filter, cb) {
        try {
            const totalDocs = await Order.count({ where: { deleted: { neq: true } } });
            const query = { where: { deleted: { neq: true } } };
            if (filter.order) {
                query.order = filter.order;
            }
            if (filter.limit && filter.skip) {
                query.limit = filter.limit;
                query.skip = filter.skip;
            }
            const orders = await Order.find(query);
            cb(null, orders, totalDocs);
        } catch (err) {
            cb(err);
        }
    };
};
