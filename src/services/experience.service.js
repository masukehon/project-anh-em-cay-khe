const { ServerError } = require("../models/my-error.model");
const { Experience } = require("../models/experience.model");
const { checkObjectId } = require("../helpers/checkObjectId");

class ExperienceService {

    static async getAll() {
        return Experience.find({});
    }
    static  async getById(id) {
        checkObjectId(id);
        return Experience.findById(id);
    }
    static async create(title, link) {
        if(!title) throw new ServerError("TITLE_INVALID",400);
        if(!link) throw new ServerError("LINK_INVALID",400);

        const exp = new Experience({title, link});
        return exp.save();
    }

    static async update(id, title, link) {
        checkObjectId(id);
        if(!title) throw new ServerError("TITLE_INVALID",400);
        if(!link) throw new ServerError("LINK_INVALID",400);

        const exp = await Experience.findByIdAndUpdate(id, {title, link}, {new: true});
        if(!exp) throw new ServerError("CANNOT_FIND_EXPERIENCE", 400);

        return exp.save();
    }

    static async remove(id) {
        checkObjectId(id);
        const exp = await Experience.findByIdAndRemove(id);
        if(!exp) throw new ServerError("CANNOT_FIND_EXPERIENCE",404);

        return exp;
    }
}

module.exports = { ExperienceService };