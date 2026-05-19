"use client";

import Link from "next/link";
import { ArrowRight, Users, Car, MapPin } from "lucide-react";

const stats = [
  { Icon: Car, value: "500+", label: "Premium Cars" },
  { Icon: Users, value: "10K+", label: "Happy Renters" },
  { Icon: MapPin, value: "50+", label: "Pickup Locations" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gray-950">
      {/* ── Background Layers ── */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury car on road"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-gray-950/50" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-blue-300 text-xs font-medium uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Drive Your Dream Car Today
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] mb-6">
            Find Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Perfect Ride
            </span>
            <br />
            In Minutes
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8 max-w-lg">
            Browse through our collection of premium vehicles at unbeatable
            prices. From city commutes to road trips, DriveFleet has the right
            car waiting for you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-14">
            <Link
              href="/explore-cars"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] transition-all duration-300"
            >
              Explore Cars
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-gray-300 font-semibold rounded-xl border border-white/15 backdrop-blur-sm hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              Join for Free
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 sm:gap-12">
            {stats.map(({ Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg leading-tight">
                    {value}
                  </p>
                  <p className="text-gray-500 text-xs font-medium">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
