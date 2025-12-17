import { Edit, Eye, Search } from "lucide-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router";
import { AdminContext } from "../../../context/AdminContext";

const OrdersAdmin = () => {
  const { ordersAdmin, isLoadingOrdersAdmin, setPage } =
    useContext(AdminContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  if (isLoadingOrdersAdmin)
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <span className="loading mx-auto w-10 h-10 loading-spinner text-secondary"></span>
      </div>
    );

  // Filter orders
  const filteredOrders = ordersAdmin?.data?.data.filter((order) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      order.product_name.toLowerCase().includes(query) ||
      order.email.toLowerCase().includes(query);
    const matchesStatus = statusFilter === "" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination helpers
  const totalPages = ordersAdmin?.data?.totalPages || 1;
  const currentPage = ordersAdmin?.data?.page || 1;

  const handlePrev = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setPage(currentPage + 1);
  };

  return (
    <div className="min-h-screen md:w-[81vw] w-screen bg-primary p-8">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-secondary mb-2">
              All Orders
            </h1>
            <p className="text-gray-600">Manage all orders</p>
          </div>

          <div className="flex gap-3">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email or product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-base-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              />
            </div>

            {/* Filter */}
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

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-base-300">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-base-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    User
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
              <tbody className="divide-y divide-base-300">
                {filteredOrders?.length > 0 ? (
                  filteredOrders.map((order, index) => (
                    <tr key={order._id} className="hover:bg-secondary/50 transition-colors">
                      <td className="px-6 py-4">{order._id}</td>
                      <td className="px-6 py-4 text-gray-700">{order.email}</td>
                      <td className="px-6 py-4">{order.product_name}</td>
                      <td className="px-6 py-4 text-center">{order.qty}</td>
                      <td className="px-6 py-4 text-center">{order.status}</td>
                      <td className="px-6 py-4 text-center flex justify-center gap-2">
                        <button className="bg-gray-700 text-white px-2 py-2 rounded-lg hover:bg-gray-800 transition">
                          <Edit className="w-4 h-4" />
                        </button>
                        <Link
                          to={`/dashboard/order-details/${order._id}`}
                          className="bg-gray-700 text-white px-2 py-2 rounded-lg hover:bg-gray-800 transition"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No Orders Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end m-6 space-x-2">
            <button
              className="px-4 py-2 bg-secondary text-primary rounded-lg hover:bg-secondary/90 transition-all"
              onClick={handlePrev}
              disabled={currentPage <= 1}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage === i + 1
                    ? "bg-secondary/60 text-white"
                    : "bg-secondary text-primary hover:bg-secondary/90"
                }`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="px-4 py-2 bg-secondary text-primary rounded-lg hover:bg-secondary/90 transition-all"
              onClick={handleNext}
              disabled={currentPage >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersAdmin;
