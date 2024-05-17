import mongoose from "mongoose";

const { Schema } = mongoose;


const OrderSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  customer: {
    name: {
      type: String,
      required: true
    },
    phone_number: {
      type: String,
      required: true
    }
  },
  // Include only specific fields from productSchema
  product: [{
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
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