"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/explore-cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-xl text-gray-500">Car not found</p>
        <Link
          href="/explore-cars"
          className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          Back to Explore Cars
        </Link>
      </div>
    );
  }

  const specs = [
    { label: "Car Type", value: car.carType },
    { label: "Seat Capacity", value: `${car.seatCapacity} Passengers` },
    { label: "Daily Rent", value: `$${car.dailyRentPrice}` },
    { label: "Pickup Location", value: car.pickupLocation },
    { label: "Booking Count", value: `${car.bookingCount || 0} Times` },
    {
      label: "Availability",
      value: car.availability ? "Available" : "Unavailable",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/explore-cars"
            className="hover:text-blue-600 transition-colors"
          >
            Explore Cars
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate max-w-[180px]">
            {car.carName}
          </span>
        </nav>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Left — Image & Info */}
          <div className="lg:col-span-3 space-y-6">
            {/* Image */}
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gray-200 shadow-md">
              <Image
                src={car.image}
                alt={car.carName}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-lg uppercase tracking-wide">
                {car.carType}
              </span>
              <span
                className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-lg ${car.availability ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}
              >
                {car.availability ? "Available" : "Unavailable"}
              </span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {car.carName}
              </h1>
              <p className="text-gray-500 mt-1">{car.pickupLocation}</p>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Description
              </h2>
              <p className="text-gray-600 text-[0.95rem] leading-relaxed">
                {car.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Specifications
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {specs.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col bg-gray-50 rounded-xl p-4"
                  >
                    <span className="text-xs text-gray-500 mb-1">
                      {item.label}
                    </span>
                    <span
                      className={`text-sm font-semibold ${item.label === "Availability" ? (car.availability ? "text-emerald-600" : "text-red-600") : "text-gray-900"}`}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Price & Book */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6">
                <p className="text-blue-100 text-sm">Daily Rent</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-4xl font-extrabold text-white">
                    ${car.dailyRentPrice}
                  </span>
                  <span className="text-blue-200 text-sm">/day</span>
                </div>
              </div>

              <div className="px-6 py-5 space-y-4 border-b border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Car Type</span>
                  <span className="font-semibold text-gray-900">
                    {car.carType}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Seats</span>
                  <span className="font-semibold text-gray-900">
                    {car.seatCapacity} Passengers
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Location</span>
                  <span className="font-semibold text-gray-900">
                    {car.pickupLocation}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span
                    className={`font-semibold ${car.availability ? "text-emerald-600" : "text-red-600"}`}
                  >
                    {car.availability ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>

              <div className="px-6 py-6 space-y-3">
                <button
                  className="w-full py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-md"
                  disabled={!car.availability}
                >
                  {car.availability ? "Book Now" : "Currently Unavailable"}
                </button>
                <Link
                  href="/explore-cars"
                  className="block w-full py-3.5 rounded-xl text-sm font-semibold text-gray-600 text-center border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Back to Explore Cars
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
