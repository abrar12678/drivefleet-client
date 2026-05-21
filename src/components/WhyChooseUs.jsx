const features = [
  {
    title: "Verified Listings",
    description:
      "Every vehicle on DriveFleet goes through a thorough inspection process. We verify car conditions, documents, and owner credentials so you can book with confidence.",
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
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    color: "emerald",
  },
  {
    title: "Affordable Pricing",
    description:
      "Get the best daily rental rates in the market. No hidden fees, no surprise charges. The price you see is the price you pay — transparent and competitive.",
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
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    color: "blue",
  },
  {
    title: "Wide Selection",
    description:
      "From compact hatchbacks to luxury sedans, SUVs to electric vehicles — our fleet covers every need. Filter by type, capacity, price, and location.",
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
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
    color: "purple",
  },
  {
    title: "Easy Booking",
    description:
      "Book your ride in under 30 seconds. Our streamlined process lets you choose dates, add extras, and confirm instantly — all from your browser.",
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
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    color: "amber",
  },
  {
    title: "Secure Authentication",
    description:
      "Your account and bookings are protected with industry-standard JWT authentication. Sign in with Google or email — your data stays safe.",
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
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    color: "red",
  },
  {
    title: "24/7 Support",
    description:
      "Need help? Our support team is available around the clock. Whether it's a booking issue, car problem, or general question — we've got your back.",
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
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    color: "teal",
  },
];

const colorMap = {
  emerald: {
    bg: "bg-emerald-100",
    text: "text-emerald-600",
    shadow: "shadow-emerald-100",
    glow: "group-hover:shadow-emerald-500/20",
    border: "hover:border-emerald-400/30",
    iconHover: "group-hover:bg-emerald-500",
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    shadow: "shadow-blue-100",
    glow: "group-hover:shadow-blue-500/20",
    border: "hover:border-blue-400/30",
    iconHover: "group-hover:bg-blue-500",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    shadow: "shadow-purple-100",
    glow: "group-hover:shadow-purple-500/20",
    border: "hover:border-purple-400/30",
    iconHover: "group-hover:bg-purple-500",
  },
  amber: {
    bg: "bg-amber-100",
    text: "text-amber-600",
    shadow: "shadow-amber-100",
    glow: "group-hover:shadow-amber-500/20",
    border: "hover:border-amber-400/30",
    iconHover: "group-hover:bg-amber-500",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-600",
    shadow: "shadow-red-100",
    glow: "group-hover:shadow-red-500/20",
    border: "hover:border-red-400/30",
    iconHover: "group-hover:bg-red-500",
  },
  teal: {
    bg: "bg-teal-100",
    text: "text-teal-600",
    shadow: "shadow-teal-100",
    glow: "group-hover:shadow-teal-500/20",
    border: "hover:border-teal-400/30",
    iconHover: "group-hover:bg-teal-500",
  },
};

const WhyChooseUs = () => {
  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-[120px] animate-float" />
      <div
        className="absolute bottom-0 right-1/4 w-60 h-60 bg-indigo-500/5 rounded-full blur-[100px] animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div className="text-center mb-14 animate-fade-up">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-blue-300 text-xs font-semibold rounded-full uppercase tracking-wide mb-4 hover:scale-105 hover:bg-white/15 transition-all duration-300 cursor-default">
            Why DriveFleet
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Why Choose <span className="text-blue-400">Us</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            We&apos;re not just another car rental platform. Here&apos;s what
            makes DriveFleet the smartest choice for your next ride.
          </p>
        </div>

        {/* ── Features Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const colors = colorMap[feature.color];
            return (
              <div
                key={feature.title}
                className={`animate-fade-up bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 group hover:bg-white/10 ${colors.border} hover:-translate-y-2 hover:shadow-xl ${colors.glow} transition-all duration-300 cursor-default`}
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${colors.bg} ${colors.text} mb-4 shadow-lg ${colors.shadow} group-hover:scale-110 group-hover:rotate-3 ${colors.iconHover} group-hover:text-white transition-all duration-300`}
                >
                  {feature.icon}
                </div>

                {/* Text */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-100 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div className="mt-4 h-0.5 w-0 group-hover:w-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
