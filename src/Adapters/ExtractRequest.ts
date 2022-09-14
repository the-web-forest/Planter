import { HttpRequest } from "@azure/functions";
import PartnerPlant from "../Domain/PartnerPlant";

export default class Request {
    static extractPartnerPlant(request: HttpRequest): PartnerPlant {
        const body = request.body;
        return new PartnerPlant({
            userEmail: body['r6212ea4c87564c0ab60bff9921a93611'],
            orderId: body['rcb7948e58ab643049ab9be48dabe3f43'],
            partnerPassword: body['r6621d1c6613d4f87beaa8fc659fb4828'],
            partnerCode: parseInt(body['rb1920c42d6ac479682e436f5863d0506'].split('-')[0]),
            partnerName: body['rb1920c42d6ac479682e436f5863d0506'].split('-')[1]
        })

    }
}