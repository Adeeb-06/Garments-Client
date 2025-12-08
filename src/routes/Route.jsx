import { createBrowserRouter } from "react-router";
import HomeLayout from "../layout/HomeLayout";
import Login from "../pages/Login";
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/Register";

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
    }
])