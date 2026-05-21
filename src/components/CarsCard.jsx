"use client";

import Link from "next/link";
import { Users, MapPin, ArrowRight } from "lucide-react";

const CarsCard = ({ car, index = 0 }) => {
  return (
    <div
      className="animate-fade-up group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-2 hover:border-blue-100 transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >

      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img
          src={car.image}
          alt={car.carName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-lg bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200/50 group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
          {car.carType}
        </span>
        {car.availability ? (
          <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-lg bg-emerald-500/90 backdrop-blur-sm text-white shadow-sm shadow-emerald-200">
            Available
          </span>
        ) : (
          <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-lg bg-red-500/90 backdrop-blur-sm text-white shadow-sm shadow-red-200">
            Unavailable
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1 truncate group-hover:text-blue-700 transition-colors duration-200">
          {car.carName}
        </h3>

        <div className="flex items-center gap-4 mb-4">
          <span className="flex items-center gap-1.5 text-xs text-gray-500 px-2 py-1 rounded-md bg-gray-50 group-hover:bg-blue-50 transition-colors duration-200">
            <Users
              size={14}
              className="text-blue-500 group-hover:text-blue-600 transition-colors duration-200"
            />
            <span className="group-hover:text-blue-600 transition-colors duration-200">
              {car.seatCapacity} Seats
            </span>
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-500 px-2 py-1 rounded-md bg-gray-50 group-hover:bg-blue-50 transition-colors duration-200">
            <MapPin
              size={14}
              className="text-blue-500 group-hover:text-blue-600 transition-colors duration-200"
            />
            <span className="truncate max-w-[100px] group-hover:text-blue-600 transition-colors duration-200">
              {car.pickupLocation}
            </span>
          </span>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-5 group-hover:text-gray-600 transition-colors duration-200">
          {car.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 group-hover:border-blue-50 transition-colors duration-300">
          <div className="group-hover:scale-105 transition-transform duration-200">
            <span className="text-2xl font-extrabold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
              ${car.dailyRentPrice}
            </span>
            <span className="text-sm text-gray-400 font-medium">/day</span>
          </div>
          <Link
            href={`/explore-cars/${car._id}`}
            className="group/btn relative inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm hover:shadow-md hover:shadow-blue-200 hover:scale-105 active:scale-95 transition-all duration-200 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
            <span className="relative z-10 flex items-center gap-1.5">
              Details
              <ArrowRight
                size={14}
                className="group-hover/btn:translate-x-1 transition-transform duration-200"
              />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarsCard;
