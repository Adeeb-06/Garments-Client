import { Check, Edit, Eye, Search, X } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router";
import { ManagerContext } from "../../../context/ManagerContext";
import api from "../../../api";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import { BuyerContext } from "../../../context/BuyerContext";

const Orders = () => {
  const { buyerOrders: orders, isLoadingBuyerOrders , refetchBuyerOrders } =
    useContext(BuyerContext);
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");

  console.log(orders);

  const filteredOrders = orders?.filter((order) => {
    const query = searchQuery.toLowerCase();

    if (!query) return true; // return all when empty search

    return order?.product_name?.toLowerCase().includes(query);
  });

  const handlePayment = async (order) => {
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
      if (res.status === 200) {
        window.location.assign(res.data.url);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  const handleDelete = async (id) => {
    const res = await api.delete(`/delete-order/${id}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (res.status === 200) {
      toast.success("Order deleted successfully!");
      refetchBuyerOrders();
    }
  };

  if (isLoadingBuyerOrders) return (
      <div className="flex justify-center items-center  w-full h-screen">
        <span className="loading mx-auto  w-10 h-10 loading-spinner text-secondary"></span>
      </div>
    );

  return (
    <div className="min-h-screen md:w-[81vw] w-screen bg-primary p-8">
      <div className=" mx-auto">
        {/* Header with Search */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-secondary mb-2">
                All Orders
              </h1>
              <p className="text-gray-600">Manage your orders</p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-base-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              />
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
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                    Payment{" "}
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
                        {product.product_name}
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
                          {product.status.toUpperCase()}
                        </span>
                      </td>
                      {product.paymentMethod == "Cash on Delivery" ? (
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full text-gray-700 `}
                          >
                            {product.paymentStatus.toUpperCase()}
                          </span>
                        </td>
                      ) : (
                        <td className="px-6 py-4">
                          {product.paymentStatus == "pending" && product.paymentMethod === "PayFirst" ? (
                            <button
                              onClick={() => handlePayment(product)}
                              className="bg-secondary text-white px-16 py-3 cursor-pointer rounded-xl text-lg font-semibold hover:bg-secondary/70 transition-all shadow-lg"
                            >
                              Pay
                            </button>
                          ) : (
                            <span
                              className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full text-gray-700 `}
                            >
                              {product.paymentStatus.toUpperCase()}
                            </span>
                          )}
                        </td>
                      )}

                      <td className="px-2 py-4">
                        <div className="flex items-center justify-center gap-1">
                          {product?.status === "pending" ? (
                            <button onClick={()=> handleDelete(product._id)} className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-2 rounded-lg transition-all shadow-md hover:shadow-lg font-medium">
                              <X className="w-4 h-4" />
                            </button>
                          ) : null}
                          <Link
                            to={`/dashboard/track-order/${product._id}`}
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

export default Orders;
