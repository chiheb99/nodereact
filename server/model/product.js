const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    description: { type: String, required: true },
    prix: { type: Number, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;
