const steps = [
  {
    step: "01",
    title: "Browse & Choose",
    description:
      "Explore our extensive fleet of premium vehicles. Filter by car type, price, or location to find your perfect match. Each listing includes detailed specs and high-quality images.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Book Instantly",
    description:
      "Found the right car? Book it in seconds. Select your preferred date, add a driver if needed, and leave a special note. Secure authentication keeps your booking safe.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Pick Up & Drive",
    description:
      "Head to the pickup location at your booked time. Complete a quick verification, grab the keys, and hit the road. It's that simple — no paperwork hassle.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7"
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
    ),
  },
  {
    step: "04",
    title: "Return & Rate",
    description:
      "Drop off the car at the designated location when your rental ends. Share your experience with a rating to help future renters make better choices.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 sm:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 animate-fade-up">
          <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full uppercase tracking-wide mb-4 hover:scale-105 hover:bg-indigo-200 transition-all duration-300 cursor-default">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            How It <span className="text-indigo-600">Works</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Renting a car with DriveFleet is quick and hassle-free. Just follow
            these four simple steps and you&apos;ll be on the road in no time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative text-center group animate-fade-up"
              style={{ animationDelay: `${index * 150 + 200}ms` }}
            >
              {index < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-10 left-[60%] h-0.5 bg-gradient-to-r from-blue-300 to-indigo-200 animate-line-grow"
                  style={{ animationDelay: `${index * 150 + 600}ms` }}
                />
              )}

              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white mb-5 shadow-lg shadow-blue-200 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-blue-300/50 group-hover:-translate-y-2 transition-all duration-300">
                <span className="transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </span>
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-white text-blue-600 text-xs font-bold rounded-full shadow-md border-2 border-blue-100 flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                  {item.step}
                </span>
                {/* Glow ring on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-30 blur-xl scale-150 transition-opacity duration-500 -z-10" />
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto group-hover:text-gray-600 transition-colors duration-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
