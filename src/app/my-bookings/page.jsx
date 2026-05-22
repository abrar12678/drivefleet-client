"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/use-auth";
import Image from "next/image";
import Link from "next/link";

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;

export default function MyBookingsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ===== AUTH GUARD =====
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // ===== FETCH BOOKINGS =====
  useEffect(() => {
    if (!user) return;

    async function fetchBookings() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `${SERVER}/api/bookings/my-bookings?userId=${user.id}`,
          {
            headers: { "Content-Type": "application/json" },
          },
        );
        const data = await res.json();
        if (res.ok) {
          setBookings(data.bookings || data || []);
        } else {
          setError(data.message || "Failed to load bookings.");
        }
      } catch (err) {
        console.error("Fetch bookings error:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [user]);

  const handleCancel = async (bookingId) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const res = await fetch(`${SERVER}/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      } else {
        alert(data.message || "Failed to cancel booking.");
      }
    } catch (err) {
      alert("Something went wrong.");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const totalDays = (start, end) => {
    if (!start || !end) return 1;
    const diff = new Date(end) - new Date(start);
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 text-sm mb-4 inline-block"
          >
            &larr; Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-500 mt-1">
            View and manage your car rental bookings.
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 text-5xl mb-4">🚗</div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No bookings yet
            </h3>
            <p className="text-gray-500 mb-6">
              You haven&apos;t made any bookings. Start exploring available
              cars!
            </p>
            <Link
              href="/explore-cars"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore Cars
            </Link>
          </div>
        )}

        {!loading && bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-56 h-48 md:h-auto relative bg-gray-100 shrink-0">
                    {booking.carImage || booking.imageUrl ? (
                      <Image
                        src={booking.carImage || booking.imageUrl}
                        alt={booking.carTitle || "Car"}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                        🚗
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {booking.carTitle || booking.carName || "Car Rental"}
                        </h3>
                        {booking.carBrand && (
                          <p className="text-sm text-gray-500">
                            {booking.carBrand}
                            {booking.category ? ` · ${booking.category}` : ""}
                          </p>
                        )}
                      </div>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === "Confirmed" ||
                          booking.status === "confirmed"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : booking.status === "Cancelled" ||
                                booking.status === "cancelled"
                              ? "bg-red-50 text-red-700 border border-red-200"
                              : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                        }`}
                      >
                        {booking.status || "Pending"}
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          Pick-up
                        </p>
                        <p className="text-sm font-medium text-gray-700">
                          {formatDate(booking.startDate || booking.pickupDate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          Drop-off
                        </p>
                        <p className="text-sm font-medium text-gray-700">
                          {formatDate(booking.endDate || booking.dropoffDate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          Total
                        </p>
                        <p className="text-sm font-bold text-gray-900">
                          ${booking.totalPrice || booking.totalAmount || "N/A"}
                        </p>
                        <p className="text-xs text-gray-400">
                          {totalDays(
                            booking.startDate || booking.pickupDate,
                            booking.endDate || booking.dropoffDate,
                          )}{" "}
                          day(s)
                        </p>
                      </div>
                    </div>
                    {(booking.pickupLocation || booking.location) && (
                      <div className="mt-3">
                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          Location
                        </p>
                        <p className="text-sm text-gray-600">
                          {booking.pickupLocation || booking.location}
                        </p>
                      </div>
                    )}
                    <div className="mt-4 flex gap-3">
                      {booking.status !== "Cancelled" &&
                        booking.status !== "cancelled" && (
                          <button
                            onClick={() => handleCancel(booking._id)}
                            className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            Cancel Booking
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
