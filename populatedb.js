const Item = require("./models/itemModel");
const Category = require("./models/categoryModel");
const itemsData = [
  {
    name: "Flashlight",
    description: "Compact LED flashlight.",
    category: "Tools",
    price: 12.99,
    numberInStock: 150,
  },
  {
    name: "Tea Kettle",
    description: "Stainless steel whistle tea kettle.",
    category: "Kitchen",
    price: 20.49,
    numberInStock: 100,
  },
  {
    name: "Backpack",
    description: "Durable hiking backpack.",
    category: "Outdoor",
    price: 59.99,
    numberInStock: 75,
  },
  {
    name: "Gloves",
    description: "Leather driving gloves.",
    category: "Clothing",
    price: 24.99,
    numberInStock: 100,
  },
  {
    name: "Chess Set",
    description: "Wooden chess set with hand-carved pieces.",
    category: "Games",
    price: 45.0,
    numberInStock: 50,
  },
  {
    name: "Sneakers",
    description: "Comfortable running shoes.",
    category: "Footwear",
    price: 75.99,
    numberInStock: 200,
  },
  {
    name: "Notebook",
    description: "Spiral-bound lined notebook.",
    category: "Office Supplies",
    price: 3.99,
    numberInStock: 300,
  },
  {
    name: "Succulent Pot",
    description: "Ceramic pot for succulents.",
    category: "Garden",
    price: 10.99,
    numberInStock: 120,
  },
  {
    name: "Table Lamp",
    description: "Adjustable desk table lamp.",
    category: "Furniture",
    price: 39.99,
    numberInStock: 85,
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker.",
    category: "Electronics",
    price: 29.99,
    numberInStock: 90,
  },
  {
    name: "Water Bottle",
    description: "Insulated stainless steel water bottle.",
    category: "Outdoor",
    price: 25.99,
    numberInStock: 120,
  },
  {
    name: "Coffee Maker",
    description: "Programmable 12-cup coffee maker.",
    category: "Kitchen",
    price: 79.99,
    numberInStock: 80,
  },
  {
    name: "Yoga Mat",
    description: "Eco-friendly high-grip yoga mat.",
    category: "Fitness",
    price: 35.0,
    numberInStock: 90,
  },
  {
    name: "Tote Bag",
    description: "Canvas tote bag with leather straps.",
    category: "Accessories",
    price: 29.99,
    numberInStock: 150,
  },
  {
    name: "Desk Organizer",
    description: "Wooden desk organizer with compartments.",
    category: "Office Supplies",
    price: 18.99,
    numberInStock: 110,
  },
  {
    name: "Jigsaw Puzzle",
    description: "1000-piece landscape jigsaw puzzle.",
    category: "Games",
    price: 20.0,
    numberInStock: 60,
  },
  {
    name: "Sandals",
    description: "Waterproof beach sandals.",
    category: "Footwear",
    price: 22.99,
    numberInStock: 85,
  },
  {
    name: "Mouse Pad",
    description: "Ergonomic mouse pad with wrist support.",
    category: "Office Supplies",
    price: 9.99,
    numberInStock: 200,
  },
  {
    name: "Hammock",
    description: "Portable outdoor hammock.",
    category: "Outdoor",
    price: 45.99,
    numberInStock: 50,
  },
  {
    name: "Electric Toothbrush",
    description: "Rechargeable electric toothbrush.",
    category: "Personal Care",
    price: 49.99,
    numberInStock: 75,
  },
];

const addOneItem = async (itemObj) => {
  const { name, description, category, price, numberInStock } = itemObj;

  let categoryDocument = await Category.findOne({ name: category });

  if (!categoryDocument) {
    categoryDocument = await Category.create({
      name: category,
      description: "Default Description",
    });
  }

  const newItem = await Item.create({
    name,
    description,
    category: {
      id: categoryDocument._id,
      name: categoryDocument.name,
    },
    price,
    numberInStock,
  });
};

const populateDb = async () => {
  for (const item of itemsData) {
    await addOneItem(item);
  }
};
module.exports = populateDb;
