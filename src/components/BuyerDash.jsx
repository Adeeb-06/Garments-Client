import React, { useContext } from "react";
import { ShoppingBag, Package, TrendingUp, Clock } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";

export default function BuyerDash() {
  const { userData } = useContext(AuthContext);

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen w-[81vw] bg-primary p-8">
      <div className=" mx-auto">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-secondary to-secondary/80 rounded-3xl shadow-xl p-8 md:p-12 mb-8 text-primary relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full -ml-24 -mb-24"></div>

          <div className="relative z-10">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <p className="text-primary/80 text-lg mb-2">Welcome back,</p>
                <h1 className="text-4xl md:text-5xl font-bold mb-3">
                  {userData.name}
                </h1>
                <p className="text-primary/90 text-lg mb-1">{userData.email}</p>
                <span className="inline-flex items-center px-4 py-1.5 bg-primary/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                  {userData.role}
                </span>
              </div>

              <div className="text-right">
                <p className="text-3xl font-bold mb-1">{currentTime}</p>
                <p className="text-primary/80">{currentDate}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-secondary mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/dashboard/orders"
              className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-xl hover:border-secondary hover:bg-secondary/5 transition-all group"
            >
              <div className="bg-secondary/10 p-4 rounded-full mb-3 group-hover:bg-secondary/20 transition-all">
                <ShoppingBag className="w-8 h-8 text-secondary" />
              </div>
              <span className="font-semibold text-secondary">
                View All Orders
              </span>
            </Link>

            <Link
              to="/all-products"
              className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-xl hover:border-secondary hover:bg-secondary/5 transition-all group"
            >
              <div className="bg-secondary/10 p-4 rounded-full mb-3 group-hover:bg-secondary/20 transition-all">
                <Package className="w-8 h-8 text-secondary" />
              </div>
              <span className="font-semibold text-secondary">
                Browse Products
              </span>
            </Link>

           
          </div>
        </div>
      </div>
    </div>
  );
}
