// routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const CartItem = require('../models/cartItemschema');

// // Route to add an item to the cart
// router.post('/users/:userId/cart', async (req, res) => {
//     console.log('helo')
//   try {
//     const { userId } = req.params;
//     const { productId, quantity } = req.body;

//     // Check if the user exists and the product is valid
//     // (You may need to add proper validations and error handling)

//     // Create a new cart item
//     const cartItem = new CartItem({
//       user: userId,
//       product: productId,
//       quantity: quantity,
//     });
//     console.log(cartItem);

//     // Save the cart item to the database
//     const savedCartItem = await cartItem.save();
//      // Populate the product details in the cart item and send the response
//      await savedCartItem.populate('product');

    
//     // Return the saved cart item in the response
//     res.status(201).json(savedCartItem);
//   } catch (error) {
//     console.log('Error adding item to the cart:', error);
//     res.status(500).json({ error: 'An error occurred while adding item to the cart' });
//   }
// });

//new one
router.post('/users/:userId/cart', async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    // Check if the user exists and the product is valid
    // (You may need to add proper validations and error handling)

    // Check if the product is already present in the user's cart
    let cartItem = await CartItem.findOne({ user: userId, product: productId });

    if (cartItem) {
      // Product is already in the cart, so update the quantity
      cartItem.quantity += quantity;
      await cartItem.save(); // Save the updated quantity
    } else {
      // Product is not in the cart, so create a new cart item
      const newCartItem = new CartItem({
        user: userId,
        product: productId,
        quantity: quantity,
      });

      cartItem = await newCartItem.save(); // Save the new cart item
    }

    // Populate the product details in the cart item and send the response
    await cartItem.populate('product');

    // Return the saved cart item in the response
    res.status(201).json(cartItem);
  } catch (error) {
    console.log('Error adding item to the cart:', error);
    res.status(500).json({ error: 'An error occurred while adding item to the cart' });
  }
});


// Route to get the cart items for a specific user
router.get('/users/:userId/cart', async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all cart items associated with the user ID
    const cartItems = await CartItem.find({ user: userId }).populate('product');

    // Return the cart items in the response
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'An error occurred while fetching cart items' });
  }
});

// // Route to update the quantity of a cart item
// router.put('/users/:userId/cart/:cartItemId', async (req, res) => {
//   try {
//     const { userId, cartItemId } = req.params;
    

//     // Check if the user exists and the cart item is valid
//     // (You may need to add proper validations and error handling)

//     // Update the quantity of the cart item
//     const updatedCartItem = await CartItem.findByIdAndUpdate(
//       cartItemId,
//       { quantity: quantity+1},
//       { new: true } // Return the updated cart item in the response
//     );

//     // Return the updated cart item in the response
//     res.status(200).json(updatedCartItem);
//   } catch (error) {
//     console.error('Error updating cart item:', error);
//     res.status(500).json({ error: 'An error occurred while updating cart item' });
//   }
// });
router.put('/users/:userId/cart/:cartItemId/increaseQuantity', async (req, res) => {
    try {
      const { userId, cartItemId } = req.params;
  
      // Check if the user exists and the cart item is valid
      // (You may need to add proper validations and error handling)
  
      // Fetch the current cart item
      const currentCartItem = await CartItem.findById(cartItemId);
  
      // Increase the quantity by 1
      currentCartItem.quantity += 1;
  
      // Save the updated cart item
      const updatedCartItem = await currentCartItem.save();
  
      // Return the updated cart item in the response
      res.status(200).json(updatedCartItem);
    } catch (error) {
      console.error('Error updating cart item:', error);
      res.status(500).json({ error: 'An error occurred while updating cart item' });
    }
  });


  //Decrease Quanitity

  router.put('/users/:userId/cart/:cartItemId/decreaseQuantity', async (req, res) => {
    try {
      const { userId, cartItemId } = req.params;
  
      // Check if the user exists and the cart item is valid
      // (You may need to add proper validations and error handling)
  
      // Fetch the current cart item
      const currentCartItem = await CartItem.findById(cartItemId);
  
      // decrease the quantity by 1
      if(currentCartItem.quantity>1)
      currentCartItem.quantity -= 1;
  
      // Save the updated cart item
      const updatedCartItem = await currentCartItem.save();
  
      // Return the updated cart item in the response
      res.status(200).json(updatedCartItem);
    } catch (error) {
      console.error('Error updating cart item:', error);
      res.status(500).json({ error: 'An error occurred while updating cart item' });
    }
  });
  

// Route to remove a cart item
router.delete('/users/:userId/cart/:cartItemId', async (req, res) => {
  try {
    const { userId, cartItemId } = req.params;

    // Check if the user exists and the cart item is valid
    // (You may need to add proper validations and error handling)

    // Remove the cart item from the database
    await CartItem.findByIdAndRemove(cartItemId);

    // Return a success message in the response
    res.status(200).json({ message: 'Cart item removed successfully' });
  } catch (error) {
    console.error('Error removing cart item:', error);
    res.status(500).json({ error: 'An error occurred while removing cart item' });
  }
});

// Route to clear all items in the cart
router.delete('/:userId/cart/clear', async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Check if the user exists (You may need to add proper validations and error handling here)
  
      // Find all cart items for the given user and remove them
      await CartItem.deleteMany({ user: userId });
  
      // Return a success message in the response
      res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
      console.error('Error clearing cart:', error);
      res.status(500).json({ error: 'An error occurred while clearing the cart' });
    }
  });
  // Route to remove a cart item
router.delete('/use/:userId/cart/:cartItemId', async (req, res) => {
  try {
    const { userId, cartItemId } = req.params;

    // Check if the user exists and the cart item is valid
    // (You may need to add proper validations and error handling)

    // Remove the cart item from the database
    await CartItem.findByIdAndRemove(cartItemId);

    // Return a success message in the response
    res.status(200).json({ message: 'Cart item removed successfully' });
  } catch (error) {
    console.error('Error removing cart item:', error);
    res.status(500).json({ error: 'An error occurred while removing cart item' });
  }
});


module.exports = router;
