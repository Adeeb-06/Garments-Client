import React from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Scissors,
  Package,
  Users,
  UserCheck,
  BarChart3,
  Settings,
  LogOut,
  PackageIcon,
  TimerIcon,
} from "lucide-react";
import { Link } from "react-router";

export default function ManagerSidebar({ logoutUser }) {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Add Products", icon: Package, href: "/dashboard/add-product" },
    { name: "Products", icon: Package, href: "/dashboard/products" },
    {name:"Pending Orders", icon: TimerIcon, href: "/dashboard/pending-orders"},
    {name:"Approved Orders", icon: ShoppingCart, href: "/dashboard/approved-orders"},
    { name: 'Profile', icon: UserCheck , href: "/dashboard/profile"},
  ];

  return (
    <div className="w-64 bg-secondary/40 h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-secondary/20">
        <div className="flex items-center space-x-3">
          <div className="bg-secondary text-primary p-2 rounded-lg">
            <Scissors className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-secondary font-bold text-lg">
              Garments Tracker
            </h1>
            <p className="text-secondary/70 text-xs">Manager</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <Link
                  to={item.href}
                  className="flex items-center space-x-3 px-4 py-3 text-base-200 rounded-lg hover:bg-primary hover:text-secondary transition-all"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-secondary/20">
        <button
          onClick={() => logoutUser()}
          className="flex items-center space-x-3 px-4 py-3 text-secondary rounded-lg hover:bg-red-500 hover:text-white transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
