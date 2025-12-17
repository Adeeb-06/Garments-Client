import React, { useContext, useState } from "react";
import api from "../api";
import { AdminContext } from "../context/AdminContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { useQuery } from "@tanstack/react-query";

const AdminProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const limit = 10

  const fetchUsers = async () => {
    if (!user?.accessToken) return [];
    const res = await api.get("/admin/users", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.data;
  };

  const fetchOrdersAdmin = async (page=1 , limit) => {
    const res = await api.get(`/admin/all-orders?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    console.log(res , "route")
    return res;
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
    queryKey: ["ordersAdmin" , page],
    queryFn: () => fetchOrdersAdmin(page, limit),
    enabled: !!user,
  });

  const data = {
    users,
    isError,
    refetch,
    ordersAdmin,
    isLoadingOrdersAdmin,
    setPage,
  };

  return <AdminContext value={data}>{children}</AdminContext>;
};

export default AdminProvider;
