"use client";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

const carTypes = [
  "SUV",
  "Sedan",
  "Hatchback",
  "Luxury",
  "Electric",
  "Convertible",
  "Pickup Truck",
  "Minivan",
];

const AddCarPage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    carName: "",
    dailyRentPrice: "",
    carType: "",
    image: "",
    seatCapacity: "",
    pickupLocation: "",
    description: "",
    availability: "true",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    const res = await fetch("http://localhost:5000/add-car", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        dailyRentPrice: Number(formData.dailyRentPrice),
        seatCapacity: Number(formData.seatCapacity),
        availability: formData.availability === "true",
        bookingCount: 0,
        addedByEmail: user?.email,
      }),
    });

    const data = await res.json();
    if (data.insertedId) {
      setSuccess("Car added successfully!");
      setFormData({
        carName: "",
        dailyRentPrice: "",
        carType: "",
        image: "",
        seatCapacity: "",
        pickupLocation: "",
        description: "",
        availability: "true",
      });
    }
    setLoading(false);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-0 outline-none transition-colors";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Add New Car
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Fill in the details below to list a new car on DriveFleet.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700 font-medium">
            {success}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Car Name */}
            <div>
              <label className={labelClass}>Car Name *</label>
              <input
                type="text"
                name="carName"
                value={formData.carName}
                onChange={handleChange}
                placeholder="e.g. Toyota Camry 2024"
                className={inputClass}
                required
              />
            </div>

            {/* Car Type */}
            <div>
              <label className={labelClass}>Car Type *</label>
              <select
                name="carType"
                value={formData.carType}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="" disabled>
                  Select car type
                </option>
                {carTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Daily Rent Price */}
            <div>
              <label className={labelClass}>Daily Rent Price ($) *</label>
              <input
                type="number"
                name="dailyRentPrice"
                value={formData.dailyRentPrice}
                onChange={handleChange}
                placeholder="e.g. 85"
                className={inputClass}
                min="1"
                required
              />
            </div>

            {/* Seat Capacity */}
            <div>
              <label className={labelClass}>Seat Capacity *</label>
              <input
                type="number"
                name="seatCapacity"
                value={formData.seatCapacity}
                onChange={handleChange}
                placeholder="e.g. 5"
                className={inputClass}
                min="1"
                required
              />
            </div>

            {/* Pickup Location */}
            <div className="md:col-span-2">
              <label className={labelClass}>Pickup Location *</label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                placeholder="e.g. San Francisco, CA"
                className={inputClass}
                required
              />
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className={labelClass}>Image URL *</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/car-image.jpg"
                className={inputClass}
                required
              />
              {formData.image && (
                <div className="mt-3 relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className={labelClass}>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe the car features, condition, and rental terms..."
                className={`${inputClass} resize-none`}
                required
              />
            </div>

            {/* Availability */}
            <div className="md:col-span-2">
              <label className={labelClass}>Availability Status *</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="availability"
                    value="true"
                    checked={formData.availability === "true"}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 accent-blue-600"
                  />
                  <span className="text-sm text-gray-700">Available</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="availability"
                    value="false"
                    checked={formData.availability === "false"}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 accent-blue-600"
                  />
                  <span className="text-sm text-gray-700">Unavailable</span>
                </label>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Adding Car...
              </span>
            ) : (
              "Add Car"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCarPage;
