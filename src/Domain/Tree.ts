export default class Tree {
    id: string;
    name: string;
    description: string;
    image: string;
    value: number;
    biome: string;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: Partial<Tree>) {
        Object.assign(this, data);
    }

}