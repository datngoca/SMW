import mongoose from "mongoose";

const { Schema } = mongoose;

// Định nghĩa schema cho một sản phẩm trong đơn hàng

const CustomersSchema = new Schema({
  CustomerID: {
    type: mongoose.Types.ObjectId,
    require: true
  },
  Name: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String,
    require: true
  }
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
