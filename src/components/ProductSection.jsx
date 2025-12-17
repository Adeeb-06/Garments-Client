import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import { ArrowRight, Sparkles } from "lucide-react";
import { BuyerContext } from "../context/BuyerContext";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ProductsSection() {
  const { productsHome, isLoadingProducts } = useContext(BuyerContext);

  if (isLoadingProducts)
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <span className="loading mx-auto w-10 h-10 loading-spinner text-secondary"></span>
      </div>
    );

  return (
    <motion.section
      className="bg-primary py-16 px-8"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div className="text-center mb-12" variants={container}>
          <motion.div
            variants={item}
            className="inline-flex items-center space-x-2 bg-secondary/10 px-4 py-2 rounded-full mb-4"
          >
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-secondary font-medium text-sm">
              Featured Collection
            </span>
          </motion.div>

          <motion.h2
            variants={item}
            className="text-4xl lg:text-5xl font-bold text-secondary mb-4"
          >
            Our Premium Products
          </motion.h2>

          <motion.p
            variants={item}
            className="text-gray-600 text-lg max-w-2xl mx-auto mb-6"
          >
            Explore our carefully curated selection of high-quality garments
            designed to elevate your wardrobe
          </motion.p>

          <motion.button
            variants={item}
            whileHover={{ x: 5 }}
            className="inline-flex items-center space-x-2 text-secondary font-semibold"
          >
            <span>View All Products</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
        >
          {productsHome?.map((product, index) => (
            <motion.div key={index} variants={item}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
