"use client";

import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";

// ─── Social Icons ───────────────────────────────────────
const XIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 1.092.078 1.537.156v3.313h-.964c-1.59 0-2.196 1.022-2.196 2.63v2.459h3.008l-.513 3.667h-2.495v8.15C20.07 23.124 24 18.837 24 13.68 24 6.067 18.627.694 12.014.694S.028 6.067.028 13.68c0 5.157 3.926 9.443 8.973 10.011z" />
  </svg>
);

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const YoutubeIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

// ─── Data ───────────────────────────────────────────────
const socials = [
  { Icon: XIcon, href: "#", label: "X", hover: "hover:bg-gray-800" },
  {
    Icon: FacebookIcon,
    href: "#",
    label: "Facebook",
    hover: "hover:bg-blue-600",
  },
  {
    Icon: InstagramIcon,
    href: "#",
    label: "Instagram",
    hover: "hover:bg-pink-600",
  },
  {
    Icon: LinkedinIcon,
    href: "#",
    label: "LinkedIn",
    hover: "hover:bg-blue-700",
  },
  { Icon: YoutubeIcon, href: "#", label: "YouTube", hover: "hover:bg-red-600" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Cars", href: "/explore-cars" },
  { name: "Add Car", href: "/add-car" },
  { name: "My Bookings", href: "/my-bookings" },
  { name: "Login", href: "/login" },
  { name: "Register", href: "/register" },
];

const vehicleTypes = [
  "SUV",
  "Sedan",
  "Hatchback",
  "Luxury",
  "Electric",
  "Convertible",
];

// ─── Reusable Link Item ─────────────────────────────────
const LinkItem = ({ href, children }) => (
  <li>
    <a
      href={href}
      className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
    >
      <ChevronRight
        size={14}
        className="text-gray-600 group-hover:text-blue-400 transition-colors duration-200"
      />
      {children}
    </a>
  </li>
);

// ─── Section Heading ────────────────────────────────────
const SectionTitle = ({ children }) => (
  <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
    {children}
  </h3>
);

// ─── Footer ─────────────────────────────────────────────
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Wave Top */}
      <div className="w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-12 sm:h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.13,321.39,56.44Z"
            fill="currentColor"
            className="text-gray-950"
          />
        </svg>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="/" className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 17h2m10 0h2M2 9l2-4h16l2 4M2 9h20M2 9v6a2 2 0 002 2h16a2 2 0 002-2V9" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                <span className="text-white">Drive</span>
                <span className="text-blue-400">Fleet</span>
              </span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Discover the perfect ride for every journey. DriveFleet connects
              you with premium vehicles at unbeatable prices.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2.5">
              {socials.map(({ Icon, href, label, hover }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 ${hover} hover:text-white hover:border-transparent transition-all duration-300`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <SectionTitle>Quick Links</SectionTitle>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <LinkItem key={link.name} href={link.href}>
                  {link.name}
                </LinkItem>
              ))}
            </ul>
          </div>

          {/* Vehicle Types */}
          <div>
            <SectionTitle>Vehicle Types</SectionTitle>
            <ul className="space-y-3">
              {vehicleTypes.map((type) => (
                <LinkItem key={type} href="/explore-cars">
                  {type}
                </LinkItem>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <SectionTitle>Contact Us</SectionTitle>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg bg-white/5 border border-white/10">
                  <Mail size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Email</p>
                  <a
                    href="mailto:hello@drivefleet.com"
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    hello@drivefleet.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg bg-white/5 border border-white/10">
                  <Phone size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                  <a
                    href="tel:+1234567890"
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg bg-white/5 border border-white/10">
                  <MapPin size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Address</p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    123 Fleet Avenue, Suite 400, San Francisco, CA 94102
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            &copy; {year} DriveFleet. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
