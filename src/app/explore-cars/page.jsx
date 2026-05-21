"use client";

import { useState, useEffect } from "react";
import CarsCard from "@/components/CarsCard";
import { Search } from "lucide-react";
import { Spinner } from "@heroui/react";

const carTypes = [
  "Sedan",
  "SUV",
  "Luxury",
  "Electric",
  "Hatchback",
  "Convertible",
];

const ExploreCarsPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  // ✅ Fetch cars from backend with search & filter query params
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (typeFilter !== "All") params.set("type", typeFilter);

    fetch(`http://localhost:5000/explore-cars?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search, typeFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Explore Our <span className="text-blue-400">Fleet</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            Browse through our collection of premium vehicles and find the
            perfect ride for your next adventure.
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by car name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full sm:w-48 px-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-gray-700 font-medium transition-all duration-200 cursor-pointer"
          >
            <option value="All">All Types</option>
            {carTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-6">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-900">{cars.length}</span> car
          {cars.length !== 1 ? "s" : ""}
          {typeFilter !== "All" && (
            <span>
              {" "}
              in{" "}
              <span className="font-semibold text-blue-600">{typeFilter}</span>
            </span>
          )}
          {search && (
            <span>
              {" "}
              matching{" "}
              <span className="font-semibold text-blue-600">
                &quot;{search}&quot;
              </span>
            </span>
          )}
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner size="lg" label="Loading cars..." />
          </div>
        ) : cars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <CarsCard key={car._id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gray-100 flex items-center justify-center">
              <Search size={32} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No cars found
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              Try adjusting your search or filter.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setTypeFilter("All");
              }}
              className="px-5 py-2.5 text-sm font-semibold text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreCarsPage;
