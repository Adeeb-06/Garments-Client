import React from "react";
import { ClipboardCheck, Truck, ShieldCheck, Package, BarChart3 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Order Received",
      description:
        "We confirm your order details, fabric choice, quantity, sizes, and delivery timeline. Everything is logged into our production system for transparency.",
      icon: ClipboardCheck,
    },
    {
      title: "Production Starts",
      description:
        "Your items go through cutting, sewing, finishing, and QC checkpoints. Each step is tracked live so you always know the current status.",
      icon: BarChart3,
    },
    {
      title: "Quality Check",
      description:
        "Every piece is inspected by our quality assurance team to ensure measurements, stitching, and finishing meet industry standards.",
      icon: ShieldCheck,
    },
    {
      title: "Packaging",
      description:
        "All approved garments are neatly packed with care, labelled, and prepared for dispatch to ensure they arrive in perfect condition.",
      icon: Package,
    },
    {
      title: "Delivery",
      description:
        "Once shipped, you get real-time tracking updates until your order reaches your doorstep or warehouse safely.",
      icon: Truck,
    },
  ];

  return (
    <section className="py-20 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A transparent, step-by-step process designed to give you confidence in our production workflow.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2  lg:grid-cols-3 gap-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-white shadow-xl rounded-3xl p-8 border border-gray-200 text-center hover:shadow-2xl transition-all"
              >
                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-primary text-secondary shadow-md">
                  <Icon className="w-10 h-10" />
                </div>

                {/* Step title */}
                <h3 className="text-2xl font-semibold text-secondary mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
