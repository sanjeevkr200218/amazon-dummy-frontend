import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "ordersSlice",
  initialState: [],
  reducers: {
    makeOrder: (state, action) => {
      const actionDate = action.payload.date;
      const actionCart = action.payload.cart;
      const totalPrice = action.payload.totalPrice;
      const quantity = action.payload.quantity;
      state.push({ [actionDate]: { cart: actionCart, totalPrice, quantity } });
    },
  },
});

export const { makeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
