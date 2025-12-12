import React from "react";
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

export default function OrderDetailsPage() {

  const order = {
    orderId: "#ORD-2024-001",
    orderDate: "December 11, 2024",
    totalAmount: 1249.5,
    status: "pending",
    paymentStatus: "Paid",
    orderStatus: "In Production",
    customerName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Apt 4B, New York, NY 10001, United States",
    items: [
      {
        name: "Premium Cotton T-Shirt",
        quantity: 50,
        price: 24.99,
        total: 1249.5,
      },
    ],
  };

const statuses = [
  "Cutting Completed",
  "Sewing Started",
  "Finishing",
  "QC Checked",
  "Packed",
  "Shipped",
  "Out for Delivery"
];


const orderStatus = (status) => {
    switch (status) {
      case "pending":
        return (
            <div className="w- max-w-sm bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-lg rounded-2xl p-6 border-2 border-yellow-200 hover:shadow-xl transition-all duration-300">
  <div className="flex items-center justify-center mb-4">
    <div className="bg-yellow-500 p-3 rounded-full">
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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

  <div className="pt-4 border-t border-yellow-200">
    <p className="text-center text-sm text-gray-700">
      Your order is awaiting review and approval.
    </p>
  </div>
</div>

        )
        case "approve": 
        return (
            <div className="w-full max-w-sm bg-gradient-to-br from-green-50 to-green-100 shadow-lg rounded-2xl p-6 border-2 border-green-200 hover:shadow-xl transition-all duration-300">
  <div className="flex items-center justify-center mb-4">
    <div className="bg-green-500 p-3 rounded-full">
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  </div>
  
  <div className="text-center mb-4">
    <span className="text-2xl font-bold text-green-800 block mb-1">
      Order Approved
    </span>
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
      Approved
    </span>
  </div>

  <div className="pt-4 border-t border-green-200">
    <p className="text-center text-sm text-gray-700">
      Your order has been approved and is ready for processing.
    </p>
  </div>
</div>
        )
        case "reject":
            return (
                <div className="w-full max-w-sm bg-gradient-to-br from-red-50 to-red-100 shadow-lg rounded-2xl p-6 border-2 border-red-200 hover:shadow-xl transition-all duration-300">
  <div className="flex items-center justify-center mb-4">
    <div className="bg-red-500 p-3 rounded-full">
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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

  <div className="pt-4 border-t border-red-200">
    <p className="text-center text-sm text-gray-700">
      Your order has been rejected. Please contact support for details.
    </p>
  </div>
</div>
            )
}}


  return (
    <div className="min-h-screen w-[81vw] bg-primary p-8">
      <div className=" mx-auto">
        {/* Back Button */}
        <button className="flex items-center space-x-2 text-secondary hover:opacity-80 transition-colors mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Orders</span>
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-secondary mb-2">
                Order Details
              </h1>
              <p className="text-gray-600">
                Order ID:{" "}
                <span className="font-semibold text-secondary">
                  {order.orderId}
                </span>
              </p>
              <p className="text-gray-600 text-sm">
                Placed on {order.orderDate}
              </p>
            </div>
            <div className="flex gap-3">
              <div
                className={`px-4 py-2 rounded-lg font-semibold ${
                  order.paymentStatus === "Paid"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order.paymentStatus}
              </div>
              <div className="px-4 py-2 rounded-lg font-semibold bg-blue-100 text-blue-800">
                {order.orderStatus}
              </div>
            </div>
          </div>
        </div>

        {/* Order Status Timeline */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-6">
          <h2 className="text-xl font-bold text-secondary mb-6">
            Order Status
          </h2>

          <div className="flex flex-col gap-5">

          <div>
            {orderStatus(order.status)}
          </div>


   
          <div className="flex gap-2 items-center justify-between">
            <div className=" max-w-sm bg-gradient-to-br from-green-50 to-green-100 shadow-lg rounded-2xl p-6 border-2 border-green-200 hover:shadow-xl transition-all duration-300">
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
                  In Production
                </span>
                
              </div>

              <div className="space-y-2 pt-4 border-t border-green-200">
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
                  {new Date().toLocaleString()}
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
                    Gazipur Sewing Line 1
                  </span>
                </div>
              </div>
            </div>
            <div className=" max-w-sm  shadow-lg rounded-2xl p-6 border-2 border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-secondary p-3 rounded-full">
                <TimerIcon className="text-primary w-6 h-6" />
                </div>
              </div>

              <div className="text-center mb-4">
                <span className="text-2xl font-bold text-green-800 block mb-1">
                  In Production
                </span>
               
              </div>

              <div className="space-y-2 pt-4 border-t border-green-200">
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
                  {new Date().toLocaleString()}
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
                    Gazipur Sewing Line 1
                  </span>
                </div>
              </div>
            </div>
            
          </div>
          </div>
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-secondary mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Customer Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold text-secondary">
                  {order.customerName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-secondary">{order.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-secondary">{order.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Delivery Address</p>
                <p className="font-semibold text-secondary">{order.address}</p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-secondary mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Payment Information
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payment Status</span>
                <span
                  className={`px-3 py-1 rounded-full font-semibold text-sm ${
                    order.paymentStatus === "Paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-semibold text-secondary">
                  Credit Card
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-bold text-secondary">Total Amount</span>
                  <span className="font-bold text-secondary">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mt-6">
          <h2 className="text-xl font-bold text-secondary mb-4 flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Order Items
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary border-b-2 border-secondary/10">
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
                {order.items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="px-4 py-4 font-medium text-secondary">
                      {item.name}
                    </td>
                    <td className="px-4 py-4 text-center text-gray-600">
                      {item.quantity} pcs
                    </td>
                    <td className="px-4 py-4 text-right text-gray-600">
                      ${item.price}
                    </td>
                    <td className="px-4 py-4 text-right font-semibold text-secondary">
                      ${item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
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
                    ${order.totalAmount.toFixed(2)}
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
