import { StatusCodes } from "http-status-codes";
import ProductModel from "../model/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();

    res.status(StatusCodes.OK).json({
      message: "succesfull",
      products,
    });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};
