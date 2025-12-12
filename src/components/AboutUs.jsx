import React from "react";
import { CheckCircle, Award, Users, Factory } from "lucide-react";

export default function AboutUs() {
  return (
    <section className="py-20 bg-white px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT — IMAGE SIDE */}
        <div className="relative">
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
        </div>

        {/* RIGHT — CONTENT SIDE */}
        <div>
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
            About Us
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            We are a trusted garment manufacturing partner delivering premium
            quality apparel to clients worldwide. Our mission is to combine
            craftsmanship, innovation, and technology to offer reliable production
            solutions that meet global standards.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            With a strong focus on quality control, ethical production, and on-time
            delivery, we help brands scale confidently while maintaining complete
            visibility into every stage of production.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {/* Feature */}
            <div className="flex items-start space-x-3">
              <div className="text-secondary">
                <CheckCircle className="w-6 h-6" />
              </div>
              <p className="text-gray-700">Premium Quality Standards</p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="text-secondary">
                <Factory className="w-6 h-6" />
              </div>
              <p className="text-gray-700">State-of-the-Art Production Unit</p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="text-secondary">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-gray-700">Skilled & Experienced Team</p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="text-secondary">
                <Award className="w-6 h-6" />
              </div>
              <p className="text-gray-700">Guaranteed On-Time Delivery</p>
            </div>
          </div>

          {/* CTA Button */}
          <button className="px-8 py-4 bg-secondary text-primary text-lg font-semibold rounded-xl shadow-xl hover:opacity-90 transition-all">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
