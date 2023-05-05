import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: { cart: {} },
  reducers: {
    incrementCartItem: (state, action) => {
      const itemId = action.payload;
      state.cart[itemId] = (state.cart[itemId] || 0) + 1;
    },
    decrementCartItem: (state, action) => {
      const itemId = action.payload;
      if (state.cart[itemId] === 1 || undefined) {
        state = state;
      } else if (state.cart[itemId] > 1) {
        state.cart[itemId] = state.cart[itemId] - 1;
      }
    },
    removeCartItem: (state, action) => {
      const itemId = action.payload;
      delete state.cart[itemId];
    },
    clearCart: (state, action) => {
      state.cart = {};
    },
  },
  extraReducers: (builder) => {
    builder.addDefaultCase((state, action) => {
      state;
    });
  },
});

export default cartSlice.reducer;
export const {
  incrementCartItem,
  decrementCartItem,
  removeCartItem,
  clearCart,
} = cartSlice.actions;
