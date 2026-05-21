import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import BookingCard from "@/components/BookingCard";

const CarDetailsPage = async ({ params }) => {
  const { id } = await params;
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  // Fetch car — server-side
  let car = null;
  try {
    const res = await fetch(`http://localhost:5000/explore-cars/${id}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    car = await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
  }

  // Get user session — server-side
  let user = null;
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    user = session?.user || null;
  } catch (err) {
    user = null;
  }

  export async function generateMetadata({ params }) {
    return {
      title: "Car Details | DriveFleet",
    };
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

          {/* Right — Booking Card */}
          <div className="lg:col-span-2">
            <BookingCard car={car} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
