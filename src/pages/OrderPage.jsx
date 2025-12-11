import React, { useContext, useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  DollarSign,
  FileText,
  AlertCircle,
} from "lucide-react";
import { ManagerContext } from "../context/ManagerContext";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../api";

export default function OrderPage() {
  const { userData , user } = useContext(AuthContext);
  const { setId, product, isLoading } = useContext(ManagerContext);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setId(id);
  }, [id]);
  const [qty, setQty] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    console.log(data)
    const finalData = {
      ...data,
      product_id: product?._id,
      paymentMethod: product?.payment,
    }
    try {
      const res = await api.post(`/order/${product?._id}`, finalData, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`
        }
      })
      if(res.status === 201){
        toast.success("Order placed successfully!")
      }
      console.log(res)
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const orderPrice = qty * (product?.price || 0);

  if (isLoading || !product || !userData) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <span className="loading mx-auto w-10 h-10 loading-spinner text-secondary"></span>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-primary p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary mb-2">
            Place Your Order
          </h1>
          <p className="text-gray-600">
            Fill in the details to complete your booking
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-base-300">
            <div className="space-y-6">
              {/* Read-only Fields Section */}
              <div className="bg-primary rounded-xl p-6 space-y-4 border border-base-300">
                <h3 className="font-semibold text-base-200 mb-4">
                  Order Information
                </h3>

                {/* Email (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-base-200 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={userData?.email}
                      {...register("email")}
                      readOnly
                      className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-base-300 rounded-lg text-gray-600 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Product Title (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-base-200 mb-2">
                    Product Title
                  </label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      {...register("product_name", {
                        value: product?.product_name,
                      })}
                      readOnly
                      className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-base-300 rounded-lg text-gray-600 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Price Info (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-base-200 mb-2">
                    Payment Method
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={product?.payment}
                      {...register("payment")}
                      readOnly
                      className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-base-300 rounded-lg text-gray-600 cursor-not-allowed"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-base-200 mb-2">
                    Price per Unit
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={`$${product?.price}`}
                      readOnly
                      className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-base-300 rounded-lg text-gray-600 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-base-200">
                  Personal Information
                </h3>

                {/* First Name & Last Name */}
                <div className="">
                  <div>
                    <label className="block text-sm font-medium text-base-200 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        {...register("name", {
                          required: {
                            value: true,
                            message: "Name is required",
                          },
                        })}
                        placeholder="John"
                        className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-sm font-medium text-base-200 mb-2">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      {...register("contactNumber", {
                        required: {
                          value: true,
                          message: "Contact number is required",
                        },
                        pattern: {
                          value: /^[0-9]{11}$/,
                          message: "Enter a valid 11-digit number",
                        },
                      })}
                      placeholder="+1 (555) 123-4567"
                      className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    />
                  </div>
                  {errors.contactNumber && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.contactNumber.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-base-200">Order Details</h3>

                {/* Order Quantity */}
                <div>
                  <label className="block text-sm font-medium text-base-200 mb-2">
                    Order Quantity <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      {...register("qty", {
                        required: "Quantity is required",
                        min: product?.min_order
                          ? {
                              value: Number(product.min_order),
                              message: `Order quantity must be at least ${product.min_order}`,
                            }
                          : undefined,
                      })}
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 outline-none transition-all"
                    />
                  </div>
                  {errors.qty && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.qty.message}
                    </p>
                  )}
                </div>

                {/* Order Price (Calculated & Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-base-200 mb-2">
                    Total Order Price
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-200 w-5 h-5" />
                    <input
                      type="text"
                      value={orderPrice}
                      {...register("orderPrice")}
                      readOnly
                      className="w-full pl-10 pr-4 py-3 bg-primary/10 border-2 border-primary rounded-lg text-base-200 font-bold text-xl cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-base-200">
                  Delivery Information
                </h3>
                {/* Delivery Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <textarea
                      {...register("deliveryAddress", {
                        required: {
                          value: true,
                          message: "Delivery address is required",
                        },
                      })}
                      placeholder="Enter your complete delivery address..."
                      rows="3"
                      className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                  {errors.deliveryAddress && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.deliveryAddress.message}
                    </p>
                  )}
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes / Instructions
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <textarea
                      {...register("additionalNotes")}
                      placeholder="Any special instructions or requirements..."
                      rows="4"
                      className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Summary Box */}
              <div className="bg-primary text-secondary rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Product:</span>
                    <span className="font-semibold">
                      {product?.product_name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span className="font-semibold">{qty} pieces</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unit Price:</span>
                    <span className="font-semibold">${product?.price}</span>
                  </div>
                  <div className="border-t border-secondary/30 pt-2 mt-2">
                    <div className="flex justify-between text-lg">
                      <span className="font-bold">Total Amount:</span>
                      <span className="font-bold">${orderPrice}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary text-secondary py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Booking
              </button>

              {/* Terms Notice */}
              <p className="text-xs text-gray-600 text-center">
                By placing this order, you agree to our terms and conditions.
                Order confirmation will be sent to your email address.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
