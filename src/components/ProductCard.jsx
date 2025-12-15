import React from "react";
import { Eye, Package } from "lucide-react";
import { Link } from "react-router";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-base-300 hover:shadow-xl transition-all duration-300 group">
      {/* Product Image */}
      <div className="relative overflow-hidden h-64">
        <img
          src={product.images[0]}
          alt={product.product_name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-xl font-bold text-base-200 mb-2 group-hover:text-opacity-80 transition-colors">
          {product.product_name}
        </h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {product.product_description?.slice(0, 90)}...
        </p>

        {/* Price and Quantity */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-secondary">
              ${product.price}
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-base-200/40 px-3 py-2 rounded-lg">
            <Package className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">
              {product.available_quantity} pcs
            </span>
          </div>
        </div>

        {/* Stock Status Bar */}

        {/* View Details Button */}
        <Link
          to={`/product/${product._id}`}
          className="w-full cursor-pointer bg-primary text-secondary py-3 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center justify-center space-x-2 shadow-md"
        >
          <Eye className="w-5 h-5" />
          <span>View Details</span>
        </Link>
      </div>
    </div>
  );
}
