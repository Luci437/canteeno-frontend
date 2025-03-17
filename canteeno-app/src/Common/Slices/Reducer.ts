import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import deviceReducer from "./DeviceSlice";
import cartReducer from "./CartSlice";

const rootReducer = combineReducers({
  user: userReducer,
  device: deviceReducer,
  cart: cartReducer,
  // Add your reducers here
});

export default rootReducer;
