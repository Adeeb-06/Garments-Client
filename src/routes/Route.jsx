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
import PaymentCancel from "../pages/PaymentCancel";
import PendingOrders from "../components/dashboards/manager/PendingOrders";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import ManagerRoute from "../provider/ManagerRoute";
import ApprovedOrders from "../components/dashboards/manager/ApprovedOrders";
import AdminRoute from "../provider/AdminRoute";
import BuyerRoute from "../provider/BuyerRoute";
import Orders from "../components/dashboards/buyer/Orders";
import Profile from "../pages/Profile";
import ManagerOrBuyerRoute from "../provider/ManagerOrBuyerRoute";
import OrderDetail from "../pages/OrderDetail";
import AllProducts from "../pages/AllProducts";
import OrdersAdmin from "../components/dashboards/admin/OrdersAdmin";
import AdminOrManagerRoute from "../provider/AdminOrManagerRoute";
import NotFound from "../pages/NotFound";

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
        element: (
          <ApproveRoute>
            {" "}
            <Payment />{" "}
          </ApproveRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <ApproveRoute>
            {" "}
            <PaymentSuccess />{" "}
          </ApproveRoute>
        ),
      },
      {
        path: "payment-cancel",
        element: (
          <ApproveRoute>
            {" "}
            <PaymentCancel />{" "}
          </ApproveRoute>
        ),
      },
      {
        path: "all-products",
        element: <AllProducts />,
      },
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
        element: (
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <ApproveRoute>
            <ManagerRoute>
              <AddProduct />
            </ManagerRoute>
          </ApproveRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ManagerRoute>
            <ProductManagement />
          </ManagerRoute>
        ),
      },
      {
        path: "update-product/:id",
        element: <UpdateProduct />,
      },
      {
        path: "all-products",
        element: (
          <AdminRoute>
            <Products />
          </AdminRoute>
        ),
      },
      {
        path: "pending-orders",
        element: (
          <ManagerRoute>
            <PendingOrders />
          </ManagerRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <BuyerRoute>
            <Orders />
          </BuyerRoute>
        ),
      },
      {
        path: "all-orders",
        element: (
          <AdminRoute>
            <OrdersAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ManagerOrBuyerRoute>
            <Profile />
          </ManagerOrBuyerRoute>
        ),
      },
      {
        path: "/dashboard/track-order/:id",
        element: (
          <BuyerRoute>
            <OrderDetail />
          </BuyerRoute>
        ),
      },
      {
        path: "order-details/:id",
        element: (
          <AdminOrManagerRoute>
            <OrderDetail />
          </AdminOrManagerRoute>
        ),
      },
      {
        path: "approved-orders",
        element: (
          <ManagerRoute>
            <ApprovedOrders />
          </ManagerRoute>
        ),
      },
    ],
  },
  {
    path: "/access-denied",
    element: <AccountStatus />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: "*",
    element: <NotFound />
  }
]);
