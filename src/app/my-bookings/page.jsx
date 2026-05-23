"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;

export default function MyBookingsPage() {
  const router = useRouter();
  const [debug, setDebug] = useState("Starting...");
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDebug("Fetching session...");
    fetch("/api/auth/get-session")
      .then((res) => {
        setDebug("Status: " + res.status);
        return res.text();
      })
      .then((text) => {
        setDebug("Raw: " + text.substring(0, 200));
        try {
          const data = JSON.parse(text);
          if (data.user) {
            setUser(data.user);
            setDebug("FOUND USER: " + data.user.email);
          } else {
            setDebug("NO USER in response");
          }
        } catch (e) {
          setDebug("JSON ERROR: " + text.substring(0, 100));
        }
        setChecking(false);
      })
      .catch((e) => {
        setDebug("FETCH ERROR: " + e.message);
        setChecking(false);
      });
  }, []);

  useEffect(() => {
    if (checking) return;
    if (!user) {
      setDebug("NO USER - redirecting in 3s...");
      setTimeout(() => router.push("/sign-in"), 3000);
    }
  }, [checking, user, router]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch(`${SERVER}/api/bookings/my-bookings?userId=${user.id}`)
      .then((r) => r.json())
      .then((d) => {
        setBookings(d.bookings || d || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* DEBUG BANNER - yellow box showing what's happening */}
      <div
        style={{
          background: "yellow",
          padding: "16px",
          marginBottom: "16px",
          fontFamily: "monospace",
          fontSize: "14px",
          border: "2px solid red",
        }}
      >
        <strong>AUTH DEBUG:</strong> {debug}
      </div>

      {checking ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : !user ? null : (
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
                            {b.carTitle || "CarName"}
                          </h3>
                          {b.carBrand && (
                            <p className="text-sm text-gray-500">
                              {b.carBrand}
                            </p>
                          )}
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
                          {b.status || "Pending"}
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-400 uppercase">
                            Pick-up
                          </p>
                          <p className="text-sm font-medium">
                            {b.startDate || b.pickupDate || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase">
                            Drop-off
                          </p>
                          <p className="text-sm font-medium">
                            {b.endDate || b.dropoffDate || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase">
                            Total
                          </p>
                          <p className="text-sm font-bold">
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
      )}
    </div>
  );
}
