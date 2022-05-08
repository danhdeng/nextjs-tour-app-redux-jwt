import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import TourReducer from "./features/authSlice";

export default configureStore ({
  reducer:{
    auth:AuthReducer,
    tour:TourReducer,
  },
});
