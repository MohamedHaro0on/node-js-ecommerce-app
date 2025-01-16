import BrandModel from "../model/brand.model.js";
import deleteHandler from "../../../utils/handlers/delete.handler.js";
import createHandler from "../../../utils/handlers/create.handler.js";
import GetHandler from "../../../utils/handlers/get.handler.js";
import getByIdHandler from "../../../utils/handlers/get.by.id.handler.js";
import updateHandler from "../../../utils/handlers/update.handler.js";

//          @desc                    Create Brand
//          @route                   POST  /create-brand
//          @access                  private

export const createBrand = createHandler(BrandModel);

//          @desc                    Get brands
//          @route                   GET   /get-brands
//          @access                      public

export const getBrands = GetHandler(BrandModel);

//          @desc                    get specfic Brand  by Name ;
//          @route                   GET /get-Brand
//          @access                  public

//          @desc                    get specfic Brand by ID  ;
//          @route                   GET /get-Brand
//          @access                  public

export const getBrand = getByIdHandler(BrandModel);

//          @desc                        Update specfic Brand
//          @route                       PUT         /update-Brand
//          @access                      Private

export const updateBrand = updateHandler(BrandModel);

//          @desc                        Delete specfic Brand
//          @route                       Delete         /update-Brand
//          @access                      Private

export const deleteBrand = deleteHandler(BrandModel);
