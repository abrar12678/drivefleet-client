"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const MyAddedCarsPage = () => {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Update modal
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [updateCar, setUpdateCar] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  // Delete modal
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteCar, setDeleteCar] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const deleteModalRef = useRef(null);
  const updateModalRef = useRef(null);

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

  // ✅ Fetch user's cars — with JWT
  useEffect(() => {
    if (!user) return;
    const fetchCars = async () => {
      try {
        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token;

        const res = await fetch(
          `http://localhost:5000/my-cars?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setCars(data);
        } else {
          setCars([]);
        }
      } catch (err) {
        console.error("Fetch cars error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [user]);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (isUpdateOpen || isDeleteOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isUpdateOpen, isDeleteOpen]);

  // Open update modal
  const openUpdateModal = (car) => {
    setUpdateCar({ ...car });
    setIsUpdateOpen(true);
  };

  // Handle update form change
  const handleUpdateChange = (field, value) => {
    setUpdateCar((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Submit update — with JWT
  const handleUpdateSubmit = async () => {
    setUpdateLoading(true);
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const { _id, ...fields } = updateCar;
      const res = await fetch(`http://localhost:5000/update-car/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        setIsUpdateOpen(false);
        setUpdateCar(null);
        const refreshed = await fetch(
          `http://localhost:5000/my-cars?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const refreshedData = await refreshed.json();
        if (Array.isArray(refreshedData)) {
          setCars(refreshedData);
        }
        alert("Car updated successfully!");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Update failed. Please try again.");
    } finally {
      setUpdateLoading(false);
    }
  };

  // Open delete modal
  const openDeleteModal = (car) => {
    setDeleteCar(car);
    setIsDeleteOpen(true);
  };

  // ✅ Confirm delete — with JWT
  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const res = await fetch(
        `http://localhost:5000/delete-car/${deleteCar._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.ok) {
        setIsDeleteOpen(false);
        setDeleteCar(null);
        setCars((prev) => prev.filter((c) => c._id !== deleteCar._id));
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              My Added Cars
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {cars.length} {cars.length === 1 ? "car" : "cars"} listed
            </p>
          </div>
          <Link
            href="/add-car"
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
            Add New Car
          </Link>
        </div>

        {/* Empty State */}
        {cars.length === 0 && (
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
                  d="M8 17h.01M16 17h.01M3 11l1.5-5A2 2 0 016.4 4h11.2a2 2 0 011.9 1.4L21 11M3 11v6a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-6M3 11h18"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No Cars Listed
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              You haven&apos;t added any cars yet. Add your first car listing!
            </p>
            <Link
              href="/add-car"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Add Car
            </Link>
          </div>
        )}

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-200">
                <Image
                  src={car.image}
                  alt={car.carName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span
                  className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-lg ${
                    car.availability
                      ? "bg-emerald-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {car.availability ? "Available" : "Unavailable"}
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
                  {car.pickupLocation} &bull; {car.seatCapacity} Seats
                </p>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-lg font-bold text-blue-600">
                    ${car.dailyRentPrice}
                    <span className="text-xs font-normal text-gray-400">
                      /day
                    </span>
                  </p>
                  <p className="text-xs text-gray-400">
                    {car.bookingCount || 0} bookings
                  </p>
                </div>

                <p className="text-xs text-gray-500 line-clamp-2 mb-4">
                  {car.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openUpdateModal(car)}
                    className="flex-1 py-2 rounded-xl text-sm font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50 transition-colors"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => openDeleteModal(car)}
                    className="flex-1 py-2 rounded-xl text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========== UPDATE MODAL ========== */}
      {isUpdateOpen && updateCar && (
        <div
          ref={updateModalRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
          onClick={(e) => {
            if (e.target === updateModalRef.current) {
              setIsUpdateOpen(false);
              setUpdateCar(null);
            }
          }}
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
                    Update Car
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {updateCar.carName}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsUpdateOpen(false);
                    setUpdateCar(null);
                  }}
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
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                  Image URL
                </label>
                <input
                  type="url"
                  value={updateCar.image || ""}
                  onChange={(e) => handleUpdateChange("image", e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl hover:border-blue-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                  Car Type
                </label>
                <select
                  value={updateCar.carType || ""}
                  onChange={(e) =>
                    handleUpdateChange("carType", e.target.value)
                  }
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl hover:border-blue-400 focus:outline-none focus:border-blue-500 transition-colors bg-white"
                >
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Convertible">Convertible</option>
                  <option value="Truck">Truck</option>
                  <option value="Van">Van</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                  Daily Rent Price ($)
                </label>
                <input
                  type="number"
                  value={updateCar.dailyRentPrice || ""}
                  onChange={(e) =>
                    handleUpdateChange("dailyRentPrice", Number(e.target.value))
                  }
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl hover:border-blue-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                  Pickup Location
                </label>
                <input
                  type="text"
                  value={updateCar.pickupLocation || ""}
                  onChange={(e) =>
                    handleUpdateChange("pickupLocation", e.target.value)
                  }
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl hover:border-blue-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                  Availability
                </label>
                <select
                  value={updateCar.availability ? "true" : "false"}
                  onChange={(e) =>
                    handleUpdateChange(
                      "availability",
                      e.target.value === "true",
                    )
                  }
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl hover:border-blue-400 focus:outline-none focus:border-blue-500 transition-colors bg-white"
                >
                  <option value="true">Available</option>
                  <option value="false">Unavailable</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                  Description
                </label>
                <textarea
                  value={updateCar.description || ""}
                  onChange={(e) =>
                    handleUpdateChange("description", e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl hover:border-blue-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 flex items-center gap-3">
              <button
                onClick={() => {
                  setIsUpdateOpen(false);
                  setUpdateCar(null);
                }}
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSubmit}
                disabled={updateLoading}
                className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {updateLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating...
                  </span>
                ) : (
                  "Update Car"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== DELETE CONFIRMATION MODAL ========== */}
      {isDeleteOpen && deleteCar && (
        <div
          ref={deleteModalRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
          onClick={(e) => {
            if (e.target === deleteModalRef.current) {
              setIsDeleteOpen(false);
              setDeleteCar(null);
            }
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-[slideUp_0.25s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Delete Car
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                Are you sure you want to delete
              </p>
              <p className="text-sm font-semibold text-gray-900 mb-6">
                &quot;{deleteCar.carName}&quot;?
              </p>
              <p className="text-xs text-red-500 mb-6">
                This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsDeleteOpen(false);
                    setDeleteCar(null);
                  }}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deleteLoading}
                  className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {deleteLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Deleting...
                    </span>
                  ) : (
                    "Yes, Delete"
                  )}
                </button>
              </div>
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

export default MyAddedCarsPage;
