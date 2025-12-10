import React, { useContext } from 'react'
import ProductCard from './ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ManagerContext } from '../context/ManagerContext';

export default function ProductsSection() {
 const {products, isLoadingProducts, isErrorProducts, refetchProducts} = useContext(ManagerContext);

 console.log(products)

  return (
    <section className="bg-primary py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-secondary font-medium text-sm">Featured Collection</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-4">
            Our Premium Products
          </h2>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
            Explore our carefully curated selection of high-quality garments designed to elevate your wardrobe
          </p>

          <button className="inline-flex items-center space-x-2 text-secondary font-semibold hover:underline">
            <span>View All Products</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}