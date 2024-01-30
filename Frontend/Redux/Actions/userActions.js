import { SET_USER_PROFILE } from "../constants";
export const setUserProfile = (userProfile) => {
    console.log("Eshayyy",userProfile);
    return {
      type: SET_USER_PROFILE,
      payload: userProfile,
    };
  };
  