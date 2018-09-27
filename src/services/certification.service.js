const { Certification } = require("../models/certification.model");
const { Employee } = require("../models/employee.model");
const { ServerError } = require("../models/my-error.model");
const { upload } = require("../helpers/multer");
const uploadAWS = require("../helpers/uploadAWS");

class CertificationService {

    static async create() {
        return (new Certification()).save();
    }
    static async update(idUser, req, res) {
        return new Promise((resolve, reject) => {
            upload.array("images")(req, res, async error => {
                const admin = await Employee.findById(idUser);
           
                if (!admin)
                    return reject(new ServerError("CANNOT_FIND_ADMIN", 400));
                if (error)
                    return reject(new ServerError("UPLOAD_IMAGE_ERROR", 400));
                const imgs = req.files;
                const cer = await Certification.findOne({});
                cer.images = [];
                if (imgs.length == 0)return reject(new ServerError("IMAGES_INVALID", 400));              
                await uploadAWS('array',imgs,null)
                .then(key=>{
                    key.forEach(img => {
                        cer.images.push(img);
                    });
                })      
                const updateCer = cer.save();
                return resolve(updateCer);
            });
        });
    }
    static async getAll(){
        return Certification.findOne();
    }
}

module.exports = { CertificationService };