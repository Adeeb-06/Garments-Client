import React from "react";
import { CheckCircle, Award, Users, Factory } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function AboutUs() {
  return (
    <motion.section
      className="py-20 bg-white px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
      id="about-us"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT — IMAGE SIDE */}
        <motion.div variants={item} className="relative">
          {/* Background Shape */}
          <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl"></div>

          {/* Main Image */}
          <img
            src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FybWVudHN8ZW58MHx8MHx8fDA%3D"
            alt="Garment Factory"
            className="rounded-3xl shadow-2xl relative z-10 w-full object-cover"
          />

          {/* Floating Card */}
          <div className="absolute bottom-6 right-6 bg-secondary text-primary px-6 py-4 rounded-2xl shadow-xl z-20">
            <p className="text-lg font-bold">10+ Years of Experience</p>
          </div>
        </motion.div>

        {/* RIGHT — CONTENT SIDE */}
        <motion.div variants={item}>
          <motion.h2 variants={item} className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
            About Us
          </motion.h2>

          <motion.p variants={item} className="text-gray-700 text-lg leading-relaxed mb-6">
            We are a trusted garment manufacturing partner delivering premium
            quality apparel to clients worldwide. Our mission is to combine
            craftsmanship, innovation, and technology to offer reliable production
            solutions that meet global standards.
          </motion.p>

          <motion.p variants={item} className="text-gray-700 text-lg leading-relaxed mb-8">
            With a strong focus on quality control, ethical production, and on-time
            delivery, we help brands scale confidently while maintaining complete
            visibility into every stage of production.
          </motion.p>

          {/* Features */}
          <motion.div variants={container} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {[
              { icon: CheckCircle, text: "Premium Quality Standards" },
              { icon: Factory, text: "State-of-the-Art Production Unit" },
              { icon: Users, text: "Skilled & Experienced Team" },
              { icon: Award, text: "Guaranteed On-Time Delivery" },
            ].map((feature, idx) => (
              <motion.div key={idx} variants={item} className="flex items-start space-x-3">
                <div className="text-secondary">
                  <feature.icon className="w-6 h-6" />
                </div>
                <p className="text-gray-700">{feature.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-secondary text-primary text-lg font-semibold rounded-xl shadow-xl hover:opacity-90 transition-all"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
