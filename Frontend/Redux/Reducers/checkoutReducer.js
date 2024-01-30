import { STORE_CHECKOUT_ITEMS} from "../constants";// checkoutReducer.js
const initialState = {
    checkoutItems: [],
  };
  
  const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {
      case STORE_CHECKOUT_ITEMS:
        return {
          ...state,
          checkoutItems: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default checkoutReducer;
  