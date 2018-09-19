const { ServerError } = require("../models/my-error.model");
const { Information } = require("../models/information.model");
const { sign } = require("../helpers/jwt");
const { upload } = require("../helpers/multer");

class InformationService {

    // static async Create(){
    //     const Info = new Information();
    //     Info.save()
    //     .then(infor => console.log(infor))
    //     .catch(error => console.log(error));
    // }
    // static async Remove(){
    //     const Info = await Information.findByIdAndRemove('5ba1fb4dd48a3f3a481039bf');
    //     return Info;
    // }

    static async Update(hotline, facebook, instagarm, address, email, banner, centerImage) {
        const fieldsConfig = [
                    { name: "banner", maxCount: 1 },
                    { name: "centerImage", maxCount: 1 }
                ];
        upload.fields(fieldsConfig)(req,res, error => {
            if(error)
                throw new ServerError("UPLOAD_IMAGE_ERROR",400);
            const {hotline, facebook, instagarm, address, email} = req.body;
            const images = req.files.filename;
            const infor = new Information({hotline, facebook, instagarm, address,email, images});
            return infor.save();
        });
    }
    static async Get() {
        const infor=await Information.findOne({});
        return infor;
    }
}

module.exports = { InformationService };