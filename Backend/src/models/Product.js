import mongoose from "mongoose";

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
    status: String
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Product", productSchema);
