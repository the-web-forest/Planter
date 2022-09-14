import { Schema } from "mongoose";
import Plant from "../Domain/Plant";

const PlantSchema = new Schema<Plant>({
   orderId: { type: String },
   userId: { type: String },
   treeId: { type: String },
   name: { type: String },
   message: { type: String },
   biome: { type: String },
   species: { type: String },
   image: { type: String },
   description: { type: String },
   partnerId: { type: String },
   partnerName: { type: String },
   partnerUrl: { type: String },
   value: { type: Number },
   hastags: [{ type: String }],
   createdAt: { type: Date },
   updatedAt: { type: Date },
   }, { collection: 'Plant', versionKey: false })

export default PlantSchema;