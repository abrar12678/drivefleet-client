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
    <section className="relative min-h-[85vh] sm:min-h-[92vh] flex items-center overflow-hidden bg-gray-950">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury car on road"
          className="w-full h-full object-cover opacity-40 animate-hero-img"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-gray-950/50" />

        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] animate-float" />
        <div
          className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-indigo-500/10 rounded-full blur-[80px] animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <div
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-blue-300 text-[10px] sm:text-xs font-medium uppercase tracking-widest mb-4 sm:mb-6 animate-fade-up hover:bg-white/15 hover:border-white/20 hover:scale-105 transition-all duration-300 cursor-default"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Drive Your Dream Car Today
          </div>

          <h1
            className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] mb-4 sm:mb-6 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            Find Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-[length:200%_auto] hover:bg-[length:100%_auto] transition-all duration-700">
              Perfect Ride
            </span>
            <br />
            In Minutes
          </h1>

          <p
            className="text-sm sm:text-lg text-gray-300 leading-relaxed mb-6 sm:mb-8 max-w-lg animate-fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            Browse through our collection of premium vehicles at unbeatable
            prices. From city commutes to road trips, DriveFleet has the right
            car waiting for you.
          </p>

          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-14 animate-fade-up"
            style={{ animationDelay: "0.8s" }}
          >
            <Link
              href="/explore-cars"
              className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-[1.04] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10 flex items-center gap-2.5">
                Explore Cars
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1.5 group-hover:scale-110 transition-all duration-300"
                />
              </span>
            </Link>
            <Link
              href="/sign-up"
              className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 text-gray-300 font-semibold rounded-xl border border-white/15 backdrop-blur-sm hover:bg-white/10 hover:text-white hover:border-white/30 hover:scale-[1.03] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/5 active:scale-[0.98] transition-all duration-300"
            >
              <span className="w-0 group-hover:w-2 h-2 rounded-full bg-blue-400 transition-all duration-300" />
              Join for Free
            </Link>
          </div>

          <div
            className="grid grid-cols-3 gap-3 sm:gap-10 animate-fade-up"
            style={{ animationDelay: "1s" }}
          >
            {stats.map(({ Icon, value, label }, index) => (
              <div
                key={label}
                className="group/stat p-2 sm:p-3 rounded-xl cursor-default hover:bg-white/5 transition-all duration-300"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover/stat:scale-110 group-hover/stat:bg-blue-500/15 group-hover/stat:border-blue-400/30 transition-all duration-300 mb-1 sm:mb-0">
                  <Icon
                    size={14}
                    className="sm:w-[18px] sm:h-[18px] text-blue-400 group-hover/stat:text-blue-300 transition-colors duration-300"
                  />
                </div>
                <div className="group-hover/stat:translate-x-1 transition-transform duration-300">
                  <p className="text-white font-bold text-base sm:text-lg leading-tight group-hover/stat:text-blue-50 transition-colors duration-300">
                    {value}
                  </p>
                  <p className="text-gray-500 text-[10px] sm:text-xs font-medium group-hover/stat:text-gray-400 transition-colors duration-300">
                    {label}
                  </p>
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
