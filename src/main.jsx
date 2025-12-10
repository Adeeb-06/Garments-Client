import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/Route.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import AdminProvider from "./provider/AdminProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ManagerProvider from "./provider/ManagerProvider.jsx";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AdminProvider>
          <ManagerProvider>
            <ToastContainer/>
            <RouterProvider router={router} />
          </ManagerProvider>
        </AdminProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
