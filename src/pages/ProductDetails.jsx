import React, { useContext, useEffect, useState } from "react";
import {
  ShoppingCart,
  Package,
  CreditCard,
  DollarSign,
  Tag,
  Minus,
  Plus,
  ArrowLeft,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { ManagerContext } from "../context/ManagerContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  console.log(id);
  const { product, setId, isLoading } = useContext(ManagerContext);
  const [quantity, setQuantity] = useState(50);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setId(id);
  }, [id]);

  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="flex justify-center items-center  w-full h-screen">
        <span className="loading mx-auto  w-10 h-10 loading-spinner text-secondary"></span>
      </div>
    );

  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-base-300">
              <img
                src={product?.images[selectedImage]}
                alt={product?.product_name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {product?.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-white rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-primary shadow-md"
                      : "border-base-300 hover:border-primary"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product?.product_name} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Product Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-base-300">
              <div className="flex items-center space-x-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                  <Tag className="w-4 h-4 mr-1" />
                  {product?.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-secondary mb-4">
                {product?.product_name}
              </h1>

              <p className="text-gray-700 leading-relaxed mb-6">
                {product?.product_description}
              </p>

              {/* Price */}
              <div className="bg-primary rounded-xl p-4 mb-4">
                <div className="flex items-baseline space-x-2">
                  <span className="font-bold  text-3xl">Price:</span>
                  <span className="text-4xl font-bold text-secondary">
                    ${product?.price}
                  </span>
                </div>
              </div>

              {/* Stock Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Package className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-600 font-medium">
                      Available
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    {product?.available_quantity} pcs
                  </p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <ShoppingCart className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm text-gray-600 font-medium">
                      Min. Order
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {product?.min_order} pcs
                  </p>
                </div>
              </div>
            </div>
            {/* Payment Options */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-base-300">
              <h3 className="text-lg font-bold text-base-200 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Payment Option
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 bg-primary px-4 py-3 rounded-lg border border-base-300">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="text-md font-medium text-gray-700">
                    {product?.payment}
                  </span>
                </div>
              </div>
            </div>

            {product?.available_quantity < 0 || product?.min_order > product?.available_quantity ? (
              <Link
                to={`/order/${product?._id}`}
                className="w-full bg-secondary text-primary py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg flex items-center justify-center space-x-3"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>Not in Stock</span>
              </Link>
            ): (
              <Link
                to={`/order/${product?._id}`}
                className="w-full bg-secondary text-primary py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg flex items-center justify-center space-x-3"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>Place Order</span>
              </Link>
            )  }
            {/* Order Button */}

            {/* Additional Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Minimum order quantity is{" "}
                {product?.min_order} pieces. Orders will be processed within
                24-48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
