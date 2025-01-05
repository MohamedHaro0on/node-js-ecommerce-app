import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: true,
      trim: true,
      minLength: [3, "Too Short Product Name"],
      maxLength: [30, "Too Long Product Name"],
    },
    slug: {
      type: mongoose.SchemaTypes.String,
      lowerCase: true,
      required: true,
    },
    description: {
      type: mongoose.SchemaTypes.String,
      required: true,
      minLength: [10, "Too Short Product Description"],
      maxLength: [100, "Too Long Product Description "],
      trim: true,
    },
    quantity: {
      type: mongoose.SchemaTypes.Number,
      required: true,
      min: [0, "Minimum Value can't be less than zero"],
      max: [1000, "Maximum Value Can't be more than 1000"],
    },
    soldCount: {
      type: mongoose.SchemaTypes.Number,
      default: 0,
      min: [0, "Product's sold count can't be less than zero"],
    },
    price: {
      type: mongoose.SchemaTypes.Number,
      required: true,
      trim: true,
      min: [0, "The Price can't be lower than zero"],
    },
    discountRatio: {
      type: mongoose.SchemaTypes.Number,
      min: [0, "Discount Can't be less than 0% "],
      max: [100, "Discount Can't be more than 100% "],
      default: 0,
    },
    colorsList: {
      type: [mongoose.SchemaTypes.String],
    },
    images: {
      type: [mongoose.SchemaTypes.String],
    },
    imageCover: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Product Image is required"],
    },
    ratingAverage: {
      type: mongoose.SchemaTypes.Number,
      min: [1, "Product Rating Can't be less than one star"],
      max: [5, "Product Rating Can't be more than 5 Stars"],
    },
    ratingCount: {
      type: mongoose.SchemaTypes.Number,
      default: 0,
      min: 0,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      requried: [true, "Product Must Belong to a Category"],
    },
    subCategory: {
      type: mongoose.Schema.ObjectId,
      // required: [true, "Product Must Belong to a Sub Category"],
      ref: "SubCategory",
    },
    brand: {
      type: mongoose.Schema.ObjectId,
      // required: [true, "Product Must Belong to a brand"],
      ref: "brand",
    },
  },
  { timestamps: true }
);

ProductSchema.index({ name: 1 });
export default ProductSchema;
