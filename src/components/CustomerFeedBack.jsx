import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Star, Quote } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function CustomerFeedback() {
  const feedbacks = [
    {
      name: "Sarah Johnson",
      role: "Fashion Boutique Owner",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      rating: 5,
      feedback:
        "Outstanding quality and service! The garments exceeded our expectations. The attention to detail and timely delivery make them our go-to supplier.",
      date: "December 2024",
    },
    {
      name: "Michael Chen",
      role: "Retail Manager",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 5,
      feedback:
        "Professional service from start to finish. The production tracking system is incredibly helpful, and the quality control is top-notch.",
      date: "November 2024",
    },
    {
      name: "Emily Rodriguez",
      role: "Online Store Owner",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      rating: 4,
      feedback:
        "Great experience working with this team. Fast turnaround time and excellent communication throughout the entire process.",
      date: "November 2024",
    },
    {
      name: "David Thompson",
      role: "Clothing Brand CEO",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      rating: 5,
      feedback:
        "The best garment supplier we have worked with. Consistent quality, competitive pricing, and reliable delivery schedules.",
      date: "October 2024",
    },
  ];

  return (
    <section className="bg-primary py-16 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop
          spaceBetween={40}
        >
          {feedbacks.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 relative">
                {/* Quote icon */}
                <div className="absolute top-8 right-8 opacity-10">
                  <Quote className="w-32 h-32 text-secondary" />
                </div>

                <div className="p-8 md:p-12 relative z-10">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* Avatar */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-secondary shadow-lg object-cover"
                    />

                    {/* Content */}
                    <div className="text-center md:text-left flex-1">
                      {/* Rating */}
                      <div className="flex items-center justify-center md:justify-start space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < item.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-300 text-gray-300"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-gray-700 text-lg italic leading-relaxed mb-6">
                        “{item.feedback}”
                      </p>

                      <h3 className="text-xl font-bold text-secondary">
                        {item.name}
                      </h3>
                      <p className="text-gray-600">{item.role}</p>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Customer count */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Join{" "}
            <span className="font-bold text-secondary">1,000+</span> happy
            customers
          </p>
        </div>
      </div>
    </section>
  );
}
