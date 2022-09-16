import { HttpRequest } from "@azure/functions";
import PartnerPlant from "../Domain/PartnerPlant";

export default class Request {
    static extractPartnerPlant(request: HttpRequest): PartnerPlant {
        const body = request.body;
        return new PartnerPlant({
            userEmail: body.userEmail,
            orderId: body.orderId,
            partnerPassword: body.partnerPassword,
            partnerCode: body.partner.split('-')[0],
            partnerName: body.partner.split('-')[1]
        })

    }
}