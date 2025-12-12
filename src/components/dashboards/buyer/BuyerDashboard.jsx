import React, { useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../../context/AuthContext";

import BuyerSidebar from "../../sidebars/BuyerSidebar";
import Footer from "../../Footer";
import BuyerDash from "../../BuyerDash";

const BuyerDashboard = () => {
  const { userData, user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(userData);
  const location = useLocation();

  if (!user) navigate("/auth/login");

  if (loading) return <p>Loading...</p>;

  const logoutUser = async () => {
    const res = await logout();
    if (res) {
      navigate("/");
    }
  };

 return (
  <div className="flex flex-col min-h-screen">

    {/* Main content wrapper */}
    <div className="flex flex-1">
      {/* Sidebar */}
      <aside className="">
        <BuyerSidebar logoutUser={logoutUser} />
      </aside>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
        {location.pathname === "/dashboard" && <BuyerDash />}
      </main>
    </div>

    {/* Footer always at bottom */}
    <Footer />
  </div>
);

};

export default BuyerDashboard;
