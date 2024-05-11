const mongoose = require("mongoose");

const { Schema } = mongoose;

// Định nghĩa schema cho một sản phẩm trong đơn hàng

const CustomersSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  Name: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String,
    required: true
  }
});
const productSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0,
  },
});

// Định nghĩa schema cho đơn hàng
const OrderSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  customer: {
    type: [CustomersSchema],
    required: true
  },
  product:{
    type: [productSchema],
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

module.exports = mongoose.model("Order", OrderSchema);
