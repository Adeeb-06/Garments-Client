import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router";
import { AuthContext } from "../../../context/AuthContext";

import ManagerSidebar from "../../sidebars/ManagerSidebar";


const ManagerDashboard = () => {
  const { userData ,user, logout , loading } = useContext(AuthContext);
  const navigate = useNavigate();
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
       <ManagerSidebar logoutUser={logoutUser}/>
      </aside>

      {/* Dashboard content */}
      <main className="w-[%]">
       <Outlet/>
      </main>
      <Footer/>
    </div>
  );
};

export default ManagerDashboard;
