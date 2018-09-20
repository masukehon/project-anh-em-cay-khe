const { ServerError } = require("../models/my-error.model");
const { Role } = require("../models/role.model");
const { checkObjectId } = require("../helpers/checkObjectId");
const { str_slug } = require("../helpers/str-slug");

class RoleService {

    static async getAll() {
        return Role.find({});
    }

    static async create(name) {
        if(!name)
            throw new ServerError("INFORMATION_ROLE_INVALID",400);
        const slug = str_slug(name);
        const role = new Role({name, slug});
        return role.save();
    }

    static async remove(id) {
        checkObjectId(id);
        const role = await Role.findByIdAndRemove(id);
        if(!role)
            throw new ServerError("CANNOT_FIND_ROLE",400);
        return role;
    }
   
}

module.exports = { RoleService };