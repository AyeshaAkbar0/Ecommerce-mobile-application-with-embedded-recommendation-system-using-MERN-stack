const express = require('express');
const router = express.Router();
//const {Book}= require('../models/product');
const {Product}= require('../models/product')
const {Review} = require('../models/review');
const User= require ('../models/user')


// ...

// Get reviews for a specific book
router.get('/getBookReviews/:bookId', async (req, res) => {
  try {
  //const reviews = await Review.find({ bookId: req.params.bookId }).select('-bookId');
const reviews = await Review.find({ bookId: req.params.bookId })
      .populate('userId', 'name') // Populate the userId field with the 'name' field from the User schema
      .select('-bookId');
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Route to get total number of ratings for a book
router.get('/totalRatings/:bookId', async (req, res) => {
  try {
    const bookId = req.params.bookId;

    // Find all reviews for the specified book
    const reviews = await Review.find({ bookId });

    const totalRatings = reviews.length;

    res.json({ totalRatings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Route to calculate the average rating for a specific book
router.get('/averageRating/:bookId', async (req, res) => {
  try {
    const bookId = req.params.bookId;

    // Find all reviews for the specified book
    const reviews = await Review.find({ bookId });

    if (reviews.length === 0) {
      console.log('Ty')
      return res.status(404).json({ message: 'No reviews found for the book' });
    }

    // Calculate the average rating
    const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
    console.log(totalRatings)
    console.log(reviews.length)
    const averageRating = totalRatings / reviews.length;

    res.json({ averageRating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get submitted reviews for a user
router.get('/submittedReviews', async (req, res) => {
  console.log("whyynot")
  const userId = req.query.userId;
  
  try {
    const submittedReviews = await Review.find({ userId });
    res.status(200).json(submittedReviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.post('/submitReview', async (req, res) => {
    console.log("me caling")
    try {
      const { bookId, userId,orderId, rating, comment,date } = req.body;
      console.log("boo",bookId)
      
      // Check if the book exists
      const book = await Product.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      const review = new Review({ bookId, userId,orderId, rating, comment,date });
      await review.save();
      
      res.json({ message: 'Review submitted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  module.exports=router;
