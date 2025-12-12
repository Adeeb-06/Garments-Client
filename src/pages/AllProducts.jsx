import React, { useContext, useState } from "react";
import { BuyerContext } from "../context/BuyerContext";
import ProductCard from "../components/ProductCard";
import { Search } from "lucide-react";

const AllProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { allProducts, isLoadingAllProducts } = useContext(BuyerContext);

  if (isLoadingAllProducts)
    return (
      <div className="flex justify-center items-center  w-full h-screen">
        <span className="loading mx-auto  w-10 h-10 loading-spinner text-secondary"></span>
      </div>
    );

  const filteredProducts = allProducts?.filter(
    (product) =>
      product?.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product?.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-primary">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-secondary mb-2">
                All Products
              </h1>
              <p className="text-gray-600">Browse our complete collection</p>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold text-secondary">
                {filteredProducts?.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-secondary">
                {allProducts?.length}
              </span>{" "}
              products
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-sm text-secondary hover:underline font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {isLoadingAllProducts ? (
          <div className="flex justify-center items-center  w-full h-64">
            <span className="loading mx-auto w-10 h-10 loading-spinner text-secondary"></span>
          </div>
        ) : filteredProducts?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              No products found
            </h3>
            {searchQuery && (
              <p className="text-gray-600 mb-4">
                We couldn't find any products matching "{searchQuery}"
              </p>
            )}
            <button
              onClick={() => setSearchQuery("")}
              className="px-6 py-2 bg-secondary text-primary rounded-lg font-semibold hover:opacity-90 transition-all"
            >
              Clear Search
            </button>
          </div>
        ) : (
            <div className="flex justify-center items-center  w-full h-screen">
        <span className="loading mx-auto  w-10 h-10 loading-spinner text-secondary"></span>
      </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
