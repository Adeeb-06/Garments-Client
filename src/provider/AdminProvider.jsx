import React, { useContext } from "react";
import api from "../api";
import { AdminContext } from "../context/AdminContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { useQuery } from "@tanstack/react-query";

const AdminProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const fetchUsers = async () => {
    if (!user?.accessToken) return [];
    const res = await api.get("/admin/users", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.data;
  };

  const fetchOrdersAdmin = async () => {
    const res = await api.get("/admin/all-orders", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    console.log(res , "route")
    return res.data;
  };

  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    enabled: !!user,
  });

  const {
    data: ordersAdmin,
    isLoading: isLoadingOrdersAdmin,
    isError: isErrorOrdersAdmin,
    refetch: refetchOrdersAdmin,
  } = useQuery({
    queryKey: ["ordersAdmin"],
    queryFn: () => fetchOrdersAdmin(),
    enabled: !!user,
  });

  const data = {
    users,
    isError,
    refetch,
    ordersAdmin,
    isLoadingOrdersAdmin,
  };

  return <AdminContext value={data}>{children}</AdminContext>;
};

export default AdminProvider;
