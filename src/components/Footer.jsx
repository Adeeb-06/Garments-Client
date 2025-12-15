import React from "react";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-primary pt-16 pb-10 px-6">
      <div className="w-full mx-auto grid md:grid-cols-4 gap-12">

        {/* Logo + Short Intro */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Garment Production</h2>
          <p className="text-primary/80 leading-relaxed">
            Premium garment manufacturing & production solutions.  
            Quality, reliability, and on-time delivery you can trust.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-primary/80">
            <li className="hover:text-primary transition">Home</li>
            <li className="hover:text-primary transition">About Us</li>
            <li className="hover:text-primary transition">How It Works</li>
            <li className="hover:text-primary transition">Contact</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <ul className="space-y-4 text-primary/80">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5" />
              House 12, Road 5, Dhanmondi, Dhaka
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5" />
              +880 1700-000000
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5" />
              info@yourcompany.com
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex items-center gap-4">
            <a className="p-3 bg-primary rounded-full hover:opacity-80 transition cursor-pointer">
              <Facebook className="text-secondary w-5 h-5" />
            </a>
            <a className="p-3 bg-primary rounded-full hover:opacity-80 transition cursor-pointer">
              <Instagram className="text-secondary w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary/30 mt-12 pt-6 text-center text-primary/80 text-sm">
        © {new Date().getFullYear()} Garment Production. All Rights Reserved.
      </div>
    </footer>
  );
}
