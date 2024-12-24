import mongoose from "mongoose";
import CategorySchema from "../schema/category.schema.js";

const CategoryModel = mongoose.model("Category", CategorySchema);

export default CategoryModel;
