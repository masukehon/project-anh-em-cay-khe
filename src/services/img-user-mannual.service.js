const { ImgUserMannual } = require("../models/image-user-manual.model");
const { Employee } = require("../models/employee.model");
const { ServerError } = require("../models/my-error.model");
const { upload } = require("../helpers/multer");


class ImgUserMannualService {
    static async create() {
            return (new ImgUserMannual()).save();
        }
    static async remove() {
            return ImgUserMannual.remove();
        }
    static async update(idUser, req, res) {
        return new Promise((resolve, reject) => {
            upload.single("image")(req, res, async error => {
                const admin = await Employee.findById(idUser);

                if (!admin)
                    return reject(new ServerError("CANNOT_FIND_EMPLOYEE", 400));
                if (error)
                    return reject(new ServerError("UPLOAD_IMAGE_ERROR", 400));
                const imgs = req.files;
                const imgUserMan = await ImgUserMannual.findOne({});

                if (!req.file)return reject(new ServerError("IMAGES_INVALID", 400));
                imgUserMan.image = req.file.filename;
                
                const updateImgUserMan = imgUserMan.save();
                return resolve(updateImgUserMan);
            });
        });
    }
    static async getAll(){
        return ImgUserMannual.findOne({});
    }
}
module.exports= { ImgUserMannualService };