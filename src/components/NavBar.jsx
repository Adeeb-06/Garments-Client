import React, { useContext, useState } from "react";
import {
  Menu,
  X,
  Package,
  ClipboardList,
  Scissors,
  Users,
  BarChart3,
} from "lucide-react";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { userData, loading, logout } = useContext(AuthContext);

  const navLinks = [
    { name: "All Products", icon: Package, href: "/all-products" },
  
  ];

  const logoutUser = async() => {
    const res = await logout();
    if (res) {
      setProfileOpen(false);
    }
  };

  return (
    <nav className="bg-primary text-secondary shadow-lg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to={'/'} className="flex items-center space-x-3">
                      
                      <div className="bg-secondary text-primary p-2 rounded-lg">
                        <Scissors className="w-6 h-6" />
                      </div>
                      <div>
                        <h1 className="text-secondary font-bold text-lg">Garments Tracker</h1>
                        <p className="text-secondary/70 text-xs">Buyer</p>
                      </div>
                      </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-secondary hover:bg-secondary hover:text-primary transition-all duration-200"
              >
                <link.icon className="w-6 h-6" />
                <span className="font-medium text-xl">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Profile + Mobile Button */}
          <div className="flex items-center space-x-3">
            {/* Profile Button */}
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="hidden md:flex items-center px-4 py-2 rounded-lg bg-secondary text-primary hover:bg-secondary/90 transition-all duration-200"
            >
              <MdAccountCircle className="w-7 h-7" />
              <span className="ml-2">
                {loading ? "Loading..." : userData?.name || <Link to="/auth/login">Login</Link>}
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-secondary hover:bg-secondary hover:text-primary transition-all duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Profile Dropdown */}
      {userData && profileOpen && (
  <div className="absolute right-[18%] top-14 bg-white text-black rounded-xl shadow-lg p-4 w-48 backdrop-blur-xl z-50 animate-fadeIn">
    <div className="flex flex-col space-y-3">
      <Link
        to="/dashboard"
        className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
      >
        Dashboard
      </Link>

      <button
        onClick={() => logoutUser()}
        className="px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  </div>
)}


        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-secondary/20">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-secondary hover:bg-secondary hover:text-primary transition-all duration-200"
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.name}</span>
                </a>
              ))}

              {/* Mobile Profile */}
              {userData ? (
                <button
                  onClick={() => logoutUser()}
                  className="flex items-center space-x-2 px-4 py-3 rounded-lg bg-red-500 text-white"
                >
                  <MdAccountCircle className="w-7 h-7" />
                  <span>Logout</span>
                </button>
              ) : (
                <Link
                  to="/auth/login"
                  className="flex items-center space-x-2 px-4 py-3 rounded-lg bg-secondary text-primary"
                >
                  <MdAccountCircle className="w-7 h-7" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
