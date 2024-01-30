// cartItemSchema.js

const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  { timestamps: true }
);

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
