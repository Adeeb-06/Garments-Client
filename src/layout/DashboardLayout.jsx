import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

import AdminDashboard from "../components/dashboards/admin/AdminDashboard";
import ManagerDashboard from "../components/dashboards/ManagerDashboard";
import BuyerDashboard from "../components/dashboards/BuyerDashboard";

const DashboardLayout = () => {
  const { userData, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();


  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth/login");
    }
  }, [user, loading, navigate]);

  console.log(userData)

  if (loading) return <p>Loading...</p>;
  if (!user) return null; 

  const renderDashboard = () => {
    switch (userData?.role) {
      case "admin":
        return <AdminDashboard />;
      case "manager":
        return <ManagerDashboard />;
      case "buyer":
        return <BuyerDashboard />;
     
    }
  };

  return <div className="flex">{renderDashboard()}</div>;
};

export default DashboardLayout;
