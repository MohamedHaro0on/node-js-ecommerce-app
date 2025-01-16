import SubCategoryModel from "../../modules/subcategory/model/subCategory.model.js";

const checkIfNewSubCategoryExists = async (subCategorynewName, helper) => {
  try {
    if (subCategorynewName) {
      const categoryId = helper.state.ancestors[0].mainCategoryId;

      const subCategoriesWithTheSameName = await SubCategoryModel.findOne({
        mainCategoryId: categoryId,
        name: subCategorynewName,
      });

      if (subCategoriesWithTheSameName) {
        // Throw an error with your custom message
        throw new Error(
          `There is a sub-category with the name "${subCategorynewName}" inside the category.`
        );
      }

      // Return the value if validation passes
      return subCategorynewName;
    }
  } catch (e) {
    // Throw the error to ensure it is propagated
    throw new Error(e.message);
  }
};

export default checkIfNewSubCategoryExists;
