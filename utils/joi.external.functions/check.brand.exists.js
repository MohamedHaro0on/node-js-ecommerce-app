import BrandModel from "../../modules/brand/model/brand.model.js";

const CheckBrandExists = async (brandId, helper) => {
  try {
    if (brandId) {
      const brand = await BrandModel.exists({ _id: brandId });
      if (!brand) {
        return helper.error("any.invalid", {
          brandId,
          message: `Brand with id ${brandId} is not found`,
        });
      }
      return brandId;
    }
  } catch (e) {
    return helper.error("any.invalid", {
      brandId,
      message: `${e}`,
    });
  }
};

export default CheckBrandExists;
