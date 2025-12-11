import { createBrowserRouter } from "react-router";
import HomeLayout from "../layout/HomeLayout";
import Login from "../pages/Login";
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/Register";
import DashboardLayout from "../layout/DashboardLayout";
import UserManagement from "../components/dashboards/admin/UsersManagement";
import AddProduct from "../components/dashboards/manager/AddProduct";
import PrivateRoute from "../provider/PrivateRoute";
import ProductManagement from "../components/dashboards/manager/ProductManagement";
import UpdateProduct from "../components/dashboards/manager/UpdateProduct";
import Home from "../pages/Home";
import ProductDetailsPage from "../pages/ProductDetails";
import OrderPage from "../pages/OrderPage";
import AccountStatus from "../components/AccountStatus";
import ApproveRoute from "../provider/ApproveRoute";
import Products from "../components/dashboards/admin/Products";
import Payment from "../pages/Payment";
import PaymentSuccess from "../pages/PaymentSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/about",
        element: <h1>About</h1>,
      },
      {
        path: "product/:id",
        element: (
          <PrivateRoute>
            <ProductDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "order/:id",
        element: (
          <ApproveRoute>
            <OrderPage />
          </ApproveRoute>
        ),
      },
      {
        path: "/payment/:orderId",
        element: <ApproveRoute> <Payment /> </ApproveRoute>,
      },
      {
        path: "payment-success",
        element: <ApproveRoute> <PaymentSuccess /> </ApproveRoute>,
      }
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "users",
        element: <UserManagement />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "products",
        element: <ProductManagement />,
      },
      {
        path: "update-product/:id",
        element: <UpdateProduct />,
      },
      {
        path: "all-products",
        element: <Products />,
      },
    ],
  },
  {
    path: "/access-denied",
    element: <AccountStatus />,
  },
]);
