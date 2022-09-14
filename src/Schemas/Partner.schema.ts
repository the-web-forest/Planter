import mongoose, { Schema } from "mongoose";
import Partner from "../Domain/Partner";

const PartnerSchema = new Schema<Partner>({
    code: { type: Number },
    name: { type: String },
    password: { type: String },
    email: { type: String },
    tree: { type: String },
    url: { type: String },
}, { collection: 'Partner', versionKey: false })

export default PartnerSchema;