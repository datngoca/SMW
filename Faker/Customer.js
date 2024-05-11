const mongoose = require("mongoose");

const { Schema } = mongoose;

const CustomerSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true
  },
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

module.exports =  mongoose.model("Customer", CustomerSchema);
