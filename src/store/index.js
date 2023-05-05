import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./cartSlice";
import ordersSliceReducer from "./ordersSlice";

const store = configureStore({
  reducer: { cart: cartSliceReducer, orders: ordersSliceReducer },
});

export default store;
