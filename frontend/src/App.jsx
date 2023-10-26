import { Counter } from './features/counter/Counter';
import './App.css';
import Home from './pages/Home';

import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';

import AdminHome from './pages/AdminHome';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Protected from './features/auth/components/Protected';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';


const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      // <Protected>
      <Home></Home>
      // </Protected>
    ),
  },
  {
    path: '/login',
    element: (
      <LoginPage />
    )
  },
  {
    path: '/signup',
    element: (
      <SignupPage />
    )
  },
  {
    path: '/admin',
    element: (
      // <ProtectedAdmin>
      <AdminHome></AdminHome>
      // </ProtectedAdmin>

    ),
  },

  {
    path: '/cart',
    element: (

      <CartPage></CartPage>

    ),
  },
  {
    path: '/checkout',
    element: (

      <Checkout></Checkout>

    ),
  },
  {
    path: '/product-detail/:id',
    element: (

      <ProductDetailPage></ProductDetailPage>

    ),
  },
  {
    path: '/admin/product-detail/:id',
    element: (

      <AdminProductDetailPage></AdminProductDetailPage>

    ),
  },
  {
    path: '/admin/product-form',
    element: (

      <AdminProductFormPage></AdminProductFormPage>

    ),
  },
  {
    path: '/admin/orders',
    element: (

      <AdminOrdersPage></AdminOrdersPage>

    ),
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (

      <AdminProductFormPage></AdminProductFormPage>

    ),
  },
  {
    path: '/order-success/:id',
    element: (

      <OrderSuccessPage></OrderSuccessPage>

    ),
  },
  {
    path: '/my-orders',
    element: (
      <Protected>


        <UserOrdersPage></UserOrdersPage>
      </Protected>

    ),
  },
  {
    path: '/profile',
    element: (

      <UserProfilePage></UserProfilePage>

    ),
  },

  {
    path: '*',
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  // const dispatch = useDispatch();
  // const user = useSelector(selectLoggedInUser);
  const userChecked = true;

  // useEffect(() => {
  //   dispatch(checkAuthAsync());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (user) {
  //     dispatch(fetchItemsByUserIdAsync());
  //     // we can get req.user by token on backend so no need to give in front-end
  //     dispatch(fetchLoggedInUserAsync());
  //   }
  // }, [dispatch, user]);

  return (
    <>
      <div className="App">
        {userChecked && (
          <Provider template={AlertTemplate} {...options}>
            <RouterProvider router={router} />
          </Provider>
        )}

      </div>
    </>
  );
}

export default App;
