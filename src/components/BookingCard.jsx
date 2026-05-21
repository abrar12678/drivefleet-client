"use client";
import { useState } from "react";
import Link from "next/link";
import BookingModal from "@/components/BookingModal";

const BookingCard = ({ car, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookNow = () => {
    if (!user) {
      window.location.href = "/sign-in";
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
            <span className="font-semibold text-gray-900">{car.carType}</span>
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
            onClick={handleBookNow}
            disabled={!car.availability}
            className="w-full py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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

      <BookingModal
        car={car}
        user={user}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default BookingCard;
