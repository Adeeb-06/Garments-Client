import React, { useContext, useEffect, useState } from 'react';
import { User, Mail, Phone, MapPin, Package, DollarSign, FileText, AlertCircle } from 'lucide-react';
import { ManagerContext } from '../context/ManagerContext';
import { useParams } from 'react-router';
import { AuthContext } from '../context/AuthContext';

export default function OrderPage() {
    const {userData} = useContext(AuthContext);
const {setId, product, isLoading} = useContext(ManagerContext);
const {id} = useParams()

useEffect(()=>{
    setId(id)
},[id])

  return (
    <div className="min-h-screen bg-primary p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary mb-2">Place Your Order</h1>
          <p className="text-gray-600">Fill in the details to complete your booking</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-base-300">
          <div className="space-y-6">
            {/* Read-only Fields Section */}
            <div className="bg-primary rounded-xl p-6 space-y-4 border border-base-300">
              <h3 className="font-semibold text-base-200 mb-4">Order Information</h3>
              
              {/* Email (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-base-200 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={userData.email}
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
                    value={product.product_name}
                    readOnly
                    className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-base-300 rounded-lg text-gray-600 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Price Info (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-base-200 mb-2">
                  Price per Unit
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={`$${product.price}`}
                    readOnly
                    className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-base-300 rounded-lg text-gray-600 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-base-200">Personal Information</h3>
              
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-base-200 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                    //   value={formData.firstName}
                    //   onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="John"
                      className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-base-200 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                    //   value={formData.lastName}
                    //   onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Doe"
                      className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    />
                  </div>
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
                    // value={formData.contactNumber}
                    // onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>
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
       
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 outline-none transition-all `}
                  />
                </div>
              
              </div>

              {/* Order Price (Calculated & Read-only) */}
              <div>
                <label className="block text-sm font-medium text-base-200 mb-2">
                  Total Order Price
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
                  <input
                    type="text"
                    // value={`$${orderPrice}`}
                    readOnly
                    className="w-full pl-10 pr-4 py-3 bg-primary/10 border-2 border-primary rounded-lg text-primary font-bold text-xl cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-base-200">Delivery Information</h3>
              
              {/* Delivery Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    // value={formData.deliveryAddress}
                    // onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                    placeholder="Enter your complete delivery address..."
                    rows="3"
                    className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes / Instructions
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    // value={formData.additionalNotes}
                    // onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
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
                  <span className="font-semibold">{product.product_name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span className="font-semibold"> pieces</span>
                </div>
                <div className="flex justify-between">
                  <span>Unit Price:</span>
                  <span className="font-semibold">${product.price}</span>
                </div>
                <div className="border-t border-secondary/30 pt-2 mt-2">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total Amount:</span>
                    <span className="font-bold">${}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
            //   disabled={!!quantityError}
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
      </div>
    </div>
  );
}