import React, { useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../../context/AuthContext";

import AdminSidebar from "../../sidebars/AdminSidebar";
import Dashboard from "../../Dashboard";


const AdminDashboard = () => {
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
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-[]">
       <AdminSidebar logoutUser={logoutUser}/>
      </aside>

      {/* Dashboard content */}
      <main className=" ">
       <Outlet/>
{location.pathname === "/dashboard" ? <Dashboard/> : null}
       
      </main>
    </div>
  );
};

export default AdminDashboard;
