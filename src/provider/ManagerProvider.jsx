import React, {useContext, useState } from "react";
import api from "../api";
import {AdminContext}  from "../context/AdminContext.jsx";
import  {AuthContext}  from "../context/AuthContext.jsx";
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
 
  const  {data:product, isLoading, isError, refetch} = useQuery({
    queryKey: ["product",id],
    queryFn:()=> fetchProductByID(id),
    enabled: !!user && !!id,
  });

  const data = {
    product,
    isLoadingUser:isLoading,
    isError,
    refetch,
    setId
  };

  return (
    <ManagerContext value={data}>
      {children}
    </ManagerContext>
  );
};

export default ManagerProvider;
