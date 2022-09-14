import { model } from "mongoose";
import Tree from "../../Domain/Tree";
import TreeSchema from "../../Schemas/Tree.schema";

export default class TreeRepository {
   
    async getTreeById(id: string): Promise<Tree> {
        const treeModel = model<Tree>('Tree', TreeSchema);
        return treeModel.findOne({ _id: id })
    }

}