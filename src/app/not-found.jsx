import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Number */}
        <h1 className="text-[10rem] sm:text-[12rem] font-extrabold leading-none bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent select-none">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm leading-relaxed">
          The page you are looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <Link
            href="/"
            className="px-6 py-3 text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Back to Home
          </Link>
          <Link
            href="/explore-cars"
            className="px-6 py-3 text-sm font-semibold text-gray-600 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
          >
            Explore Cars
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
