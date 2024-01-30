import { STORE_CHECKOUT_ITEMS} from "../constants";
export const storeCheckoutItems = (checkoutItems) => {
  console.log("storeCheckoutItems is being called");
    return {
      type: STORE_CHECKOUT_ITEMS,
      payload: checkoutItems,
    };
  };