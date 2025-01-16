import SubCategoryModel from "../../modules/subcategory/model/subCategory.model.js";

const CheckSubCategoriesExists = async (subCategoryIds, helper) => {
  try {
    if (subCategoryIds) {
      const subCategories = await SubCategoryModel.find({
        _id: { $in: subCategoryIds },
      });

      // Check if all subCategoryIds exist in the database
      if (subCategories.length !== subCategoryIds.length) {
        throw new Error("Invalid Sub Category IDs");
      }

      console.log("This was successful");
      return subCategoryIds;
    }
  } catch (e) {
    // Throw the error to ensure it is propagated
    throw new Error(e.message);
  }
};

export default CheckSubCategoriesExists;
