import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: mongoose.SchemaTypes.String,
});

export default ProductSchema;
