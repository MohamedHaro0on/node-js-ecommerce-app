import mongoose from "mongoose";
// eslint-disable-next-line import/extensions
import CategorySchema from "../schema/category.schema.js";

const CategoryModel = mongoose.model("Category", CategorySchema);

export default CategoryModel;
