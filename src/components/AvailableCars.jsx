"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/explore-cars")
      .then((res) => res.json())
      .then((data) => {
        // ✅ Show only available cars, limit 6
        const available = data
          .filter((car) => car.availability === true)
          .slice(0, 6);
        setCars(available);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wide mb-4">
            Available Now
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Browse Available <span className="text-blue-600">Cars</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Choose from our wide selection of well-maintained vehicles ready for
            your next journey. All cars are inspected and ready to drive.
          </p>
        </div>

        {/* Cars Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : cars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div
                key={car._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={car.image}
                    alt={car.carName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-lg">
                    Available
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-1 bg-blue-600 text-white text-xs font-semibold rounded-lg">
                    {car.carType}
                  </span>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
                    {car.carName}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {car.pickupLocation}
                  </p>

                  {/* Specs Row */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>{car.seatCapacity} Seats</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{car.bookingCount || 0} Bookings</span>
                    </div>
                  </div>

                  {/* Price + Button */}
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-blue-600">
                      ${car.dailyRentPrice}
                      <span className="text-xs font-normal text-gray-400">
                        /day
                      </span>
                    </p>
                    <Link
                      href={`/explore-cars/${car._id}`}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500">
              No available cars at the moment. Check back soon!
            </p>
          </div>
        )}

        {/* View All Button */}
        {cars.length > 0 && (
          <div className="text-center mt-10">
            <Link
              href="/explore-cars"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              View All Cars
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default AvailableCars;
