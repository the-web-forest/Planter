import { Schema } from "mongoose";
import Tree from "../Domain/Tree";
  
const TreeSchema = new Schema<Tree>({
   name: { type: String },
   description: { type: String },
   image: { type: String },
   value: { type: Number },
   biome: { type: String },
   deleted: { type: Boolean }
   }, { collection: 'Tree', versionKey: false })

export default TreeSchema;