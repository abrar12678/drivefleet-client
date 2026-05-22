"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;

export default function MyBookingsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("[MY-BOOKINGS] Page loaded, fetching session...");
    fetch("/api/auth/get-session")
      .then((res) => {
        console.log("[MY-BOOKINGS] Session status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("[MY-BOOKINGS] Session data:", JSON.stringify(data));
        if (data.user) {
          console.log("[MY-BOOKINGS] User found:", data.user.email);
          setUser(data.user);
        } else {
          console.log("[MY-BOOKINGS] NO USER in response");
        }
        setChecking(false);
      })
      .catch((err) => {
        console.log("[MY-BOOKINGS] Fetch error:", err);
        setChecking(false);
      });
  }, []);

  useEffect(() => {
    if (!checking && !user) {
      console.log("[MY-BOOKINGS] Redirecting to sign-in");
      router.push("/sign-in");
    }
  }, [checking, user, router]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch(`${SERVER}/api/bookings/my-bookings?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data.bookings || data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const formatDate = (d) => {
    if (!d) return "N/A";
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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

        {!loading && bookings.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 text-5xl mb-4">🚗</div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No bookings yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start exploring available cars!
            </p>
            <Link
              href="/explore-cars"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
            >
              Explore Cars
            </Link>
          </div>
        )}

        {bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-56 h-48 md:h-auto relative bg-gray-100 shrink-0">
                    {b.carImage || b.imageUrl ? (
                      <Image
                        src={b.carImage || b.imageUrl}
                        alt={b.carTitle || "Car"}
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
                          {b.carTitle || b.carName || "Car Rental"}
                        </h3>
                        {b.carBrand && (
                          <p className="text-sm text-gray-500">
                            {b.carBrand}
                            {b.category ? ` · ${b.category}` : ""}
                          </p>
                        )}
                      </div>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          b.status === "Confirmed" || b.status === "confirmed"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : b.status === "Cancelled" ||
                                b.status === "cancelled"
                              ? "bg-red-50 text-red-700 border border-red-200"
                              : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                        }`}
                      >
                        {b.status || "Pending"}
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          Pick-up
                        </p>
                        <p className="text-sm font-medium text-gray-700">
                          {formatDate(b.startDate || b.pickupDate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          Drop-off
                        </p>
                        <p className="text-sm font-medium text-gray-700">
                          {formatDate(b.endDate || b.dropoffDate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          Total
                        </p>
                        <p className="text-sm font-bold text-gray-900">
                          ${b.totalPrice || b.totalAmount || "N/A"}
                        </p>
                      </div>
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
