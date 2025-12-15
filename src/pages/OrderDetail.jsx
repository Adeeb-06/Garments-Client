import React, { useContext, useEffect } from "react";
import {
  Package,
  MapPin,
  CreditCard,
  CheckCircle,
  Clock,
  Truck,
  ArrowLeft,
  TimerIcon,
} from "lucide-react";
import { MdPending } from "react-icons/md";
import { BuyerContext } from "../context/BuyerContext";
import { Link, useParams } from "react-router";
import { ManagerContext } from "../context/ManagerContext";

export default function OrderDetails() {
  const { order, setOrderID, isLoadingOrder } = useContext(BuyerContext);
  const { product, setId } = useContext(ManagerContext);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    setOrderID(id);
  }, [id, setOrderID]);

  useEffect(() => {
    setId(order?.product_id);
  }, [order?.product_id]);
  if (isLoadingOrder)
    return (
      <div className="flex justify-center items-center  w-full h-screen">
        <span className="loading mx-auto  w-10 h-10 loading-spinner text-secondary"></span>
      </div>
    );
  console.log(order);

 

  const statuses = [
    "Cutting Completed",
    "Sewing Started",
    "Finishing",
    "QC Checked",
    "Packed",
    "Out for Delivery",
    "Shipped",
  ];

  const orderDataStatus = (status) => {
    switch (status) {
      case "pending":
        return (
          <div className="w- max-w-sm bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-lg rounded-2xl p-6 borderData-2 borderData-yellow-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-yellow-500 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="text-center mb-4">
              <span className="text-2xl font-bold text-yellow-800 block mb-1">
                Order Pending
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500 text-white">
                Pending
              </span>
            </div>

            <div className="pt-2 border-t border-yellow-200">
              <p className="text-center text-sm text-gray-700">
                Your order is awaiting review and approval.
              </p>
            </div>
          </div>
        );
      case "approved":
        return (
          <div className="w-full max-w-sm bg-gradient-to-br from-green-50 to-green-100 shadow-lg rounded-2xl p-6 borderData-2 borderData-green-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-500 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="text-center mb-4">
              <span className="text-2xl font-bold text-green-800 block mb-1">
                Order is Approved
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
                Approved
              </span>
            </div>

            <div className="pt-4 borderData-t borderData-green-200">
              <p className="text-center text-sm text-gray-700">
                Your order has been approved and is ready for processing.
              </p>
            </div>
          </div>
        );
      case "rejected":
        return (
          <div className="w-full max-w-sm bg-gradient-to-br from-red-50 to-red-100 shadow-lg rounded-2xl p-6 borderData-2 borderData-red-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-500 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>

            <div className="text-center mb-4">
              <span className="text-2xl font-bold text-red-800 block mb-1">
                Order Rejected
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">
                Rejected
              </span>
            </div>

            <div className="pt-4 borderData-t borderData-red-200">
              <p className="text-center text-sm text-gray-700">
                Your orderData has been rejected. Please contact support for
                details.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen w-[81vw] bg-primary p-8">
      <div className=" mx-auto">
       
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 borderData borderData-gray-200 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-secondary mb-2">
                Order Details
              </h1>
              <p className="text-gray-600">
                Order ID:{" "}
                <span className="font-semibold text-secondary">
                  {order?._id ? order._id.toString() : "Loading..."}
                </span>
              </p>
              <p className="text-gray-600 text-sm">
                Placed on {new Date(order?.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-3">
              <div
                className={`px-4 py-2 rounded-lg font-semibold ${
                  order?.paymentStatus === "paid"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order?.paymentStatus}
              </div>
              <div className="px-4 py-2 rounded-lg font-semibold bg-blue-100 text-blue-800">
                {order?.status}
              </div>
            </div>
          </div>
        </div>

        {/* orderData Status Timeline */}
        <div className="bg-white rounded-2xl shadow-lg p-6 borderData borderData-gray-200 mb-6">
          <h2 className="text-xl font-bold text-secondary mb-6">
            Order Status
          </h2>

          <div className="flex flex-col gap-5">
            {!order?.tracking ? (
              <div>{orderDataStatus(order?.status)}</div>
            ) : null}

            {order?.tracking ? (
              <div className="flex gap-3 ">
                {statuses.map((status, idx) => {
                  const trackingItem = order?.tracking?.find(
                    (t) => t.status === status
                  );
                  const isCompleted = !!trackingItem;
                  return (
                    <div
                      className={`m rounded-2xl p-4 shadow-lg border-2 ${
                        isCompleted
                          ? "bg-green-50 border-green-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-center mb-4">
                        {isCompleted ? (
                          <div className="bg-green-500 p-3 rounded-full">
                            <svg
                              className="w-6 h-6 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        ) : (
                          <div className="bg-secondary p-3 rounded-full">
                            <TimerIcon className="text-primary w-6 h-6" />
                          </div>
                        )}
                      </div>

                      <div className="text-center mb-4">
                        <span className="text-xl font-bold text-green-800 block mb-1">
                          {status}
                        </span>
                      </div>

                      <div className="space-y-2 pt- borderData-t borderData-green-200">
                        <div className="flex items-center justify-center text-gray-600 text-sm">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {isCompleted ? new Date(order?.tracking?.[idx]?.createdAt).toLocaleString() : "Pending"}
                        </div>

                        <div className="flex items-center justify-center text-gray-700">
                          <svg
                            className="w-4 h-4 mr-2 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="font-semibold text-sm">
                            {isCompleted? order?.tracking?.[idx]?.location : "Pending"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 borderData borderData-gray-200">
            <h2 className="text-xl font-bold text-secondary mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Customer Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold text-secondary">
                  {order?.firstName} {order?.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-secondary">{order?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-secondary">
                  {order?.contactNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Delivery Address</p>
                <p className="font-semibold text-secondary">
                  {order?.deliveryAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 borderData borderData-gray-200">
            <h2 className="text-xl font-bold text-secondary mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Payment Information
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payment Status</span>
                <span
                  className={`px-3 py-1 rounded-full font-semibold text-sm ${
                    order?.paymentStatus === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order?.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-semibold text-secondary">
                  {order?.paymentMethod}
                </span>
              </div>
              <div className="borderData-t borderData-gray-200 pt-3 mt-3">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-bold text-secondary">Total Amount</span>
                  <span className="font-bold text-secondary">
                    ${order?.orderPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* orderData Items */}
        <div className="bg-white rounded-2xl shadow-lg p-6 borderData borderData-gray-200 mt-6">
          <h2 className="text-xl font-bold text-secondary mb-4 flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Order Items
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary borderData-b-2 borderData-secondary/10">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-secondary">
                    Product
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-secondary">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-secondary">
                    Unit Price
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-secondary">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="borderData-b borderData-gray-100">
                  <td className="px-4 py-4 font-medium text-secondary">
                    {order?.product_name}
                  </td>
                  <td className="px-4 py-4 text-center text-gray-600">
                    {order?.qty} pcs
                  </td>
                  <td className="px-4 py-4 text-right text-gray-600">
                    ${product?.price}
                  </td>
                  <td className="px-4 py-4 text-right font-semibold text-secondary">
                    ${order?.orderPrice}
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-primary">
                <tr>
                  <td
                    colSpan="3"
                    className="px-4 py-4 text-right font-bold text-secondary"
                  >
                    Grand Total:
                  </td>
                  <td className="px-4 py-4 text-right font-bold text-secondary text-lg">
                    ${order?.orderPrice}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
