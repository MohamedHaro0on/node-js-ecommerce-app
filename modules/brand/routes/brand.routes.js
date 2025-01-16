import express from "express";
import {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
  getBrand,
} from "../controller/brand.controller.js";
import paginate from "../../../middleswares/pagination.js";
import validateRequest from "../../../middleswares/validate.request.js";
import {
  createBrandSchema,
  deleteBrandSchema,
  editBrandSchema,
  getBrandSchema,
} from "../joi/brand.joi.js";
import checkIfExists from "../../../middleswares/check.if.exists.js";
import BrandModel from "../model/brand.model.js";
import paginateForGetRequests from "../../../middleswares/pagination.js";
import slugifyMiddleWare from "../../../middleswares/slugifiy.js";

const brandRouter = express.Router();

// // Custom middleware to apply paginate only to GET requests
// brandRouter.use((req, res, next) =>
//   paginateForGetRequests(req, res, next, BrandModel)
// );
// brandRouter.use(paginateForGetRequests);

// Create New Brand
brandRouter.post(
  "/create-brand",
  validateRequest(createBrandSchema),
  checkIfExists(BrandModel, "name", "name", false),
  slugifyMiddleWare,
  createBrand
);

// Get All Brands
brandRouter.get("/get-brands", getBrands);

// Get Specfic Brand By Id;
brandRouter.get(
  "/get-brand",
  checkIfExists(BrandModel, "id", "_id", true),
  validateRequest(getBrandSchema),
  getBrand
);

// Update Brand ;
brandRouter.put(
  "/update-Brand",
  checkIfExists(BrandModel, "id", "_id", true),
  validateRequest(editBrandSchema),
  updateBrand
);

// Delete Brand ;
brandRouter.delete(
  "/delete-Brand",
  validateRequest(deleteBrandSchema),
  checkIfExists(BrandModel, "id", "_id", true),
  deleteBrand
);

export default brandRouter;
