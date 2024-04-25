const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  }
});

const Role = model('Role', roleSchema);

module.exports = Role;
