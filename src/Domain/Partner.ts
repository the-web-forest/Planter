export default class Partner {
    id: string;
    name: string;
    code: number;
    password: string;
    email: string;
    tree: string;
    url: string;

    constructor(data: Partial<Partner>) {
        Object.assign(this, data);
    }

}