const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: String,
    no_of_Products:{
      type: Number,
      default :0,
    },
    price: {
      type: Number,
      default: 0,
    },
    serviceProvider: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports =  mongoose.model("Product", productSchema);
