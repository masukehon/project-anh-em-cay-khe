const { ServerError } = require("../models/my-error.model");
const { Information } = require("../models/information.model");
const { Employee } = require("../models/employee.model");
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

    static Update(req, res) {
        
        return new Promise((resolve, reject) => {
            const fieldsConfig = [
                        { name: "banner", maxCount: 1 },
                        { name: "centerImage", maxCount: 1 }
                    ];
                upload.fields(fieldsConfig)(req, res, async error =>  {
                    const employee = await Employee.findById(req.idUser);

                    if(!employee)
                        return reject(new ServerError("CANNOT_FIND_EMPLOYEE",400));
                    if(error)
                        return reject(new ServerError("UPLOAD_IMAGE_ERROR",400));

                    const {hotline, facebook, instagram, address, email} = req.body;
                    if(req.files) {
                        const data = {hotline, facebook, instagram, address, email};
                        const { banner, centerImage } = req.files;
                        
                        if(banner)
                            data.banner = banner[0].filename;
                        if(centerImage)
                            data.centerImage = centerImage[0].filename;
                            
                        return resolve(Information.findOneAndUpdate({}, data, { new: true }));
                    }
                    else {
                        const data = {hotline, facebook, instagram, address, email};
                        return resolve(Information.findOneAndUpdate({}, data, { new: true }));
                    }
            });
        });
    }
    static async Get() {
        return Information.findOne({});   
    }
}

module.exports = { InformationService };