import { configureStore, createReducer } from '@reduxjs/toolkit';
import productReducer from '../../../frontend/src/features/product/productSlice';
import cartReducer from '../../../frontend/src/features/cart/cartSlice';
import orderReducer from '../../../frontend/src/features/order/orderSlice';
import userReducer from '../../../frontend/src/features/user/userSlice';
import authReducer from '../../../frontend/src/features/auth/authSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
    auth:authReducer
  },
});
