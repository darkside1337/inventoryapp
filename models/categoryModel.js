const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      required: true,
      maxLength: 30,
      unique: true,
    },
    description: {
      type: String,
      minLength: 3,
      maxLength: 200,
    },
  },
  {
    timestamps: true,
  }
);

CategorySchema.virtual("url").get(function () {
  return `/categories/category/${this._id}`;
});

module.exports = mongoose.model("Category", CategorySchema);
