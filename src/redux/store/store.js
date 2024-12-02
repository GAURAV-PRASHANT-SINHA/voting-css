import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlice";
import productReducer from "../slices/products/productSlices";
import cartReducer from "../slices/carts/cartSlice";

import ordersReducer from "../slices/orders/ordersSlices";
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    carts: cartReducer,
    orders: ordersReducer,
  },
});

export default store;
