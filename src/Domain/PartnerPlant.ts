export default class PartnerPlant {
    partnerName: string;
    partnerCode: number;
    partnerPassword: string;
    orderId: string;
    userEmail: string;
    date: string;

    constructor(data: Partial<PartnerPlant>) {
        Object.assign(this, data);
    }

}