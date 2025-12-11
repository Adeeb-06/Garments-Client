import React from "react";
import { XCircle, Home, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 text-center">
          {/* Cancel Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6 animate-pulse">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-secondary mb-3">
            Payment Canceled
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            Your payment was not completed. You can try again or return to home.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate("/")}
              className="w-full border-2 border-secondary text-secondary py-3 rounded-lg font-semibold hover:bg-secondary/5 transition-all flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </button>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
