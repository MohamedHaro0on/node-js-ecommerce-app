import mongoose from "mongoose";
import SubCategoryScheam from "../schema/subCategory.schema.js";

const SubCategoryModel = mongoose.model("SubCategory", SubCategoryScheam);

export default SubCategoryModel;
