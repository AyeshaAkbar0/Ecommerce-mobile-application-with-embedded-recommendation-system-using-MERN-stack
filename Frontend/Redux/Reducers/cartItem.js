//working
// import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY,CLEAR_CART } from "../constants";

// const cartItems = (state = [], action) => {
//   switch (action.type) {
   
//     case ADD_TO_CART:
//       return [...state, action.payload];
//     case REMOVE_FROM_CART:
//       return state.filter((cartItems) => cartItems !== action.payload);
//     case CLEAR_CART:
//       return (state = []);
//       case UPDATE_QUANTITY:
//         return state.map(item => {
//           if (item.product.id === action.payload.product.id) {
//             return { ...item, quantity: action.payload.quantity };
//           }
//           return item;
//         });
//   //     case UPDATE_QUANTITY:
//   // return state.map((item) => {
//   //   if (item.product.id === action.payload.product.id) {
//   //     const updatedItem = { ...item, quantity: action.payload.quantity };
//   //     updatedItem.product.price = updatedItem.product.price * updatedItem.quantity;
//   //     return updatedItem;
//   //   }
//   //   return item;
//   // });
//   }
//   return state;
// };

// export default cartItems;

//Mine working
// import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, INCREASE_QUANTITY, DECREASE_QUANTITY,REMOVE_CHECKED_OUT_ITEMS  } from "../constants";

// const cartItems = (state = [], action) => {
//   switch (action.type) {
//     /*case ADD_TO_CART:
//       return [...state, action.payload];*/
//       case ADD_TO_CART:
//       const existingItem = state.find((item) => item.product.id === action.payload.product.id);
//       if (existingItem) {
//         // If the item already exists in the cart, increase its quantity
//         return state.map((item) => {
//           if (item.product.id === action.payload.product.id) {
//             return {
//               ...item,
//               quantity: item.quantity + 1,
//             };
//           }
//           return item;
//         });
//       } else {
//         // If the item does not exist in the cart, add it as a new item
//         return [...state, action.payload];
//       }
//     case REMOVE_FROM_CART:
//       console.log('Esha')
//       return state.filter((item) => item.product.id !== action.payload.product.id);
//     case CLEAR_CART:
//       return [];
//       case INCREASE_QUANTITY:
//        // console.log('esha')
//         return state.map((item) => {
//           console.log("item.id:", item.product.id, "action.payload:", action.payload);
//           if (item.product.id === action.payload) {
//             return {
//               ...item,
//               quantity: item.quantity + 1,
//             };
//           }
//           return item;
//         });
//     case DECREASE_QUANTITY:
//       return state.map((item) => {
//         if (item.product.id === action.payload && item.quantity > 1) {
//           return {
//             ...item,
//             quantity: item.quantity - 1
//           };
//         }
//         return item;
//       });
//       case REMOVE_CHECKED_OUT_ITEMS:
//         console.log("callteyeeyeyeye")
       
//           const itemsToRemove = action.payload.map((item) => item.product.id);
//           return state.filter((item) => !itemsToRemove.includes(item.product.id));
//     default:
//       return state;
//   }
// };

// export default cartItems;


//new
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  CLEAR_CART,
  REMOVE_CHECKED_OUT_ITEMS,
  STORE_TOTAL_PRICE
} from '../constants';



const initialState = {
  cartItems: [],
};

const cartReducer= (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CART:
      console.log("Updating cart with payload:", action.payload.cartItem);
      return {
        ...state,
        //cartItems: action.payload.cartItem,
        cartItems: [...state.cartItems, ...action.payload.cartItem],
      };
      case REMOVE_CHECKED_OUT_ITEMS:
        console.log("callteyeeyeyeye");
        console.log("Current state:", state);
      
        const itemsToRemove = action.payload.map((item) => item.product.id);
        const updatedCartItems = state.cartItems.filter((cartItem) => !itemsToRemove.includes(cartItem.product.id));
        
        return {
          ...state,
          cartItems: updatedCartItems,
        };
      
      
      
            ////workinggggg save plzz 
          // case ADD_TO_CART:
           
          //   console.log("esha",action.payload.cartItem);
          //   return {
          //     ...state,
          //     cartItems: [...state.cartItems, action.payload.cartItem],
          //   };
//new one
          case ADD_TO_CART:
            console.log("Currentstste", state.cartItems);
            const existingItem = state.cartItems.find((item) => item.product._id === action.payload.cartItem.product._id);
            
            if (existingItem) {
              // If the item already exists in the cart, increase its quantity
              return {
                ...state,
                cartItems: state.cartItems.map((item) => {
                  console.log(item)
                  if (item.product._id === action.payload.cartItem.product._id) {
                    return {
                      ...item,
                      quantity: item.quantity + 1,
                    };
                  }
                  return item;
                }),
              };
            } else {
              // If the item does not exist in the cart, add it as a new item
              return {
                ...state,
                cartItems: [...state.cartItems, action.payload.cartItem],
              };
            }
          
            case CLEAR_CART:
              console.log("Cleared succcess")
              //return [];
            
              return {
                ...state,
                cartItems: [], // Set cartItems to an empty array when clearing the cart
              };
            case REMOVE_FROM_CART:
            console.log('Esha')
            console.log("Current state:", state);
           // return state.filter((item) => item.product.id !== action.payload.product.id);
           return {
            ...state,
            cartItems: state.cartItems.filter(
              (item) => item.product.id !== action.payload.product.id
            ),
          };

          case STORE_TOTAL_PRICE:
            console.log('Current', state)
            return{
              ...state,
              totalPrice: action.payload,
            }
          
              case INCREASE_QUANTITY:
                console.log('eshaIncrease')
                console.log("Current state:", state);
                const index = state.cartItems.findIndex(
                  (cartItem) => cartItem.product.id === action.payload
                );
                if (index !== -1) {
                  // Create a new array with the updated cartItem
                  const updatedCartItems = [...state.cartItems];
                  updatedCartItems[index] = {
                    ...updatedCartItems[index],
                    quantity: updatedCartItems[index].quantity + 1,
                  };
          
                  // Return the updated state
                  return {
                    ...state,
                    cartItems: updatedCartItems,
                  };
                }
                // If the productId is not found in the cartItems, return the state as is
                return state;
                case DECREASE_QUANTITY:
                console.log('eshaDecrease');
                console.log('Current state:', state);
                const decreaseIndex = state.cartItems.findIndex(
                  (cartItem) => cartItem.product.id === action.payload
                );
                if (decreaseIndex !== -1 && state.cartItems[decreaseIndex].quantity > 1) {
                  // Create a new array with the updated cartItem
                  const decreasedCartItems = [...state.cartItems];
                  decreasedCartItems[decreaseIndex] = {
                    ...decreasedCartItems[decreaseIndex],
                    quantity: decreasedCartItems[decreaseIndex].quantity- 1,
                  };
          
                    // Return the updated state
                    return {
                      ...state,
                      cartItems: decreasedCartItems,
                    };
                  }
                  // If the productId is not found in the cartItems or the quantity is already 1, return the state as is
                  return state;
                  default:
                    return state;
                }
              };
              //export default cartItems;
              export default cartReducer;