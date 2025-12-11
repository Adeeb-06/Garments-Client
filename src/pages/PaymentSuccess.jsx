import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import api from "../api";
import { toast } from "react-toastify";
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParam] = useSearchParams();
  const sessionId = searchParam.get("session_id");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [price , setPrice] = useState(null)

  useEffect(() => {
    if (sessionId) {
      const checkPayment = async () => {
        try {
          const res = await api.patch(`/payment-success?session_id=${sessionId}`);
          console.log(res)
          if (res.status === 200) {
            setPaymentStatus("success");
            setPrice(res.data.amount_total)
            toast.success("Payment successful!");
          } else {
            setPaymentStatus("failed");
            toast.error("Payment failed!");
          }
        } catch (error) {
          setPaymentStatus("failed");
          toast.error("Payment failed!");
          console.error(error);
        }
      };

      checkPayment();
    }
  }, [sessionId]);

  if (!paymentStatus) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading w-10 h-10 loading-spinner text-secondary"></span>
      </div>
    );
  }

  if (paymentStatus === "failed") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-xl">Payment failed. Try again.</p>
      </div>
    );
  }

  // Render success UI
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-secondary mb-3">Payment Successful!</h1>

          {/* Message */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            Thank you for your order! Your payment has been processed successfully.
          </p>

          {/* Order Details */}
          <div className="bg-primary rounded-xl p-6 mb-6 border border-secondary/10">
            <div className="space-y-3 text-left">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Order ID</span>
                <span className="font-semibold text-secondary">#ORD-2024-001</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Order Date</span>
                <span className="font-semibold text-secondary">{ new Date().toLocaleDateString() }</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Total Amount</span>
                <span className="font-semibold text-secondary">${price}</span>
              </div>
            </div>
          </div>

          {/* Info Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              A confirmation email has been sent to your registered email address with order details.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-secondary text-primary py-3 rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg flex items-center justify-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Track Your Order</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <Link to={'/'} className="w-full border-2 border-secondary text-secondary py-3 rounded-lg font-semibold hover:bg-secondary/5 transition-all flex items-center justify-center space-x-2">
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
