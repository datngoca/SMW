import mongoose from "mongoose";

const { Schema } = mongoose;

// Định nghĩa schema cho một sản phẩm trong đơn hàng

const ProductSchema = new Schema({
  product_id: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  total_price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

// Định nghĩa schema cho đơn hàng
const OrderSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  products: {
    type: [ProductSchema],
    required: true
  },
  order_date: {
    type: Date,
    required: true
  },
  shipping_address: {
    type: String,
    required: true
  },
  payment_method: {
    type: String,
    required: true
  },
  payment_status: {
    type: String,
    required: true
  }
});

export default mongoose.model("Order", OrderSchema);
