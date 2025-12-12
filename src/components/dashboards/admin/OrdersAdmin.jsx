import { Check, Edit, Edit2Icon, Eye, Search, X } from "lucide-react";
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router";

import { AdminContext } from "../../../context/AdminContext";

const OrdersAdmin = () => {
  const { ordersAdmin, isLoadingOrdersAdmin } = useContext(AdminContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredOrders = ordersAdmin?.filter((order) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      order.product_name.toLowerCase().includes(query) ||
      order.email.toLowerCase().includes(query);

    const matchesStatus = statusFilter === "" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  console.log(ordersAdmin);

  if (isLoadingOrdersAdmin)
    return (
      <div className="flex justify-center items-center  w-full h-screen">
        <span className="loading mx-auto  w-10 h-10 loading-spinner text-secondary"></span>
      </div>
    );

  return (
    <div className="min-h-screen w-[81vw] bg-primary p-8">
      <div className=" mx-auto">
        {/* Header with Search */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-secondary mb-2">
                All Orders
              </h1>
              <p className="text-gray-600">Manage all orders</p>
            </div>

            {/* Search Bar */}
            <div className="flex gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, email or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-base-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                />
              </div>

              {/* Filter Dropdown */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border-2 select-md border-base-300 rounded-xl px-3 py-2"
              >
                <option value="">All Status</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-base-300">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead>
                <tr className="bg-primary text-base-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    USER
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-base-300">
                {filteredOrders?.length > 0 ? (
                  filteredOrders.map((product, index) => (
                    <tr
                      // key={index}
                      className="hover:bg-secondary/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          {product._id}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {product.email}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full text-gray-700 `}
                        >
                          {product.product_name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full text-gray-700 `}
                        >
                          {product.qty}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full text-gray-700 `}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-2 py-4">
                        <div className="flex items-center justify-center gap-1">
                          <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-800 text-white px-2 py-2 rounded-lg transition-all shadow-md hover:shadow-lg font-medium">
                            <Edit className="w-4 h-4" />
                          </button>
                          <Link
                            to={`/dashboard/order-details/${product?._id}`}
                            className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-800 text-white px-2 py-2 rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No Orders found
                    </td>
                  </tr>
               
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersAdmin;
