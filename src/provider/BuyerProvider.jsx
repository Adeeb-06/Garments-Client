import React, { useContext, useState } from "react";
import api from "../api.js";
import { AdminContext } from "../context/AdminContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { useQuery } from "@tanstack/react-query";
import { ManagerContext } from "../context/ManagerContext.jsx";
import { BuyerContext } from "../context/BuyerContext.jsx";

const BuyerProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [id, setId] = useState(null);
  const [orderID, setOrderID] = useState();

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
    const res = await api.get("/products-homepage", {});
    return res.data;
  };

  const fetchOrderByID = async (id) => {
    const res = await api.get(`/order/${id}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    console.log(res);
    return res.data;
  };

  const fetchOrders = async () => {
    const res = await api.get(`/buyer/all-orders/${user.email}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.data;
  };

  const fetchAllProducts = async () => {
    const res = await api.get("/all-products", {});
    return res.data;
  };

  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductByID(id),
    enabled: !!user && !!id,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const {
    data: productsHome,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["productsHome"],
    queryFn: () => fetchProducts(),
  });
  const {
    data: order,
    isLoading: isLoadingOrder,
    isError: isErrorOrder,
    refetch: refetchOrder,
  } = useQuery({
    queryKey: ["order", orderID],
    queryFn: () => fetchOrderByID(orderID),
    enabled: !!user && !!orderID,
  });
  const {
    data: buyerOrders,
    isLoading: isLoadingBuyerOrders,
    isError: isErrorBuyerOrders,
    refetch: refetchBuyerOrders,
  } = useQuery({
    queryKey: ["buyerOrders", user?.email],
    queryFn: () => fetchOrders(),
    enabled: !!user,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const {
    data: allProducts,
    isLoading: isLoadingAllProducts,
    isError: isErrorAllProducts,
    refetch: refetchAllProducts,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: () => fetchAllProducts(),
  });

  const data = {
    product,
    isError,
    refetch,
    setId,
    productsHome,
    isLoadingProducts,
    isErrorProducts,
    refetchProducts,
    orderID,
    order,
    isLoadingOrder,
    setOrderID,
    buyerOrders,
    isLoadingBuyerOrders,
refetchBuyerOrders,
    allProducts,
    isLoadingAllProducts,
  };

  return <BuyerContext value={data}>{children}</BuyerContext>;
};

export default BuyerProvider;
