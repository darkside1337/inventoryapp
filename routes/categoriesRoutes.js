const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategory,
  addCategory,
  addCategoryGet,
  updateCategory,
  updateCategoryGet,
  deleteCategory,
  deleteCategoryGet,
} = require("../controllers/categoriesController");
/* ------------------------------ get all categories ----------------------------- */
router.get("/", getCategories);

/* ----------------------------- get single category ---------------------------- */
router.get("/category/:id", getCategory);

/* ------------------------------ add new category ------------------------------ */
router.get("/new", addCategoryGet);
router.post("/new", addCategory);

/* ------------------------------ modify category ------------------------------ */
router.get("/category/:id/update", updateCategoryGet);
router.put("/category/:id/update", updateCategory);

/* ------------------------------ delete new item ------------------------------ */
router.get("/category/:id/delete", deleteCategoryGet);
router.delete("/category/:id/delete", deleteCategory);

module.exports = router;
