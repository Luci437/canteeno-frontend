import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import cartReducer from "./CartSlice";
import loadingReducer from "./LoadingSlice";
import errorMessageReducer from "./ErrorMessage";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  loading: loadingReducer,
  errorMessage: errorMessageReducer,
  // Add your reducers here
});

export default rootReducer;
