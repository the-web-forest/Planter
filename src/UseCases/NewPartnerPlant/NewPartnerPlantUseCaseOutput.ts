import PartnerPlant from "../../Domain/PartnerPlant";

export default class NewPartnerPlantUseCaseOutput {
    planted: boolean;
    message: string;
    partnerEmail: string;
    partnerPlant: PartnerPlant;

    constructor(partnerPlant: PartnerPlant){
        this.partnerPlant = { ...partnerPlant, partnerPassword: '****' }
    }
    
    public success(partnerEmail: string): NewPartnerPlantUseCaseOutput {
        this.planted = true;
        this.message = 'Planted with success';
        this.partnerEmail = partnerEmail;
        return this;
    }

    public fail(message: string): NewPartnerPlantUseCaseOutput {
        this.planted = false;
        this.message = message;
        return this;
    }

    public failWithPartner(message: string, partnerEmail: string): NewPartnerPlantUseCaseOutput {
        this.planted = false;
        this.message = message;
        this.partnerEmail = partnerEmail;
        return this;
    }
}