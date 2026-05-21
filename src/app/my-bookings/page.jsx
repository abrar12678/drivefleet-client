"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const MyBookingsPage = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await authClient.getSession();
        const currentUser = data?.user || null;
        setUser(currentUser);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        // ✅ Get JWT token from Better Auth client (same as your mentor)
        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token;

        const res = await fetch(
          `http://localhost:5000/bookings?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          setBookings([]);
        }
      } catch (err) {
        console.error("Fetch bookings error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  if (!user && loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              My Bookings
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {bookings.length} {bookings.length === 1 ? "booking" : "bookings"}{" "}
              found
            </p>
          </div>
          <Link
            href="/explore-cars"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors w-fit"
          >
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Browse Cars
          </Link>
        </div>

        {/* Empty State */}
        {bookings.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No Bookings Yet
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              You haven&apos;t booked any cars yet. Start exploring and book
              your first ride!
            </p>
            <Link
              href="/explore-cars"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Explore Cars
            </Link>
          </div>
        )}

        {/* Bookings List */}
        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <div
              key={booking._id || index}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Car Image */}
                <div className="sm:w-48 h-40 sm:h-auto bg-gradient-to-br from-blue-100 to-indigo-100 relative flex-shrink-0">
                  {booking.carImage ? (
                    <Image
                      src={booking.carImage}
                      alt={booking.carName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 192px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12 text-blue-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 17h.01M16 17h.01M3 11l1.5-5A2 2 0 016.4 4h11.2a2 2 0 011.9 1.4L21 11M3 11v6a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-6M3 11h18"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Booking Details */}
                <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    {/* Top: Car Name + Status */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {booking.carName}
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                          Booked by{" "}
                          <span className="font-medium text-gray-700">
                            {booking.userName}
                          </span>
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-lg border border-emerald-100 flex-shrink-0">
                        Confirmed
                      </span>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-xs text-gray-500 mb-0.5">
                          Total Price
                        </p>
                        <p className="text-sm font-bold text-gray-900">
                          ${booking.dailyRentPrice}
                          <span className="text-xs font-normal text-gray-400">
                            /day
                          </span>
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-xs text-gray-500 mb-0.5">
                          Booking Date
                        </p>
                        <Link
                          href={`/explore-cars/${booking.carId}`}
                          className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                        >
                          {booking.bookingDate
                            ? new Date(booking.bookingDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )
                            : "N/A"}
                        </Link>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-xs text-gray-500 mb-0.5">Driver</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {booking.driverNeeded ? "Requested" : "Not Needed"}
                        </p>
                      </div>
                    </div>

                    {/* Special Note */}
                    {booking.specialNote && (
                      <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                        <p className="text-xs text-amber-600 font-medium mb-0.5">
                          Special Note
                        </p>
                        <p className="text-sm text-gray-700">
                          {booking.specialNote}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href={`/explore-cars/${booking.carId}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      View Car Details →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookingsPage;
