import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import mongoose from "mongoose";
import Request from "../src/Adapters/ExtractRequest";
import PartnerRepository from "../src/External/Respositories/PartnerRepository";
import PlantRepository from "../src/External/Respositories/PlantRepository";
import TreeRepository from "../src/External/Respositories/TreeRepository";
import UserRepository from "../src/External/Respositories/UserRepository";
import NewPartnerPlantUseCase from "../src/UseCases/NewPartnerPlant/NewPartnerPlantUseCase";



const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    await mongoose.connect(process.env.CONNECTION_STRING);

    const partnerPlant = Request.extractPartnerPlant(req);

    const useCase = new NewPartnerPlantUseCase(
        context,
        new PartnerRepository(), 
        new TreeRepository(),
        new UserRepository(),
        new PlantRepository()
    );

    const response = await useCase.run(partnerPlant);
    
    context.log(`Info :: PartnerPlant :: Response => ${JSON.stringify(response)}`)

    context.res = {
        status: response.planted ? 200 : 400,
        body: response,
        headers: {
            'Content-Type': 'application/json'
        }
    };

};

export default httpTrigger;