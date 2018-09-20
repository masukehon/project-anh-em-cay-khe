const mongoose = require("mongoose");
const { ServerError } = require("../models/my-error.model");

function checkObjectId(...ids) {
    try {
        ids.forEach(id => new mongoose.Types.ObjectId(id.toString()));
    } catch (error) {
        throw new ServerError("INVALID_ID", 400);
    }
}

module.exports = { checkObjectId };