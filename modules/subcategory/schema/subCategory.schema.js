import mongoose from "mongoose";

const SubCategoryScheam = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [3, "Sub Category Name is Too Short"],
      maxLength: [20, "Sub Cateory  Name is Too Long"],
      unique: [true, "SubCategory Must be Unique"],

      trim: true,
    },

    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Main Category is Required"],
    },
  },
  {
    timestamps: true,
  }
);

export default SubCategoryScheam;
