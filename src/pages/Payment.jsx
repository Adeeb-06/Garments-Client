import React, { useContext, useEffect } from "react";
import api from "../api";
import { BuyerContext } from "../context/BuyerContext";
import { toast } from "react-toastify";
import { useParams } from "react-router";

const Payment = () => {
  const { order,setOrderID } = useContext(BuyerContext);
  const {orderId} = useParams()
  useEffect(() => {
    setOrderID(orderId)
  }, [orderId])

  console.log(order)

  const handlePayment = async () => {
    try {
      const paymentInfo = {
        product_name: order.product_name,
        product_id: order.product_id,
        order_id: order._id,
        quantity: order.qty,
        price: order.orderPrice,
        email: order.email,
      };
      const res = await api.post(`/stripe-payment`, paymentInfo);
      if(res.status === 200){
        window.location.assign(res.data.url);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button onClick={handlePayment} className="bg-secondary text-white px-16 py-3 cursor-pointer rounded-xl text-lg font-semibold hover:bg-secondary/70 transition-all shadow-lg">
        Pay
      </button>
    </div>
  );
};

export default Payment;
