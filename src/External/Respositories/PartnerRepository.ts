import { model, Mongoose } from "mongoose";
import Partner from "../../Domain/Partner";
import PartnerSchema from "../../Schemas/Partner.schema";

export default class PartnerRepository {
   
    async getPartnerByCode(code: number): Promise<Partner> {
        const partnerModel = model<Partner>('Partner', PartnerSchema);
        return partnerModel.findOne({ code })
    }

}