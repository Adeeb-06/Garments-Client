import React from 'react'
import Sidebar from '../components/SideBar'
import { Outlet } from 'react-router'

const DashboardLayout = () => {
  return (
    <div className="flex">
      <aside className="w-[20%]">
        <Sidebar />
      </aside>

      <main className="m flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
