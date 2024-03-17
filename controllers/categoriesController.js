const asyncHandler = require("express-async-handler");
const Item = require("../models/itemModel");
const Category = require("../models/categoryModel");

const getCategories = asyncHandler(async (req, res) => {
  const locals = {
    title: "Categories 📦",
    description: "A CRUD inventory application made using MongoDB & Express! ",
  };

  const data = await Category.find().sort({ updatedAt: -1 });

  res.status(200).render("display_categories", {
    locals,
    data,
  });
});
const getCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  const data = await Item.find({ "category.id": categoryId });
  const category = await Category.findById(categoryId);
  const locals = {
    title: category.name || "Category 📦",
    description: "A CRUD inventory application made using MongoDB & Express! ",
  };
  res.render("display_category", { locals, data, category });
});

const addCategoryGet = asyncHandler(async (req, res) => {
  const locals = {
    title: "Add Category 📦",
    description: "A CRUD inventory application made using MongoDB & Express! ",
  };

  res.status(200).render("add_category", { locals });
});
const addCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const categoryAlreadyExists = await Category.findOne({ name });

  if (!categoryAlreadyExists) {
    const newCategory = await Category.create({
      name,
      description,
    });
    return res.status(201).redirect(`/categories/category/${newCategory._id}`);
  } else {
    return res
      .status(200)
      .redirect(`/categories/category/${categoryAlreadyExists._id}`);
  }
});
const updateCategoryGet = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  const data = await Category.findById(categoryId);
  const locals = {
    title: `Update ${data.name} 📦` || "Update Category 📦",
    description: "A CRUD inventory application made using MongoDB & Express! ",
  };

  res.status(200).render("update_category", { locals, data });
});
const updateCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const categoryId = req.params.id;
  const updatedCategory = await Category.findByIdAndUpdate(categoryId, {
    name,
    description,
  });
  res.status(201).redirect(`/categories/category/${updatedCategory._id}`);
});

const deleteCategoryGet = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.findById(categoryId);
  const items = await Item.find({ "category.id": categoryId });
  const categoryIsEmpty = items.length === 0
  const locals = {
    title: `Update ${category.name} 📦` || "Update Category 📦",
    description: "A CRUD inventory application made using MongoDB & Express! ",
  };
  res.status(200).render("delete_category", { locals, category, items, categoryIsEmpty });
});
const deleteCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  await Category.findByIdAndDelete(categoryId);
  res.status(203).redirect("/categories");
});

module.exports = {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  updateCategoryGet,
  deleteCategory,
  deleteCategoryGet,
  addCategoryGet,
};
