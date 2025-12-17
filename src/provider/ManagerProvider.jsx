import React, { useContext, useState } from "react";
import api from "../api";
import { AdminContext } from "../context/AdminContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { useQuery } from "@tanstack/react-query";
import { ManagerContext } from "../context/ManagerContext.jsx";

const ManagerProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [id, setId] = useState(null);

  const fetchProductByID = async (id) => {
    if (!user?.accessToken) return [];
    const res = await api.get(`/product/${id}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.data;
  };

  const fetchProducts = async () => {
    const res = await api.get("/products", {});
    console.log(res);
    return res.data;
  };

  const fetchPendingOrders = async () => {
    const res = await api.get("/manager/pending-orders", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    console.log("Pending................",res);
    return res.data;
  };

  const fetchApprovedOrders = async () => {
    const res = await api.get("/manager/approved-orders", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    console.log("Approve........",res);
    return res.data;
  };

  const {
    data: productManager,
    isLoadingProductManager,
    isFetching,
    isError,
    refetch: refetchProductManager,
  } = useQuery({
    queryKey: ["productManager", id],
    queryFn: () => fetchProductByID(id),
    enabled: !!user && !!id,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
    enabled: !!user,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const {
    data: pendingOrders,
    isLoading: isLoadingPendingOrders,
    isError: isErrorPendingOrders,
    refetch: refetchPendingOrders,
  } = useQuery({
    queryKey: ["pendingOrders"],
    queryFn: () => fetchPendingOrders(),
    enabled: !!user?.accessToken,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const {
    data: approvedOrders,
    isLoading: isLoadingApprovedOrders,
    isError: isErrorApprovedOrders,
    refetch: refetchApprovedOrders,
    isFetching: isFetchingApprovedOrders,
  } = useQuery({
    queryKey: ["approvedOrders"],
    queryFn: () => fetchApprovedOrders(),
    enabled: !!user?.accessToken,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const data = {
    productManager,
    refetchProductManager,
    isError,
    setId,
    products,
    isLoadingProducts,
    isErrorProducts,
    refetchProducts,
    pendingOrders,
    isLoadingPendingOrders,
    isErrorPendingOrders,
    refetchPendingOrders,
    approvedOrders,
    isLoadingApprovedOrders,
    isErrorApprovedOrders,
    refetchApprovedOrders,
    isFetchingApprovedOrders,
  };

  return (
    <ManagerContext.Provider value={data}>{children}</ManagerContext.Provider>
  );
};

export default ManagerProvider;
