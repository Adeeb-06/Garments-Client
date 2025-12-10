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

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            {
                path: "/",
                element: <h1>Home</h1>
            },
            {
                path: "/about",
                element: <h1>About</h1>
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register/>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: "users",
                element: <UserManagement/>
            },
            {
                path: "add-product",
                element: <AddProduct/>
            },
            {
                path: "products",
                element: <ProductManagement/>
            }
            
        ]
       
    }
])