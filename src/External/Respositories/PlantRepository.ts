import { model } from "mongoose";
import Plant from "../../Domain/Plant";
import PlantSchema from "../../Schemas/Plant.schema";

export default class PlantRepository {
   
    async create(plant: Plant): Promise<Plant> {
        const PlantModel = model<Plant>('Plant', PlantSchema);
        return PlantModel.create(plant);
    }

}