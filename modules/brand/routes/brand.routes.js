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

const brandRoutes = express.Router();

// // Custom middleware to apply paginate only to GET requests
// brandRoutes.use((req, res, next) =>
//   paginateForGetRequests(req, res, next, BrandModel)
// );
// brandRoutes.use(paginateForGetRequests);

// Create New Brand
brandRoutes.post(
  "/create-brand",
  validateRequest(createBrandSchema),
  checkIfExists(BrandModel, "name", "name", false),
  createBrand
);

// Get All Brands
brandRoutes.get("/get-brands", getBrands);

// Get Specfic Brand By Id;
brandRoutes.get(
  "/get-brand",
  checkIfExists(BrandModel, "id", "_id", true),
  validateRequest(getBrandSchema),
  getBrand
);

// Update Brand ;
brandRoutes.put(
  "/update-Brand",
  checkIfExists(BrandModel, "id", "_id", true),
  validateRequest(editBrandSchema),
  updateBrand
);

// Delete Brand ;
brandRoutes.delete(
  "/delete-Brand/:id",
  validateRequest(deleteBrandSchema),
  checkIfExists(BrandModel, "id", "_id", true),
  deleteBrand
);

export default brandRoutes;
