const { ServerError } = require("../models/my-error.model");
const { Dynamic } = require("../models/dynamic.model");
const { Category } = require("../models/category.model");
const { Employee } = require("../models/employee.model");
const { upload } = require("../helpers/multer");
const uploadAWS = require('../helpers/uploadAWS');


class DynamicService {
    static async getAll(dynamicName) {
        const dynamics = await Dynamic.find().populate({
            path: 'category',
            match: {
              name: dynamicName
            }
          });
        const data = dynamics.filter(d =>  d.category && d.category.name === dynamicName);
        return data;
    }

    static async getOne(id) {
        return Dynamic.findById(id);
    }

    static async create(req, res ) {
        const { dynamicName } = req.params;
        console.log(dynamicName);
        const obj = await Category.findOne({name: dynamicName});
        console.log(obj);
        const idCategory = obj._id;
        return new Promise((resolve, reject) => {
            const fieldsConfig = [
                { name: "imagePrimary", maxCount: 1 },
                { name: "imageSub", maxCount: 1 }
            ];
            upload.fields(fieldsConfig)(req, res, async error => {
                const employee = await Employee.findById(req.idUser);
                
                if (!employee)
                    return reject(new ServerError("CANNOT_FIND_EMPLOYEE", 400));
                if (error) {
                    return reject(new ServerError("UPLOAD_IMAGE_ERROR", 400));
                }

                const { title, content, isHighLight, unit } = req.body;
                
                const data = { title, content, isHighLight, unit };
                var imagePrimary, imageSub;
                
                if(req.files) {
                    await uploadAWS('fields',req.files,fieldsConfig)
                    .then(key=>{
                        key.forEach(img => {
                            if(img && img.varName ==="imagePrimary"){
                                imagePrimary = img.filename}
                            if(img && img.varName ==="imageSub")
                                imageSub = img.filename;
                        });
                    })
                }
                data.imagePrimary = imagePrimary;
                data.imageSub = imageSub;
                data.category = idCategory;
                data.isHighLight = false;
                if(isHighLight == "on")
                data.isHighLight = true;

                
                const dynamic = new Dynamic(data);
                return resolve(dynamic.save());
            });
        });
    }

    static async update(req, res, idDynamicUpdate) {

        return new Promise((resolve, reject) => {
            const fieldsConfig = [
                { name: "imagePrimary", maxCount: 1 },
                { name: "imageSub", maxCount: 1 }
            ];
            upload.fields(fieldsConfig)(req, res, async error => {

                const employee = await Employee.findById(req.idUser);

                if (!employee)
                    return reject(new ServerError("CANNOT_FIND_EMPLOYEE", 400));
                if (error)
                    return reject(new ServerError("UPLOAD_IMAGE_ERROR", 400));

                const { title, content, isHighLight, unit } = req.body;
                
                const data = { title, content, isHighLight, unit };

                data.isHighLight = false;
                if(isHighLight == "on")
                data.isHighLight = true;

                if(Object.keys(req.files).length !== 0) {
                    var imagePrimary, imageSub;
                    await uploadAWS('fields',req.files,fieldsConfig)
                    .then(key => {
                        key.forEach(img=>{
                            if(img && img.varName ==="imagePrimary"){
                                imagePrimary = img.filename}
                            if(img && img.varName ==="imageSub")
                                imageSub = img.filename;
                        });
                    })     
                    data.imagePrimary = imagePrimary;
                    data.imageSub = imageSub;

                    const dynamicUpdate = await Dynamic.findByIdAndUpdate(idDynamicUpdate, data);
                    return resolve(dynamicUpdate);
                }
                    
                const dynamicUpdate = await Dynamic.findByIdAndUpdate(idDynamicUpdate, data);
                return resolve(dynamicUpdate);
            });
        });
    }

    static async remove(idDynamic) {
        const dynamic = await Dynamic.findByIdAndRemove(idDynamic);
        if(!dynamic)
            throw new ServerError("NOT_FOUND",404);
        return dynamic;
    }
}

module.exports = { DynamicService }; 