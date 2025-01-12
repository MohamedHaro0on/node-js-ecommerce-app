import mongoose from "mongoose";
import SubCategorySchema from "../schema/subCategory.schema.js";

const SubCategoryModel = mongoose.model("SubCategory", SubCategorySchema);

export default SubCategoryModel;
