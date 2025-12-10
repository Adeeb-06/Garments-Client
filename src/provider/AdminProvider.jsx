import React, {useContext } from "react";
import api from "../api";
import {AdminContext}  from "../context/AdminContext.jsx";
import  {AuthContext}  from "../context/AuthContext.jsx";
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
 
  const  {data:users, isLoading, isError, refetch} = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    enabled: !!user,
  });

  const data = {
    users,
    isLoadingUser:isLoading,
    isError,
    refetch
  };

  return (
    <AdminContext value={data}>
      {children}
    </AdminContext>
  );
};

export default AdminProvider;
