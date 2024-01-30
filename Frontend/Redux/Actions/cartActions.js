//working
/*import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART ,UPDATE_QUANTITY} from "../constants";

export const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};

export const removeFromCart = (payload) => {
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
};
export const updateQuantity = (product, quantity) => {
  return {
    type: UPDATE_QUANTITY,
    payload: { product, quantity }
  };
};
export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};*/



//Mine working

/*import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART,INCREASE_QUANTITY,DECREASE_QUANTITY, REMOVE_CHECKED_OUT_ITEMS  } from "../constants";

export const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};

export const removeFromCart = (payload) => {
  console.log('Me')
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
};
export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
export const increaseQuantity = (productId) => {
  console.log('increasehy');
  return {
    
    type: INCREASE_QUANTITY,
    payload: productId,
  };
};

export const decreaseQuantity = (productId) => {
  return {
    
    type: DECREASE_QUANTITY,
    payload: productId,
  };
};


export const removeCheckedOutItems = (itemsToRemove) => {
  console.log("calling to you plz ")
  return {
    type: REMOVE_CHECKED_OUT_ITEMS,
    payload: itemsToRemove,
  };
};*/

import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART,INCREASE_QUANTITY,DECREASE_QUANTITY,CLEAR_CART ,REMOVE_CHECKED_OUT_ITEMS,STORE_TOTAL_PRICE} from "../constants";
import  {baseURL}  from "../../assets/common/baseUrl";


export const updateCart = (cartItems) => {
  console.log('callingggggggggggg meeeeee');
  return {
    type: UPDATE_CART,
    payload: { cartItems },
  };
};
import store from '../store';
import axios from 'axios'
export const fetchCartItems = (userId) => {
  return async () => {
    try {
      const response = await axios.get(`${baseURL}cartItems/users/${userId}/cart`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      console.log('Fetched cart items:', data);

      if (data && data.length > 0) {
        console.log("yes")
        // Dispatch the cart items to Redux
        store.dispatch({ type: UPDATE_CART, payload: {cartItem:data}});
         } else {
        // Handle the error condition here and dispatch an error action
        console.log("nooooo")
      }
    } catch (error) {
      console.log('Error fetching cart items:', error);
    }
  };
};

export const clearfromCart = () => {
  // return {
  //   type: CLEAR_CART,
  // };
  store.dispatch({ type: CLEAR_CART});
};
export const storeTotalPrice=(totalPrice)=>{
  console.log("vdddvc")
  return{
    type: STORE_TOTAL_PRICE,
    payload: totalPrice
  }
}

// Add this action to handle adding an item to the cart on the server-side
export const addToCartServer = (userId, productId, quantity) => {
  return async (dispatch) => {
    try {
      console.log('userId', userId)
       console.log('productId',productId)
      const response = await fetch(`${baseURL}cartItems/users/${userId}/cart`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ productId, quantity }),
      });
      console.log('Response status:', response.status);
      
      if (response.ok)
      {
      const data = await response.json();
       // Assuming the response contains the cart item with populated product details
       const { product, quantity,_id } = data;
       console.log('hiii', product);
       console.log("please help",_id)
      //console.log('Response data:', data);
      // Assuming the response contains the added cart item, update the cart in the Redux store
      dispatch({ type: ADD_TO_CART, payload: {
        cartItem: { product, quantity,_id },
      },  });
    } 
  }catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
};
// Action to remove checked-out items from both Redux store and database
export const removeCheckedOutItems = (itemsToRemove) => {
  return async (dispatch) => {
    try {
      // Delete the items from the database
      const deletePromises = itemsToRemove.map((item) => {
        return axios.delete(`${baseURL}cartItems/use/${item.user}/cart/${item._id}`);
      });

      await Promise.all(deletePromises);

      // Dispatch the action to remove items from the Redux store
      dispatch({
        type: REMOVE_CHECKED_OUT_ITEMS,
        payload: itemsToRemove,
      });
    } catch (error) {
      console.error('Error removing checked out items:', error);
    }
  };
};
export const clearCart = (userId) => {
  console.log("tyyuserId",userId)
  return async (dispatch) => {
    try {
      // Make the API request to clear the cart items
      const response = await fetch(`${baseURL}cartItems/${userId}/cart/clear`, {
        method: 'DELETE',
      });

      // Check if the request was successful
      if (response.ok) {
        // Dispatch the CLEAR_CART action to clear the cart in the Redux store
        dispatch({
          type: CLEAR_CART
        });
      } else {
        // Handle the case when the server returned an error
        console.error('Failed to clear the cart');
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Error clearing the cart:', error);
    }
  };
};

export const increaseQuantity = (productId,userId, cartIId) => {
  return async (dispatch) => {
    console.log(cartIId)
    try {
      const response = await fetch(`${baseURL}cartItems/users/${userId}/cart/${cartIId}/increaseQuantity`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: 1 }), // Increase quantity by 1, adjust this as needed
      });

      if (response.ok) {
        // If the server update is successful, dispatch the Redux action
        dispatch({ type: INCREASE_QUANTITY, payload: productId });
      }
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };
};

export const decreaseQuantity = (productId,userId, cartIId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseURL}cartItems/users/${userId}/cart/${cartIId}/decreaseQuantity`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: 1 }), // Increase quantity by 1, adjust this as needed
      });

      if (response.ok) {
        // If the server update is successful, dispatch the Redux action
        dispatch({ type: DECREASE_QUANTITY, payload: productId });
      }
    } catch (error) {
      console.error('Error DECREASING quantity:', error);
    }
  };
};
 // Assuming you have defined the action types

// Define the action creator with thunk
export const removeFromCart = (product, cartIId,userId) => {
  console.log('Me');
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseURL}cartItems/users/${userId}/cart/${cartIId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // If the API call is successful, dispatch the REMOVE_FROM_CART action
        dispatch({ type: REMOVE_FROM_CART, payload: product });
      } else {
        console.error('Error removing cart item:', response.status);
      }
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };
};



