"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const CarDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [driverNeeded, setDriverNeeded] = useState(false);
  const [specialNote, setSpecialNote] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const modalRef = useRef(null);

  // Fetch car data
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

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await authClient.getSession();
        setUser(data?.user || null);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  // Close modal on Escape key + lock body scroll
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (isModalOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Close modal on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDriverNeeded(false);
    setSpecialNote("");
  };

  // Open modal - check auth first
  const handleBookNowClick = () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }
    setIsModalOpen(true);
  };

  // Submit booking — frontend only, you'll add the backend fetch
  const handleBookingSubmit = () => {
    setBookingLoading(true);

    // --- YOUR BACKEND CODE GOES HERE ---
    // const bookingData = {
    //   carId: car._id,
    //   carName: car.carName,
    //   userEmail: user.email,
    //   userName: user.name,
    //   dailyRentPrice: car.dailyRentPrice,
    //   driverNeeded,
    //   specialNote,
    //   bookingDate: new Date().toISOString(),
    // };
    // const res = await fetch("http://localhost:5000/book-car", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(bookingData),
    // });

    setTimeout(() => {
      setBookingLoading(false);
      closeModal();
      alert("Car booked successfully!");
    }, 1000);
  };

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
                <Button
                  onPress={handleBookNowClick}
                  className="w-full py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300"
                  isDisabled={!car.availability || bookingLoading}
                >
                  {car.availability ? "Book Now" : "Currently Unavailable"}
                </Button>
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

      {/* ========== BOOKING MODAL ========== */}
      {isModalOpen && (
        <div
          ref={modalRef}
          onClick={handleBackdropClick}
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
                  <h2 className="text-xl font-bold text-gray-900">
                    Book This Car
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Review details and confirm your booking
                  </p>
                </div>
                <button
                  onClick={closeModal}
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

            {/* Body */}
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

              {/* Booking Info */}
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

              {/* Divider */}
              <div className="h-px bg-gray-200" />

              {/* Driver Needed */}
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Driver Needed
                </p>
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

              {/* Special Note */}
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

            {/* Footer */}
            <div className="px-6 pb-6 flex items-center gap-3">
              <button
                onClick={closeModal}
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBookingSubmit}
                disabled={bookingLoading}
                className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {bookingLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Booking...
                  </span>
                ) : (
                  "Book Now"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keyframes */}
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

export default CarDetailsPage;
