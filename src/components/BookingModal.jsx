"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Spinner } from "@heroui/react";
import { toast } from "react-toastify";

const BookingModal = ({ car, user, isOpen, onClose }) => {
  const [driverNeeded, setDriverNeeded] = useState(false);
  const [specialNote, setSpecialNote] = useState("");
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setDriverNeeded(false);
      setSpecialNote("");
      return;
    }
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId: car._id,
          carName: car.carName,
          carImage: car.image,
          userEmail: user.email,
          userName: user.name,
          dailyRentPrice: car.dailyRentPrice,
          driverNeeded,
          specialNote,
          bookingDate: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        onClose();
        toast.success("Car booked successfully!");
      } else {
        toast.error("Booking failed. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      onClick={(e) => {
        if (e.target === modalRef.current) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-[slideUp_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Book This Car</h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Review details and confirm your booking
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Car Summary */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="w-20 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0 relative">
              <Image
                src={car.image}
                alt={car.carName}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">
                {car.carName}
              </h3>
              <p className="text-sm text-gray-500">
                {car.carType} &bull; {car.seatCapacity} Seats
              </p>
              <p className="text-sm text-gray-400">{car.pickupLocation}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-lg font-bold text-blue-600">
                ${car.dailyRentPrice}
              </p>
              <p className="text-xs text-gray-400">/day</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <p className="text-xs text-gray-500 mb-0.5">Booking By</p>
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.name}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <p className="text-xs text-gray-500 mb-0.5">Booking Date</p>
              <p className="text-sm font-semibold text-gray-900">
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="h-px bg-gray-200" />

          <div>
            <p className="text-sm font-semibold text-gray-900">Driver Needed</p>
            <p className="text-xs text-gray-500 mt-1 mb-3">
              Do you need a driver with the car?
            </p>
            <div className="flex gap-3">
              <label
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-all ${
                  driverNeeded
                    ? "border-blue-500 bg-blue-50 text-blue-600 ring-1 ring-blue-500"
                    : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="driverNeeded"
                  value="yes"
                  checked={driverNeeded === true}
                  onChange={() => setDriverNeeded(true)}
                  className="sr-only"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Yes
              </label>
              <label
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-all ${
                  driverNeeded === false
                    ? "border-emerald-500 bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500"
                    : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="driverNeeded"
                  value="no"
                  checked={driverNeeded === false}
                  onChange={() => setDriverNeeded(false)}
                  className="sr-only"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="10" />
                </svg>
                No
              </label>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900 mb-2">
              Special Note
            </p>
            <textarea
              placeholder="Any special requests or notes for your booking..."
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 border border-gray-200 rounded-xl hover:border-blue-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
        </div>

        <div className="px-6 pb-6 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner size="sm" color="white" />
                Booking...
              </span>
            ) : (
              "Book Now"
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default BookingModal;
