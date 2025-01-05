import mongoose from "mongoose";
// eslint-disable-next-line import/extensions
import BrandSchema from "../schema/brand.schema.js";

const BrandModel = mongoose.model("Brand", BrandSchema);

export default BrandModel;
