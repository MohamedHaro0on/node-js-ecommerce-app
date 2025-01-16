import Joi from "joi";
import joiObjectId from "joi-objectid";
import CheckCategoryExists from "../../../utils/joi.external.functions/check.category.exists.js";
import CheckSubCategoriesExists from "../../../utils/joi.external.functions/check.sub.categories.exists.js";
import CheckBrandExists from "../../../utils/joi.external.functions/check.brand.exists.js";
import CheckSubCategoriesExistInTheSameCategory from "../../../utils/joi.external.functions/check.sub.categories.exist.in.same.category.js";

const objectId = joiObjectId(Joi); // Initialize joi-objectid

const fieldsAttribute = [
  "name",
  "price",
  "category",
  "subCategories",
  "brand",
  "soldCount",
  "ratingCount",
  "ratingAverage",
  "coverImage",
];
const sortAttributes = [
  "name",
  "price",
  "category",
  "subCategories",
  "brand",
  "soldCount",
  "ratingCount",
  "ratingAverage",
];
export const createProductSchema = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().required().min(3).max(100).messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must not exceed 100 characters",
        "any.required": "Name is required",
      }),
      description: Joi.string().required().min(10).max(500).messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 10 characters long",
        "string.max": "description must not exceed 500 characters",
        "any.required": "Name is required",
      }),
      price: Joi.number().required().min(0).messages({
        "number.base": "Price must be a number",
        "number.empty": "Price is required",
        "number.min": "Price must be more than or equal to zero",
        "any.required": "Price is required",
      }),
      discountRatio: Joi.number().min(0).max(100).messages({
        "number.base": "DiscountRatio must be a number",
        "number.empty": "DiscountRatio is required",
        "number.min": "DiscountRatio must be more than or equal to 0%",
        "number.max": "DiscountRatio must be less than 100% item",
      }),
      quantity: Joi.number().required().min(0).max(1000).messages({
        "number.base": "Quantity must be a number",
        "number.empty": "Quantity is required",
        "number.min": "Quantity must be more than or equal to zero",
        "number.max": "Quantity must be less than 1000 item",
        "any.required": "Quantity is required",
      }),
      soldCount: Joi.number().min(0).messages({
        "number.base": "Sold Count must be a number",
        "number.empty": "Sold Count is required",
        "number.min": "Sold Count must be more than or equal to zero",
      }),
      ratingCount: Joi.number().min(0).messages({
        "number.base": "Rating Count must be a number",
        "number.empty": "Rating Count is required",
        "number.min": "Rating Count must be more than or equal to zero",
      }),
      ratingAverage: Joi.number().min(1).max(5).messages({
        "number.base": "Rating Average must be a number",
        "number.empty": "Rating Average is required",
        "number.min": "Rating Average must be more than or equal to one start",
        "number.max": "Rating Average must be less than 5 stars",
      }),

      imageCover: Joi.string().required().messages({
        "string.base": "Image Cover must be a string",
        "string.empty": "Image Cover is required",
        "any.required": "Image Cover is required",
      }),
      images: Joi.array().items(Joi.string()).messages({
        "array.base": "images must be a list",
        "array.items": "All images must be strings.",
      }),
      colorsList: Joi.array().items(Joi.string()).messages({
        "array.base": "images must be a list",
        "array.items": "All images must be strings.",
      }),
      category: objectId().external(CheckCategoryExists).messages({
        "string.base": "Category ID must be a an object Id",
        "string.empty": "Category ID is required",
        "any.required": "Category ID is required",
        "string.pattern.name": "Category ID must be a valid MongoDB ObjectId",
        "any.invalid": "Category ID is not found",
      }),
      subCategories: Joi.array()
        .optional()
        .items(
          objectId().messages({
            "array.base": "Subcategories must be a list",
            "array.items": "All subcategories must be valid MongoDB ObjectIds.",
            "any.invalid": "SubCategory ID is not found",
          })
        )
        .unique()
        .external(CheckSubCategoriesExists)
        .external(CheckSubCategoriesExistInTheSameCategory),
      brand: objectId().optional().external(CheckBrandExists).messages({
        "string.base": "Brand ID must be a an object Id",
        "string.empty": "Brand ID is required",
        "any.required": "Brand ID is required",
        "string.pattern.name": "Brand ID must be a valid MongoDB ObjectId",
        "any.invalid": "Brand ID is not found",
      }),
    }),
};

export const deleteProductSchema = {
  query: Joi.object()
    .required()
    .keys({
      id: objectId().required().messages({
        "string.base": "Product ID must be a string",
        "string.empty": "Product ID is required",
        "any.required": "Product ID is required",
        "string.pattern.name": "Product ID must be a valid MongoDB ObjectId",
      }),
    }),
};

export const editProductSchema = {
  query: Joi.object()
    .required()
    .keys({
      id: objectId().required().messages({
        "string.base": "Category ID must be a string",
        "string.empty": "Category ID is required",
        "any.required": "Category ID is required",
        "string.pattern.name": "Category ID must be a valid MongoDB ObjectId",
      }),
    }),
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().min(3).max(100).messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters long",
        "any.required": "Name is required",
      }),
      description: Joi.string().min(10).max(300).messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 10 characters long",
        "string.max": "description must not exceed 100 characters",
      }),
      price: Joi.number().min(0).messages({
        "number.base": "Price must be a number",
        "number.empty": "Price is required",
        "number.min": "Price must be more than or equal to zero",
      }),
      quantity: Joi.number().min(0).max(1000).messages({
        "number.base": "Quantity must be a number",
        "number.empty": "Quantity is required",
        "number.min": "Quantity must be more than or equal to zero",
        "number.max": "Quantity must be less than 1000 item",
      }),
      soldCount: Joi.number().min(0).messages({
        "number.base": "Sold Count must be a number",
        "number.empty": "Sold Count is required",
        "number.min": "Sold Count must be more than or equal to zero",
      }),
      ratingCount: Joi.number().min(0).messages({
        "number.base": "Rating Count must be a number",
        "number.empty": "Rating Count is required",
        "number.min": "Rating Count must be more than or equal to zero",
      }),
      ratingAverage: Joi.number().min(1).max(5).messages({
        "number.base": "Rating Average must be a number",
        "number.empty": "Rating Average is required",
        "number.min": "Rating Average must be more than or equal to one start",
        "number.max": "Rating Average must be less than 5 stars",
      }),

      imageCover: Joi.string().messages({
        "string.base": "Image Cover must be a string",
        "string.empty": "Image Cover is required",
        "any.required": "Image Cover is required",
      }),
      images: Joi.array().items(Joi.string()).messages({
        "array.base": "images must be a list",
        "array.items": "All images must be strings.",
      }),
      colorsList: Joi.array().items(Joi.string()).messages({
        "array.base": "images must be a list",
        "array.items": "All images must be strings.",
      }),
      discountRatio: Joi.number().min(0).max(100).messages({
        "number.base": "DiscountRatio must be a number",
        "number.empty": "DiscountRatio is required",
        "number.min": "DiscountRatio must be more than or equal to 0%",
        "number.max": "DiscountRatio must be less than 100% item",
      }),
      category: objectId().external(CheckCategoryExists).messages({
        "string.base": "Category ID must be a an object Id",
        "string.empty": "Category ID is required",
        "any.required": "Category ID is required",
        "string.pattern.name": "Category ID must be a valid MongoDB ObjectId",
        "any.invalid": "Category ID is not found",
      }),
      subCategories: Joi.array()
        .items(
          objectId().messages({
            "array.base": "Subcategories must be a list",
            "array.items": "All subcategories must be valid MongoDB ObjectIds.",
            // "any.invalid": "SubCategory ID is not found",
          })
        )
        .unique()
        .external(CheckSubCategoriesExists)
        .external(CheckSubCategoriesExistInTheSameCategory),
      brand: objectId().external(CheckBrandExists).messages({
        "string.base": "Brand ID must be a an object Id",
        "string.empty": "Brand ID is required",
        "any.required": "Brand ID is required",
        "string.pattern.name": "Brand ID must be a valid MongoDB ObjectId",
        "any.invalid": "Brand ID is not found",
      }),
    }),
};

export const getProductByIdSchema = {
  query: Joi.object()
    .required()
    .keys({
      id: objectId().required().messages({
        "string.base": "Product ID must be a string",
        "string.empty": "Product ID is required",
        "any.required": "Product ID is required",
        "string.pattern.name": "Product ID must be a valid MongoDB ObjectId",
      }),
    }),
};

export const getProductsSchema = {
  query: Joi.object()
    .required()
    .keys({
      name: Joi.string().optional().min(3).max(100).messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must not exceed 100 characters",
      }),
      price: Joi.alternatives()
        .try(
          Joi.number().min(0).messages({
            "number.base": "Price must be a number",
            "number.min": "Price must be more than or equal to zero",
          }),
          Joi.object({
            gte: Joi.number().min(0).messages({
              "number.base": "Price gte must be a number",
              "number.min": "Price gte must be more than or equal to zero",
            }),
            lte: Joi.number().min(0).messages({
              "number.base": "Price lte must be a number",
              "number.min": "Price lte must be more than or equal to zero",
            }),
            gt: Joi.number().min(0).messages({
              "number.base": "Price gte must be a number",
              "number.min": "Price gte must be more than or equal to zero",
            }),
            lt: Joi.number().min(0).messages({
              "number.base": "Price lte must be a number",
              "number.min": "Price lte must be more than or equal to zero",
            }),
          })
            .min(1)
            .messages({
              "object.base": "Price must be a number or an object",
              "object.min":
                "Price object must have at least one key (gte or lte)",
            })
        )
        .messages({
          "alternatives.match":
            "Price must be a number or an object with gte/lte keys",
        }),
      discountRatio: Joi.alternatives()
        .try(
          Joi.number().min(0).max(100).messages({
            "number.base": "Discount Ratio must be a number",
            "number.min": "Discount Ratio must be more than or equal to zero",
          }),
          Joi.object({
            gte: Joi.number().min(0).messages({
              "number.base": "Discount Ratio gte must be a number",
              "number.min":
                "Discount Ratio gte must be more than or equal to zero",
            }),
            lte: Joi.number().min(0).messages({
              "number.base": "Discount Ratio lte must be a number",
              "number.min":
                "Discount Ratio lte must be more than or equal to zero",
            }),
            gt: Joi.number().min(0).messages({
              "number.base": "Discount Ratio gte must be a number",
              "number.min":
                "Discount Ratio gte must be more than or equal to zero",
            }),
            lt: Joi.number().min(0).messages({
              "number.base": "Discount Ratio lte must be a number",
              "number.min":
                "Discount Ratio lte must be more than or equal to zero",
            }),
          })
            .min(1)
            .messages({
              "object.base": "Discount Ratio must be a number or an object",
              "object.min":
                "Discount Ratio object must have at least one key (gte or lte)",
            })
        )
        .messages({
          "alternatives.match":
            "Discount Ratio must be a number or an object with gte/lte keys",
        }),
      category: objectId().external(CheckCategoryExists).messages({
        "string.base": "Category ID must be a an object Id",
        "string.empty": "Category ID is required",
        "any.required": "Category ID is required",
        "string.pattern.name": "Category ID must be a valid MongoDB ObjectId",
        "any.invalid": "Category ID is not found",
      }),
      subCategories: Joi.array()
        .items(
          objectId().messages({
            "array.base": "Subcategories must be a list",
            "array.items": "All subcategories must be valid MongoDB ObjectIds.",
            // "any.invalid": "SubCategory ID is not found",
          })
        )
        .unique()
        .external(CheckSubCategoriesExists)
        .external(CheckSubCategoriesExistInTheSameCategory),
      brand: objectId().external(CheckBrandExists).messages({
        "string.base": "Brand ID must be a an object Id",
        "string.empty": "Brand ID is required",
        "any.required": "Brand ID is required",
        "string.pattern.name": "Brand ID must be a valid MongoDB ObjectId",
        "any.invalid": "Brand ID is not found",
      }),
      quantity: Joi.alternatives()
        .try(
          Joi.number().min(0).max(1000).messages({
            "number.base": "Quantity must be a number",
            "number.min": "Quantity must be more than or equal to zero",
          }),
          Joi.object({
            gte: Joi.number().min(0).messages({
              "number.base": "Quantity gte must be a number",
              "number.min": "Quantity gte must be more than or equal to zero",
            }),
            lte: Joi.number().min(0).messages({
              "number.base": "Quantity lte must be a number",
              "number.min": "Quantity lte must be more than or equal to zero",
            }),
            gt: Joi.number().min(0).messages({
              "number.base": "Quantity gte must be a number",
              "number.min": "Quantity gte must be more than or equal to zero",
            }),
            lt: Joi.number().min(0).messages({
              "number.base": "Quantity lte must be a number",
              "number.min": "Quantity lte must be more than or equal to zero",
            }),
          })
            .min(1)
            .messages({
              "object.base": "Quantity must be a number or an object",
              "object.min":
                "Quantity object must have at least one key (gte or lte)",
            })
        )
        .messages({
          "alternatives.match":
            "Quantity must be a number or an object with gte/lte keys",
        }),
      soldCount: Joi.alternatives()
        .try(
          Joi.number().min(0).messages({
            "number.base": "Sold Count must be a number",
            "number.min": "Sold Count must be more than or equal to zero",
          }),
          Joi.object({
            gte: Joi.number().min(0).messages({
              "number.base": "Sold Count gte must be a number",
              "number.min": "Sold Count gte must be more than or equal to zero",
            }),
            lte: Joi.number().min(0).messages({
              "number.base": "Sold Count lte must be a number",
              "number.min": "Sold Count lte must be more than or equal to zero",
            }),
            gt: Joi.number().min(0).messages({
              "number.base": "Sold Count gte must be a number",
              "number.min": "Sold Count gte must be more than or equal to zero",
            }),
            lt: Joi.number().min(0).messages({
              "number.base": "Sold Count lte must be a number",
              "number.min": "Sold Count lte must be more than or equal to zero",
            }),
          })
            .min(1)
            .messages({
              "object.base": "Sold Count must be a number or an object",
              "object.min":
                "Sold Count object must have at least one key (gte or lte)",
            })
        )
        .messages({
          "alternatives.match":
            "Quantity must be a number or an object with gte/lte keys",
        }),
      ratingCount: Joi.alternatives()
        .try(
          Joi.number().min(0).messages({
            "number.base": "Rating Count must be a number",
            "number.min": "Rating Count must be more than or equal to zero",
          }),
          Joi.object({
            gte: Joi.number().min(0).messages({
              "number.base": "Rating Count gte must be a number",
              "number.min":
                "Rating Count gte must be more than or equal to zero",
            }),
            lte: Joi.number().min(0).messages({
              "number.base": "Rating Count lte must be a number",
              "number.min":
                "Rating Count lte must be more than or equal to zero",
            }),
            gt: Joi.number().min(0).messages({
              "number.base": "Rating Count gte must be a number",
              "number.min":
                "Rating Count gte must be more than or equal to zero",
            }),
            lt: Joi.number().min(0).messages({
              "number.base": "Rating Count lte must be a number",
              "number.min":
                "Rating Count lte must be more than or equal to zero",
            }),
          })
            .min(1)
            .messages({
              "object.base": "Rating Count must be a number or an object",
              "object.min":
                "Rating Count object must have at least one key (gte or lte)",
            })
        )
        .messages({
          "alternatives.match":
            "Rating Count must be a number or an object with gte/lte keys",
        }),
      ratingAverage: Joi.alternatives()
        .try(
          Joi.number().min(1).max(5).messages({
            "number.base": "Rating Average must be a number",
            "number.min": "Rating Average must be more than or equal to zero",
          }),
          Joi.object({
            gte: Joi.number().min(0).messages({
              "number.base": "Rating Average gte must be a number",
              "number.min":
                "Rating Average gte must be more than or equal to one",
            }),
            lte: Joi.number().min(0).messages({
              "number.base": "Rating Average lte must be a number",
              "number.min":
                "Rating Average lte must be more than or equal to five",
            }),
            gt: Joi.number().min(0).messages({
              "number.base": "Rating Average gte must be a number",
              "number.min":
                "Rating Average gte must be more than or equal to one",
            }),
            lt: Joi.number().min(0).messages({
              "number.base": "Rating Average lte must be a number",
              "number.min":
                "Rating Average lte must be more than or equal to five",
            }),
          })
            .min(1)
            .messages({
              "object.base": "Price must be a number or an object",
              "object.min":
                "Price object must have at least one key (gte or lte)",
            })
        )
        .messages({
          "alternatives.match":
            "Price must be a number or an object with gte/lte keys",
        }),
      sort: Joi.string()
        .optional()
        .pattern(/^(-?((soldCount|price|ratingAverage)),?)+$/)
        .messages({
          "string.base": "Sort must be a string",
          "string.empty": "Sort is required",
          "string.pattern.base":
            "Sort must contain valid fields: soldCount, price, ratingAverage. Use '-' for descending order.",
        }),
      fields: Joi.string()
        .optional()
        .pattern(new RegExp(`^((${fieldsAttribute.join("|")}),?)+$`)) // Dynamically create regex
        .messages({
          "string.base": "Sort must be a string",
          "string.empty": "Sort is required",
          "string.pattern.base": `fields must contain valid fields: ${fieldsAttribute.join(" ,")}) Use '-' for descending order.`,
        }),
      keyword: Joi.string().min(1).max(30).messages({
        "string.base": "key word must be a string",
        "string.empty": "key word is required",
        "string.min": "key word must be at least 10 characters long",
        "string.max": "description must not exceed 500 characters",
        "any.required": "key word is required",
      }),
      page: Joi.number().min(0).messages({
        "number.base": "Page must be a number",
        "number.empty": "Page is required",
        "number.min": "Page must be more than or equal to zero",
        "any.required": "Page is required",
      }),
      limit: Joi.number().min(0).messages({
        "number.base": "Limit  must be a number",
        "number.empty": "Limit  is required",
        "number.min": "Limit  must be more than or equal to zero",
        "any.required": "Limit  is required",
      }),
    }),
};
