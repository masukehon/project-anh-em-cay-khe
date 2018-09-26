const { ServerError } = require("../models/my-error.model");
const { Category } = require("../models/category.model");
const { checkObjectId } = require("../helpers/checkObjectId");
const { str_slug } = require("../helpers/str-slug");

class CategoryService {

    static async getAll() {
        return Category.find({});
    }

    static async createAll() {
        await (new Category({name: "feature"})).save();
        await (new Category({name: "technology"})).save();
        await (new Category({name: "component"})).save();
        await (new Category({name: "introduction"})).save();
        await (new Category({name: "uses"})).save();
        await (new Category({name: "user_manual"})).save();
        await (new Category({name: "product_recognition"})).save();
        await (new Category({name: "slide"})).save();
        await (new Category({name: "dosage"})).save();
        return true;
    }

    static async removeAll() {
        return Category.remove({});
    }
   
}

module.exports = { CategoryService };