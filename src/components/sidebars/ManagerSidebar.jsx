import React, { useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Scissors,
  Package,
  UserCheck,
  LogOut,
  TimerIcon,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router";

export default function ManagerSidebar({ logoutUser }) {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Add Products", icon: Package, href: "/dashboard/add-product" },
    { name: "Products", icon: Package, href: "/dashboard/products" },
    { name: "Pending Orders", icon: TimerIcon, href: "/dashboard/pending-orders" },
    { name: "Approved Orders", icon: ShoppingCart, href: "/dashboard/approved-orders" },
    { name: "Profile", icon: UserCheck, href: "/dashboard/profile" },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-secondary z-40 flex items-center px-4">
        <button onClick={() => setOpen(true)}>
          <Menu className="w-6 h-6 text-primary" />
        </button>
        <Link to="/" className="ml-4 text-primary font-semibold">Garments Tracker</Link>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-secondary/80 backdrop-blur
          flex flex-col z-50 transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-primary/20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-secondary text-primary p-2 rounded-lg">
              <Scissors className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-primary font-bold text-lg">Garments Tracker</h1>
              <p className="text-primary/70 text-xs">Manager</p>
            </div>
          </Link>

          {/* Close button (mobile only) */}
          <button onClick={() => setOpen(false)} className="md:hidden">
            <X className="w-5 h-5 text-primary" />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <Link
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg
                      text-base-200 hover:bg-primary hover:text-secondary transition-all"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-primary/20">
          <button
            onClick={logoutUser}
            className="w-full flex items-center space-x-3 px-4 py-3
              bg-base-200/60 text-primary rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
