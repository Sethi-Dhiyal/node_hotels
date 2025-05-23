const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  taste: {
    type: String,
    enum: ["spicy", "sweet", "sour"],
    required: true,
  },
  is_drink: {
    type: Boolean,
    default: false,
    required: true,
  },
  ingredients: {
    type: [String],
    default: [],
  },
  num_sales: {
    type: Number,
    default: 0,
  },
});

// Create the model for the menu item
const MenuItem = mongoose.model("MenuItem", menuItemSchema);


// Export the model
module.exports = MenuItem;
