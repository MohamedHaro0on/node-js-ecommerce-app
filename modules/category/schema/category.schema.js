import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Name is required"],
      unique: [true, "Cateogry Must be unique"],
      // unique: true,
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
CategorySchema.index({ name: 1 }, { unique: true });
export default CategorySchema;
