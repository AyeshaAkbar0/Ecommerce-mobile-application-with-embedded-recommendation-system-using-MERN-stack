// // working/*import {  combineReducers, applyMiddleware } from "redux";
// import { legacy_createStore as createStore} from 'redux'
// import thunkMiddleware from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

// import cartItems from "./Reducers/cartItem";

// const reducers = combineReducers({
//  cartItems: cartItems
// });

// const store = createStore(
//   reducers,
//   composeWithDevTools(applyMiddleware(thunkMiddleware))
// );

// export default store;*/



///mine 
import {  combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore} from 'redux'
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";


import cartReducer from "./Reducers/cartItem";
//import checkoutReducer from "./Reducers/checkoutReducer";
import checkoutReducer from "./Reducers/checkoutReducer";
import userReducer from "./Reducers/userReducer";

const reducers = combineReducers({

userProfile:userReducer,

 cartItems: cartReducer,
 checkoutItems: checkoutReducer,
 
  // Include the new reducer
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
