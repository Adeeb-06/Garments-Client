import React from "react";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";

export default function ContactUs() {
  return (
    <section className="py-20 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions or want to start a production? Feel free to reach out.
            Our team is here to assist you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* LEFT — CONTACT INFO */}
          <div className="space-y-8">
            {/* Address */}
            <div className="flex items-start space-x-4 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <div className="bg-secondary text-primary p-3 rounded-xl">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-secondary">
                  Our Location
                </h3>
                <p className="text-gray-600 mt-1">
                  House 12, Road 5, Dhanmondi, Dhaka, Bangladesh
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <div className="bg-secondary text-primary p-3 rounded-xl">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-secondary">Phone</h3>
                <p className="text-gray-600 mt-1">+880 1700-000000</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <div className="bg-secondary text-primary p-3 rounded-xl">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-secondary">Email</h3>
                <p className="text-gray-600 mt-1">info@yourcompany.com</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start space-x-4 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <div class              ="bg-secondary text-primary p-3 rounded-xl">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-secondary">
                  Working Hours
                </h3>
                <p className="text-gray-600 mt-1">Sun–Thu: 9 AM – 6 PM</p>
                <p className="text-gray-600">Friday: Closed</p>
              </div>
            </div>
          </div>

          {/* RIGHT — CONTACT FORM */}
          <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-200">
            <h3 className="text-2xl font-bold text-secondary mb-6">
              Send us a Message
            </h3>

            <form className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary outline-none"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary outline-none"
                  placeholder="Enter your email"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary outline-none"
                  placeholder="Write your message..."
                ></textarea>
              </div>

              {/* Send Button */}
              <button
                type="submit"
                className="w-full py-4 bg-secondary text-primary font-semibold rounded-xl shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
