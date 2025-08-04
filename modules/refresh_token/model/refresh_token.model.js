import { model } from "mongoose";
import RefreshTokenSchema from "../schema/refresh_token.schema.js";

const RefreshToken = model("RefreshToken", RefreshTokenSchema);

export default RefreshToken;
