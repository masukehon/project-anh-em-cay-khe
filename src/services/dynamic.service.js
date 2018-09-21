const { ServerError } = require("../models/my-error.model");
const { Dynamic } = require("../models/dynamic.model");
const { Employee } = require("../models/employee.model");
const { upload } = require("../helpers/multer");


class DynamicService {
    static async getAll(dynamicName) {
        return Dynamic.find().populate({
            path: 'category',
            match: {
              name: dynamicName
            }
          });
    }

    static async getOne(id) {
        return Dynamic.findById(id);
    }

    static async create(req, res, dynamicName) {

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
                var imagePrimary, imageSub;

                if(req.files) {
                    if(req.files.imagePrimary[0])
                        imagePrimary = req.files.imagePrimary[0].filename;
                    if(req.files.imageSub[0])
                        imageSub = req.files.imageSub[0].filename;
                }
                data.imagePrimary = imagePrimary;
                data.imageSub = imageSub;
                
                const dynamic = new Dynamic({data, category: dynamicName});
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
                
                const data = { title, content };

                if(req.files) {

                    var imagePrimary, imageSub;
                    if(req.files.imagePrimary[0])
                        imagePrimary = req.files.imagePrimary[0].filename;
                    if(req.files.imageSub[0])
                        imageSub = req.files.imageSub[0].filename;
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
        const dynamic = await Dynamic.removeById(idDynamic);
        if(!dynamic)
            throw new ServerError("NOT_FOUND",404);
        return dynamic;
    }
}

module.exports = { DynamicService }; 