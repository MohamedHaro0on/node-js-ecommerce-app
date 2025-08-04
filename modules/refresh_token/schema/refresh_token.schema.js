import mongoose, { Schema } from "mongoose";

const RefreshTokenSchema = new Schema({
  token: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  expiryDate: Date,
});

export default RefreshTokenSchema;
