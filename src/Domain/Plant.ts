export default class Plant {
    id: string;
    orderId: string;
    userId: string;
    treeId: string;
    name: string;
    message: string;
    biome: string;
    species: string;
    image: string;
    description: string;
    value: number;
    createdAt: Date;
    updatedAt: Date;
    hastags: string[];
    partnerId: string;
    partnerName: string;
    partnerUrl: string;
    
    constructor(data: Partial<Plant>) {
        Object.assign(this, data);
    }

}