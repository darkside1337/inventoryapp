const asyncHandler = require("express-async-handler");
const Item = require("../models/itemModel");
const Category = require("../models/categoryModel");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// Controllers

// items page

const getItems = asyncHandler(async (req, res) => {
  const locals = {
    title: "Items 📦",
    description: "A CRUD inventory application made using MongoDB & Express! ",
  };

  const data = await Item.find().sort({ updatedAt: -1 });

  res.status(200).render("display_items", {
    locals,
    data,
  });
});

// single item page

const getItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await Item.findById({ _id: id });
  if (!data) {
    return res
      .status(404)
      .render("display_item", { locals, data: { name: "Item not found" } });
  }
  const locals = {
    title: data.name || "Items 📦",
    description: "A CRUD inventory application made using MongoDB & Express! ",
  };
  res.status(200).render("display_item", {
    locals,
    data,
  });
});

// add item page

const addItemForm = asyncHandler(async (req, res) => {
  const locals = {
    title: "Add Item 📦",
    description: "A CRUD inventory application made using MongoDB & Express! ",
  };
  const data = await Category.find();
  res.status(200).render("add_item", { locals, data });
});

// Add Item

const addItem = asyncHandler(async (req, res) => {
  const { name, description, price, category, newCategory, numberInStock } =
    req.body;
  let image = req.file;
  let selectedCategory;
  if (!newCategory) {
    selectedCategory = await Category.findOne({ name: category });
  } else {
    selectedCategory = await Category.create({
      name: newCategory,
      description: "Default Description",
    });
  }
  // Check if selectedCategory is null and handle the error
  if (!selectedCategory) {
    return res
      .status(400)
      .json({ message: "Category not found or failed to create" });
  }

  let itemData = {
    name,
    description,
    category: {
      name: selectedCategory.name,
      id: selectedCategory._id,
    },
    price,
    numberInStock,
  };

  if (image) {
    // Upload Image
    const uploadImage = await cloudinary.uploader.upload(image.path);

    // Add image data to itemData

    itemData.img = {
      secure_url: uploadImage.secure_url,
      public_id: uploadImage.public_id,
    };

    // Delete image from server storage

    fs.unlinkSync(image.path);
  }

  // Create item with data
  const newItem = await Item.create(itemData);

  // Response
  return res.status(201).redirect(`/items/item/${newItem._id}`);
});

// Update Item Form

const updateItemForm = asyncHandler(async (req, res) => {
  const locals = {
    title: "Update Item 📦",
    description: "A CRUD inventory application made using MongoDB & Express! ",
  };
  const itemId = req.params.id;
  const categories = await Category.find();
  const item = await Item.findOne({ _id: itemId });

  res.status(200).render("update_item", { locals, categories, item });
});

// Update Item

const updateItem = asyncHandler(async (req, res) => {
  const { name, description, price, category, newCategory, numberInStock } =
    req.body;

  const itemId = req.params.id;
  const item = await Item.findById(itemId);
  let image = req.file;
  let selectedCategory;

  if (!newCategory) {
    selectedCategory = await Category.findOne({ name: category });
  } else {
    selectedCategory = await Category.create({
      name: newCategory,
      description: "Default Description",
    });
  }

  const itemData = {
    name,
    description,
    price,
    category: {
      name: selectedCategory.name,
      id: selectedCategory._id,
    },
    newCategory,
    numberInStock,
  };

  if (image) {
    // Delete Previous Image if it exists
    if (item.img && item.img.public_id) {
      await cloudinary.uploader.destroy(item.img.public_id);
    }

    // Upload Image

    const uploadImage = await cloudinary.uploader.upload(image.path);

    // Add image data to itemData

    itemData.img = {
      secure_url: uploadImage.secure_url,
      public_id: uploadImage.public_id,
    };

    // Delete image from server storage

    fs.unlinkSync(image.path);
  }

  // update item

  const updatedItem = await Item.findByIdAndUpdate({ _id: itemId }, itemData, {
    new: true,
  });

  return res.status(200).redirect(`/items/item/${updatedItem._id}`);
});

// Delete Item

const deleteItemGet = asyncHandler(async (req, res) => {
  const locals = {
    title: "Delete Item 📦",
    description: "A CRUD inventory application made using MongoDB & Express! ",
  };
  const itemId = req.params.id;
  const data = await Item.findById(itemId);
  res.render("delete_item", { locals, data });
});
const deleteItem = asyncHandler(async (req, res) => {
  const itemId = req.params.id;
  const item = await Item.findById(itemId);

  if (item.img && item.img.public_id) {
    await cloudinary.uploader.destroy(item.img.public_id);
  }

  await Item.findByIdAndDelete({ _id: itemId });
  res.status(203).redirect("/items");
});
module.exports = {
  getItems,
  getItem,
  addItemForm,
  addItem,
  updateItem,
  deleteItemGet,
  deleteItem,
  updateItemForm,
};
