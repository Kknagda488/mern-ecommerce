'use strict';

module.exports = function (Products) {
    Products.createProduct = async function (product, cb) {
        product.discountPrice = Math.round(product.price * (1 - product.discountPercentage / 100));
        try {
            const createdProduct = await Products.create(product);
            cb(null, createdProduct);
        } catch (err) {
            cb(err);
        };
    }
    Products.getAllProducts = async function (cb) {


        // Sample implementation, replace with your own logic
        try {
            const product = await Products.find();
            cb(null, product);
        } catch (err) {
            cb(err);
        }
    };
    Products.fetchProductById = function (id, cb) {
        Products.findById(id, function (err, product) {
            if (err) {
                cb(err);
            } else if (!product) {
                var error = new Error('Product not found');
                error.status = 404;
                cb(error);
            } else {
                cb(null, product);
            }
        });
    };

    Products.updateProduct = function (productId, productData, cb) {
        Products.findById(productId, function (err, product) {
            if (err) {
                return cb(err);
            }
            if (!product) {
                const error = new Error('Product not found');
                error.status = 404;
                return cb(error);
            }
            product.updateAttributes(productData, function (err, updatedProduct) {
                if (err) {
                    return cb(err);
                }
                cb(null, updatedProduct);
            });
        });
    };
}