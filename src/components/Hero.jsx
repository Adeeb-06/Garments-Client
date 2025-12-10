import React from 'react';
import { ShoppingBag, TrendingUp, Award, Package } from 'lucide-react';

export default function Hero() {
  return (
    <div className="bg-primary min-h-[60vh] flex items-center py-16">
      <div className="max-w-7xl mx-auto px-8 w-full">
        {/* Main Content - Horizontal Layout */}
        <div className="text-center mb-12">
          <div className="inline-block bg-secondary/10 px-4 py-2 rounded-full mb-6">
            <span className="text-secondary font-medium text-sm">Premium Quality Since 2020</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-secondary leading-tight mb-6">
            Elevate Your Style with
            <span className="block mt-2">Quality Garments</span>
          </h1>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Discover our curated collection of premium clothing designed for comfort, style, and durability.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <button className="bg-secondary text-primary px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Browse Collection</span>
            </button>
            <button className="border-2 border-secondary text-secondary px-8 py-4 rounded-lg font-semibold hover:bg-secondary/5 transition-all">
              Learn More
            </button>
          </div>
        </div>

        {/* Stats Cards - Horizontal */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-secondary/10 hover:shadow-xl transition-all">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-secondary mb-1">500+</p>
            <p className="text-gray-600 text-sm">Quality Products</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-secondary/10 hover:shadow-xl transition-all">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-secondary mb-1">156+</p>
            <p className="text-gray-600 text-sm">Daily Orders</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-secondary/10 hover:shadow-xl transition-all">
            <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-secondary mb-1">4.9★</p>
            <p className="text-gray-600 text-sm">Customer Rating</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-secondary/10 hover:shadow-xl transition-all">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <ShoppingBag className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-secondary mb-1">1000+</p>
            <p className="text-gray-600 text-sm">Happy Customers</p>
          </div>
        </div>
      </div>
    </div>
  );
}