const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Replace 'User' with your user schema name
    required: true,
  },

  //new change 

  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order', // Replace 'Order' with your order schema name
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
});

exports.Review = mongoose.model('Review', reviewSchema);
