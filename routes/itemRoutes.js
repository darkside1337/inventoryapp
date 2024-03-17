const express = require("express");
const router = express.Router();
const {
  getItems,
  getItem,
  addItem,
  updateItem,
  deleteItem,
  addItemForm,
  updateItemForm,
  deleteItemGet,
} = require("../controllers/itemController");
const upload = require("../middleware/multer");

/* ------------------------------ get all items ----------------------------- */
router.get("/", getItems);

/* ----------------------------- get single item ---------------------------- */
router.get("/item/:id", getItem);

/* ------------------------------ add new item ------------------------------ */
router.get("/new", addItemForm);
router.post("/new", upload.single("image"), addItem);

/* ------------------------------ modify new item ------------------------------ */
router.get("/item/:id/update", updateItemForm);
router.put("/item/:id/update", upload.single("image"), updateItem);

/* ------------------------------ delete new item ------------------------------ */
router.get("/item/:id/delete", deleteItemGet);
router.delete("/item/:id/delete", deleteItem);

module.exports = router;
