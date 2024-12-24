import mongoose from "mongoose";

// 1- Create Schema
// 2- Create Model
//
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Name is required"],
      unique: [true, "Cateogry Must be unique"],
      minLength: [3, "Category Name is too Short"],
      maxLength: [20, "Category Name is too Long"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

export default CategorySchema;
