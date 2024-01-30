import { SET_USER_PROFILE } from "../constants";
const initialState = {
    userProfile: null,
    // ...other state properties
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_USER_PROFILE:
        return {
          ...state,
          userProfile: action.payload,
        };
      // ...other cases
      default:
        return state;
    }
  };
  
  export default userReducer;
  