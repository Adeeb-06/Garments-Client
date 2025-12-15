import React, { useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../../context/AuthContext";

import BuyerSidebar from "../../sidebars/BuyerSidebar";
import BuyerDash from '../../BuyerDash'
import Footer from "../../Footer";
import AdminSideBar from "../../sidebars/AdminSideBar";


const BuyerDashboard = () => {
  const { userData ,user, logout , loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(userData)

  if(!user) navigate("/auth/login");

  if (loading) return <p>Loading...</p>;


    const logoutUser = async() => {
    const res = await logout();
    if (res) {
      navigate("/");
    }

  };



  return (
   <div className="min-h-screen flex">
         {/* Fixed Sidebar */}
         <BuyerSidebar logoutUser={logoutUser} />
   
         {/* Right Side */}
         <div className="md:ml-64 flex flex-col min-h-screen w-full">
           {/* Page Content */}
           <main className="flex-1 pt-10 md:pt-1  ">
             {location.pathname === "/dashboard" && <BuyerDash />}
             <Outlet />
           </main>
   
           {/* Footer */}
           <Footer />
         </div>
       </div>
  );
};

export default BuyerDashboard;
