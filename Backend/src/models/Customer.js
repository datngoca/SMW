import mongoose from "mongoose";

const { Schema } = mongoose;

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});
CustomerSchema.index({ name: 'text' });
export default mongoose.model("Customer", CustomerSchema);
