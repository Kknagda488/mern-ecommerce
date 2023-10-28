'use strict';

module.exports = function (Cart) {
    Cart.fetchCartByUser = async function (userId, cb) {
        try {
            const cartItems = await Cart.find({ where: { user: userId }, include: 'product' });
            cb(null, cartItems);
        } catch (err) {
            cb(err);
        }
    };

    Cart.addToCart = async function (req, res, data, cb) {
        const { id } = req.user;
        data.user = id;
        try {
            const cart = new Cart(data);
            const doc = await cart.save();
            const result = await doc.product.get(); // Assuming 'product' is the relation name
            cb(null, result);
        } catch (err) {
            cb(err);
        }
    };
    Cart.deleteFromCart = async function (id, cb) {
        try {
            const cartItem = await Cart.findById(id);
            if (!cartItem) {
                return cb({ statusCode: 404, message: 'Cart item not found' });
            }
            await cartItem.delete();
            cb(null, cartItem);
        } catch (err) {
            cb(err);
        }
    };

    Cart.updateCart = async function (id, data, cb) {
        try {
            const cartItem = await Cart.findById(id);
            if (!cartItem) {
                return cb({ statusCode: 404, message: 'Cart item not found' });
            }
            const updatedCartItem = await cartItem.updateAttributes(data);
            const result = await Cart.findById(updatedCartItem.id, { include: 'product' });
            cb(null, result);
        } catch (err) {
            cb(err);
        }
    };
};
