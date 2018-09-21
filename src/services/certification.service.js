const { Certification } = require("../models/certification.model");
const { Employee } = require("../models/employee.model");
const { ServerError } = require("../models/my-error.model");
const { upload } = require("../helpers/multer");

class CertificationService {

    // static async create() {
    //     return (new Certification()).save();
    // }
    static async update(idUser = '5ba3d0e93430442304c5576d', req, res) {
        return new Promise((resolve, reject) => {
            upload.array("image")(req, res, async error => {
                const admin = await Employee.findById(idUser);
                
                if (!admin)
                    return reject(new ServerError("CANNOT_FIND_EMPLOYEE", 400));
                if (error)
                    return reject(new ServerError("UPLOAD_IMAGE_ERROR", 400));
                const imgs = req.files;
                const cer = await Certification.findOne({});
                cer.images = [];
                if (imgs) {
                    imgs.forEach(img => {
                        cer.images.push(img.filename);
                    });
                }
                const updateCer = cer.save();
                return resolve(updateCer);
            });
        });
    }
}

module.exports = { CertificationService };