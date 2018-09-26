const { CertificationService } = require("./certification.service");
const { DynamicService } = require("./dynamic.service");
const { ExperienceService } = require("./experience.service");
const { ImgUserMannualService } = require("./img-user-mannual.service");
const { InformationService } = require("./information.service");
const { Dynamic } = require("../models/dynamic.model");

class SiteService {
    static async getAll() {
        const certification = await CertificationService.getAll();
        const experience = await ExperienceService.getAll();
        const imgUM = await ImgUserMannualService.getAll();
        const information = await InformationService.Get();
        const feature = await DynamicService.getAll('feature');
        const technology = await DynamicService.getAll('technology');

        //vì bên view site của component lấy theo highlight
        var component = await Dynamic.find().populate({
            path: 'category',
            match: {
              name: 'component'
            }
          }).sort({isHighLight: -1});
        component = component.filter(d =>  d.category && d.category.name === 'component');

        const introduction = await DynamicService.getAll('introduction');
        const uses = await DynamicService.getAll('uses');
        const user_manual = await DynamicService.getAll('user_manual');
        const product_recognition = await DynamicService.getAll('product_recognition');
        const slide = await DynamicService.getAll('slide');
        const dosage = await DynamicService.getAll('dosage');

        const data = { certification, experience, imgUM, information, feature, technology, 
                    component, introduction, uses, dosage, user_manual, product_recognition, slide };
        return data;
    }
}

module.exports = { SiteService };