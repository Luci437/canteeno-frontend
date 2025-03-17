import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItemType = {
  cartItemId: number;
  itemId: number;
  itemName: string;
  quantity: number;
  price: number;
  createdAt: string; // Consider using `Date` for better date handling
  updatedAt: string; // Consider using `Date` for better date handling
};

export type CartType = {
  cartId: number;
  userId: number;
  totalPrice: number;
  status: "ACTIVE" | "INACTIVE" | "PENDING" | "COMPLETED"; // Add relevant status options
  cartItems: CartItemType[];
  createdBy: string;
  createdAt: string; // Consider using `Date`
  updatedBy: string;
  updatedAt: string; // Consider using `Date`
};

type CartState = {
  cart: CartType | null;
};

const initialState: CartState = {
  cart: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<CartType>) {
      state.cart = action.payload;
    },
    clearCart(state) {
      state.cart = null;
    },
  },
});

export const { setCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
