import React, { useContext, useState } from "react";
import { Search, Edit, X } from "lucide-react";
import { AuthContext } from "../../../context/AuthContext";
import { AdminContext } from "../../../context/AdminContext";
import { useForm } from "react-hook-form";
import { TbBatteryCharging } from "react-icons/tb";
import api from "../../../api";
import UnauthorizedPage from "../../../pages/UnauthorizedPage";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import DeleteModal from "../../DeleteModal";

export default function ProductManagement() {
  const { userData, user, isLoadingUser } = useContext(AuthContext);
  const { users } = useContext(AdminContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const fetchProducts = async () => {
    const res = await api.get("/products-management", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.data;
  };
  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
    enabled: !!user,
  });

  console.log(products);
  console.log(error);

  const handleClick = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };
  if (isLoadingUser) return <p> Loading...</p>;

  const filteredProducts = products
    ?.filter((product) => product)
    .filter((product) =>
      product.product_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  console.log(filteredProducts);

  return (
    <div className="min-h-screen md:w-[80vw] w- bg-primary p-8">
      <div className=" mx-auto">
        {/* Header with Search */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-base-200 mb-2">
                Product Management
              </h1>
              <p className="text-gray-600">
                Manage user registrations and status
              </p>
            </div>

            {/* Search Bar */}
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
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-base-300">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead>
                <tr className="bg-primary text-secondary">
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                    Payment Mode
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-base-300">
                {filteredProducts?.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <tr
                      key={index}
                      className="hover:bg-primary transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border border-base-300">
                            <img
                              src={product.images?.[0] || "/placeholder.png"} // fallback if no image
                              alt={product.product_name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {product.product_name}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full text-gray-700 `}
                        >
                          {product.price}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full text-gray-700 `}
                        >
                          {product.payment}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {/* Update Link */}
                          <Link
                            to={`/dashboard/update-product/${product._id}`}
                            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Update</span>
                          </Link>

                          {/* Delete Link */}
                          <button
                            onClick={() => handleClick(product)}
                            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
                          >
                            <X className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
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
                      No users found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table Footer Info */}
        <div className="mt-4 text-sm text-gray-600">
          <p>
            Showing {filteredProducts?.length} of {products?.length} users
          </p>
        </div>
      </div>

      {isOpen && (
        <DeleteModal
          refetch={refetch}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          product={selectedProduct}
        />
      )}
    </div>
  );
}
