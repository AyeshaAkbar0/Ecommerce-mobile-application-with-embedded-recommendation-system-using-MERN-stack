// import { SET_CURRENT_USER } from "../actions/Authactions";
// import isEmpty from "../../assets/common/is-empty";

// export default function(state, action){
//     switch(action.type){
//         case SET_CURRENT_USER:
//             return{
//                 ...state,
//                 isAuthenticated:!isEmpty(action.payload),
//                 user:action.payload,
//                 userProfile:action.userProfile
//             };
//             default:
//                 return state;
//     }
// }

import { SET_CURRENT_USER } from "../actions/Authactions";
import isEmpty from "../../assets/common/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {},
  userProfile: null
};
//Chatgpt Logic
// export default function (state = initialState, action) {
//   switch (action.type) {
//     case SET_CURRENT_USER:
//       return {
//         ...state,
//         isAuthenticated: !isEmpty(action.payload),
//         user: action.payload,
//         userProfile: action.payload.email, // Access email property from action.payload
//       };
//     default:
//       return state;
//   }
// }



export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        userProfile: action.userProfile,
        userId:action.userId
      };
    default:
      return state;
  }
}
