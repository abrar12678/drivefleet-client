"use client";

import Link from "next/link";
import { Users, MapPin, ArrowRight } from "lucide-react";

const CarsCard = ({ car }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img
          src={car.image}
          alt={car.carName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-lg bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200/50">
          {car.carType}
        </span>
        {car.availability ? (
          <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-lg bg-emerald-500/90 backdrop-blur-sm text-white">
            Available
          </span>
        ) : (
          <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-lg bg-red-500/90 backdrop-blur-sm text-white">
            Unavailable
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
          {car.carName}
        </h3>

        <div className="flex items-center gap-4 mb-4">
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <Users size={14} className="text-blue-500" />
            {car.seatCapacity} Seats
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <MapPin size={14} className="text-blue-500" />
            <span className="truncate max-w-[100px]">{car.pickupLocation}</span>
          </span>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-5">
          {car.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-2xl font-extrabold text-gray-900">
              ${car.dailyRentPrice}
            </span>
            <span className="text-sm text-gray-400 font-medium">/day</span>
          </div>
          <Link
            href={`/explore-cars/${car._id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200"
          >
            Details
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarsCard;
