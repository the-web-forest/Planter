import { Context } from "@azure/functions";
import Partner from "../../Domain/Partner";
import PartnerPlant from "../../Domain/PartnerPlant";
import Plant from "../../Domain/Plant";
import Tree from "../../Domain/Tree";
import User from "../../Domain/User";
import PartnerRepository from "../../External/Respositories/PartnerRepository";
import PlantRepository from "../../External/Respositories/PlantRepository";
import TreeRepository from "../../External/Respositories/TreeRepository";
import UserRepository from "../../External/Respositories/UserRepository";
import TimeHelper from "../../Helpers/TimeHelper";
import NewPartnerPlantUseCaseOutput from "./NewPartnerPlantUseCaseOutput";

export default class NewPartnerPlantUseCase {

    private readonly partnerRepository: PartnerRepository;
    private readonly treeRepository: TreeRepository;
    private readonly userRepository: UserRepository;
    private readonly plantRepository: PlantRepository;
    private readonly context: Context;

    constructor(context: Context, partnerRepository: PartnerRepository, treeRepository: TreeRepository, userRepository: UserRepository, plantRepository: PlantRepository) {
        this.context = context;
        this.partnerRepository = partnerRepository;
        this.treeRepository = treeRepository;
        this.userRepository = userRepository;
        this.plantRepository = plantRepository;
    }

    async run(partnerPlant: PartnerPlant): Promise<NewPartnerPlantUseCaseOutput> {
        const response = new NewPartnerPlantUseCaseOutput(partnerPlant);
        const partner = await this.getPartnerByCode(partnerPlant.partnerCode);
        
        
        if (!partner) {
            return response.fail('Invalid Partner');
        }

        const isValidPartner = this.validatePartner(partnerPlant, partner); 

        if (!isValidPartner) {
            return response.failWithPartner('Invalid Password', partner.email);
        }

        const partnerTree = await this.getPartnerTreeById(partner.tree);
        
        this.context.log(`Info :: NewPartnerPlantUseCase :: PartnerTree => ${JSON.stringify(partnerTree || {})}`)
    
        if (!partnerTree) {
            return response.failWithPartner('Invalid Tree', partner.email);
        }

        const user = await this.getUserByEmail(partnerPlant.userEmail);
        this.context.log(`Info :: NewPartnerPlantUseCase :: User => ${JSON.stringify(user || {})}`)
        await this.plant(partnerTree, partner, partnerPlant, user);
        return response.success(partner.email);
    }

    private async getPartnerByCode(partnerCode: number): Promise<Partner> {
        return this.partnerRepository.getPartnerByCode(partnerCode);
    }

    private async getPartnerTreeById(treeId: string): Promise<Tree> {
        return this.treeRepository.getTreeById(treeId);
    }

    private async getUserByEmail(userEmail: string): Promise<User> {
        return this.userRepository.getUserByEmail(userEmail);
    }

    private validatePartner(partnerPlant: PartnerPlant, partner: Partner): boolean {
        return partnerPlant.partnerPassword === partner.password;
    }

    private async plant(partnerTree: Tree, partner: Partner, partnerPlant: PartnerPlant, user: User) {
        const plant = new Plant({
            name: null,
            message: null,
            hastags: [],
            biome: partnerTree.biome,
            description: partnerTree.description,
            species: partnerTree.name,
            image: partnerTree.image,
            value: partnerTree.value,
            createdAt: TimeHelper.getBrazilTime(),
            updatedAt: TimeHelper.getBrazilTime(),
            orderId: null,
            treeId: partnerTree.id,
            userId: user ? user.id : partnerPlant.userEmail,
            partnerId: partner.id,
            partnerName: partner.name,
            partnerUrl: partner.url
        })
        this.context.log(`Info :: NewPartnerPlantUseCase :: Plant => ${JSON.stringify(plant)}`)
        await this.plantRepository.create(plant);
    }
}