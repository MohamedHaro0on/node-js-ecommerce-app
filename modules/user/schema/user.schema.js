import { Schema } from "mongoose";
import bcrypt from "bcrypt";
import User from "../model/user.model";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [3, "First Name is Too Short"],
      maxLength: [20, "First Name is Too Long"],
    },
    lastName: {
      type: String,
      required: true,
      minLength: [3, "Last Name is Too Short"],
      maxLength: [20, "Last Name is Too Long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // profilePhoto: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password Must be more than 8 charchters"],
    },
    age: {
      type: Number,
      required: true,
      min: [10, "User's Age must be more than 10 years old"],
      max: [120, "User's Age must be less than 120 years old"],
    },
    verifyEmail: {
      type: Boolean,
      // required: true,
      default: false,
    },
    isActive: {
      type: Boolean,
      // required: true,
      default: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },
    secret: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// to Make the Password Hashed :
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    delete ret["password"];
    return ret;
  },
});
export default userSchema;
