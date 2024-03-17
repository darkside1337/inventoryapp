const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      required: true,
    },
    description: {
      type: String,
      minLength: 3,
      required: true,
      maxLength: 300,
    },
    category: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    img: {
      secure_url: {
        type: String,
        default:
          "https://res.cloudinary.com/drah7v8c0/image/upload/v1710628934/gprc4he9oxclsdwnefd9.png",
      },
      public_id: String,
    },
    price: { type: Number, required: true, min: 0 },
    numberInStock: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

ItemSchema.virtual("url").get(function () {
  return `/items/item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);
