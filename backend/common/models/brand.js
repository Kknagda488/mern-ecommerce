'use strict';

module.exports = function (Brand) {
    Brand.fetchBrands = async function (cb) {
        try {
            const brands = await Brand.find();
            cb(null, brands);
        } catch (err) {
            cb(err);
        }
    };


    Brand.createBrand = async function (data, cb) {
        const brand = new Brand(data);
        try {
            const createdBrand = await Brand.create(brand);
            cb(null, createdBrand);
        } catch (err) {
            cb(err);
        }
    };
};
