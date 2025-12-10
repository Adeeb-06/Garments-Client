import React, { useContext } from "react";
import { Clock, Cross, User } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { FcCancel } from "react-icons/fc";
import { useNavigate } from "react-router";

export default function AccountStatus() {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-[100vw] bg-primary flex items-center justify-center p-4">
      <div className=" flex justify-center  w-full">
        <div className="bg-white w-[70%] rounded-2xl shadow-xl p-8 border border-base-300 text-center">
          {/* Icon */}

          {userData?.status == "pending" ? (
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
              <Clock className="w-10 h-10 text-yellow-600" />
            </div>
          ) : (
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
              <FcCancel className="w-10 h-10 text-red-600" />
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl font-bold text-secondary mb-3">
            Account Status: {userData?.status.toUpperCase()}
          </h1>

          {/* Message */}

          {userData?.status == "pending" ? (
            <p className="text-gray-600 mb-8 leading-relaxed">
              Your account is currently under review by our administrators. You
              can't access this page!
            </p>
          ) : (
            <p className="text-gray-600 mb-8 leading-relaxed">
              Your account has been rejected by our administrators. You can't
              access this page!
            </p>
          )}

          {/* See More Button */}
          <button
            onClick={() => navigate("/")}
            className="w-full cursor-pointer bg-primary text-secondary py-3 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center justify-center space-x-2"
          >
            <User className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
