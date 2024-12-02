import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  cartItems: [],
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

// Add product to cart
export const addOrderToCartaction = createAsyncThunk(
  "cart/add-to-cart",
  async (cartItem) => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    // Push to storage
    cartItems.push(cartItem);
    console.log(cartItem);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
);

// Get cart items from localStorage
export const getCartItemsFromLocalStorageAction = createAsyncThunk(
  "cart/get-order-items",
  async () => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    return cartItems;
  }
);

// Change order item quantity
export const changeOrderItemQty = createAsyncThunk(
  "cart/change-item-qty",
  async ({ productId, qty }) => {
    console.log(productId, qty);
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    const newCartItems = cartItems?.map((item) => {
      if (item?._id?.toString() === productId?.toString()) {
        // Get new price
        const newPrice = item?.price * qty;
        item.qty = +qty;
        item.totalPrice = newPrice;
      }
      return item;
    });
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  }
);

// Remove from cart
export const removeOrderItemQty = createAsyncThunk(
  "cart/removeOrderItem",
  async (productId) => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    const newItems = cartItems?.filter((item) => item?._id !== productId);
    localStorage.setItem("cartItems", JSON.stringify(newItems));
  }
);

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    // Add to cart
    builder.addCase(addOrderToCartaction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addOrderToCartaction.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
      state.isAdded = true;
    });
    builder.addCase(addOrderToCartaction.rejected, (state, action) => {
      state.loading = false;
      state.cartItems = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    // Fetch cart items
    builder.addCase(getCartItemsFromLocalStorageAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getCartItemsFromLocalStorageAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.isAdded = true;
      }
    );
    builder.addCase(
      getCartItemsFromLocalStorageAction.rejected,
      (state, action) => {
        state.loading = false;
        state.cartItems = null;
        state.isAdded = false;
        state.error = action.payload;
      }
    );
  },
});

// Generate the reducer
const cartReducer = cartSlice.reducer;

export default cartReducer;
