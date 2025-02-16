import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Notfound from './components/Notfound/Notfound';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Payment from './components/Payment/Payment';
import Orders from './components/Orders/Orders';
import WishList from './components/WishList/WishList';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import EnterCode from './components/ForgetPassword/EnterCode';
import ChangePassword from './components/ForgetPassword/ChangePassword';

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Layout></Layout>,
      children: [
        {
          index: true,
          element: <Login></Login>,
        },
        {
          path: '/home',
          element: (
            <ProtectedRoute>
              <Home></Home>
            </ProtectedRoute>
          ),
        },
        {
          path: '/cart',
          element: (
            <ProtectedRoute>
              <Cart></Cart>
            </ProtectedRoute>
          ),
        },
        {
          path: '/products',
          element: (
            <ProtectedRoute>
              <Products></Products>
            </ProtectedRoute>
          ),
        },
        {
          path: '/categories',
          element: (
            <ProtectedRoute>
              <Categories></Categories>
            </ProtectedRoute>
          ),
        },
        {
          path: '/productDetails/:id/:catId',
          element: (
            <ProtectedRoute>
              <ProductDetails></ProductDetails>
            </ProtectedRoute>
          ),
        },
        {
          path: '/brands',
          element: (
            <ProtectedRoute>
              <Brands></Brands>
            </ProtectedRoute>
          ),
        },
        {
          path: '/payment',
          element: (
            <ProtectedRoute>
              <Payment></Payment>
            </ProtectedRoute>
          ),
        },
        {
          path: '/wishlist',
          element: (
            <ProtectedRoute>
              <WishList></WishList>
            </ProtectedRoute>
          ),
        },
        {
          path: '/allorders',
          element: (
            <ProtectedRoute>
              <Orders></Orders>
            </ProtectedRoute>
          ),
        },

        {
          path: '/register',
          element: <Register></Register>,
        },
        {
          path: '/forgetpass',
          element: <ForgetPassword></ForgetPassword>,
        },
        {
          path: '/entercode',
          element: <EnterCode></EnterCode>,
        },
        {
          path: '/changepass',
          element: <ChangePassword></ChangePassword>,
        },
        {
          path: '*',
          element: <Notfound></Notfound>,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
