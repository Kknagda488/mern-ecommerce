'use strict';

module.exports = function (Category) {
    Category.fetchCategories = async function (cb) {
        try {
            const categories = await Category.find({});
            cb(null, categories);
        } catch (err) {
            cb(err);
        }
    };

    Category.createCategory = async function (data, cb) {
        const category = new Category(data);
        try {
            const createdCategory = await Category.create(category);
            cb(null, createdCategory);
        } catch (err) {
            cb(err);
        }
    };
};
