import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import bookingReducer from "./slices/bookingSlice";
import paymentReducer from "./slices/paymentSlice";
import reviewReducer from "./slices/reviewSlice";
import serviceReducer from "./slices/serviceSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    bookings: bookingReducer,
    payments: paymentReducer,
    reviews:reviewReducer,
    services:serviceReducer
  },
});

export default store;
