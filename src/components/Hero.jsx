import React from "react";
import { ShoppingBag, TrendingUp, Award, Package } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <motion.div
      className="bg-primary min-h-[60vh] flex items-center py-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-8 w-full">
        {/* Main Content */}
        <motion.div className="text-center mb-12" variants={containerVariants}>
          <motion.div
            variants={itemVariants}
            className="inline-block bg-secondary/10 px-4 py-2 rounded-full mb-6"
          >
            <span className="text-secondary font-medium text-sm">
              Premium Quality Since 2020
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl lg:text-6xl font-bold text-secondary leading-tight mb-6"
          >
            Elevate Your Style with
            <span className="block mt-2">Quality Garments</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Discover our curated collection of premium clothing designed for
            comfort, style, and durability.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-secondary text-primary px-8 py-4 rounded-lg font-semibold shadow-lg flex items-center space-x-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Browse Collection</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-secondary text-secondary px-8 py-4 rounded-lg font-semibold"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
          variants={containerVariants}
        >
          {[
            {
              icon: Package,
              value: "500+",
              label: "Quality Products",
              color: "blue",
            },
            {
              icon: TrendingUp,
              value: "156+",
              label: "Daily Orders",
              color: "green",
            },
            {
              icon: Award,
              value: "4.9★",
              label: "Customer Rating",
              color: "yellow",
            },
            {
              icon: ShoppingBag,
              value: "1000+",
              label: "Happy Customers",
              color: "purple",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-secondary/10"
            >
              <div
                className={`bg-${stat.color}-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
              >
                <stat.icon
                  className={`w-6 h-6 text-${stat.color}-600`}
                />
              </div>
              <p className="text-3xl font-bold text-secondary mb-1">
                {stat.value}
              </p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
