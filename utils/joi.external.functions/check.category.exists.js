import CategoryModel from "../../modules/category/model/category.model.js";

const CheckCategoryExists = async (categoryId, helper) => {
  try {
    if (categoryId) {
      const category = await CategoryModel.exists({ _id: categoryId });
      if (!category) {
        // If the category is not found, return an error
        return helper.error("any.invalid", {
          categoryId,
          message: `Category with id ${categoryId} is not found`,
        });
      }
      // If the category is found, return the categoryId to indicate validation success
      return categoryId;
    }
  } catch (e) {
    return helper.error("any.invalid", {
      categoryId,
      message: `${e}`,
    });
  }
};

export default CheckCategoryExists;
