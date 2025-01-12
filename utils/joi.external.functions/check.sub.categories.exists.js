import SubCategoryModel from "../../modules/subcategory/model/subCategory.model.js";

const CheckSubCategoriesExists = async (subCategoryIds, helper) => {
  try {
    if (subCategoryIds) {
      const subCategories = await SubCategoryModel.find({
        _id: { $exists: true, $in: subCategoryIds },
      });

      if (
        subCategories.length === 0 ||
        subCategories.length != subCategoryIds.length
      ) {
        // If the subcategories are not found, return an error
        return helper.error("any.invalid", {
          subCategoryIds,
          message: `Invalid Sub Category ids`,
        });
      }
      console.log("this was successfull ");
      return subCategoryIds;
    }
  } catch (e) {
    return helper.error("any.invalid", {
      message: `${e}`,
    });
  }
};

export default CheckSubCategoriesExists;
