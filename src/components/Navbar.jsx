"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Cars", href: "/explore-cars" },
    { name: "Add Car", href: "/add-car" },
    { name: "My Bookings", href: "/my-bookings" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      {/* Desktop & Tablet */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 select-none">
            <div className="w-9 h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
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
            <span className="text-xl lg:text-[1.35rem] font-extrabold tracking-tight">
              <span className="text-gray-900">Drive</span>
              <span className="text-blue-600">Fleet</span>
            </span>
          </Link>

          {/* Center Nav Links - hidden below lg */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg text-[0.9rem] font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-blue-700"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-5 h-[3px] bg-blue-600 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side - Login & Register */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2.5 text-[0.9rem] font-semibold text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 text-[0.9rem] font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 hover:scale-[1.02] transition-all duration-200"
            >
              Register
            </Link>
          </div>

          {/* Hamburger - visible below lg */}
          <button
            onClick={toggleMenu}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle navigation menu"
          >
            <div className="flex flex-col items-center justify-center gap-[5px]">
              <span
                className={`block w-5 h-[2.5px] rounded-full bg-gray-700 transition-all duration-300 ${
                  mobileMenuOpen
                    ? "rotate-45 translate-y-[7px]"
                    : "rotate-0 translate-y-0"
                }`}
              />
              <span
                className={`block w-5 h-[2.5px] rounded-full bg-gray-700 transition-all duration-300 ${
                  mobileMenuOpen
                    ? "-rotate-45 -translate-y-[7px]"
                    : "rotate-0 translate-y-0"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={closeMenu}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 w-[300px] max-w-[85vw] h-full bg-white shadow-2xl transition-transform duration-300 ease-out overflow-y-auto ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 h-16 lg:h-[72px] border-b border-gray-100">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-2 select-none"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
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
              <span className="text-lg font-extrabold tracking-tight">
                <span className="text-gray-900">Drive</span>
                <span className="text-blue-600">Fleet</span>
              </span>
            </Link>
            <button
              onClick={closeMenu}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Drawer Nav Links */}
          <div className="px-3 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[0.95rem] font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {link.name === "Home" && (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"
                    />
                  </svg>
                )}
                {link.name === "Explore Cars" && (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                )}
                {link.name === "Add Car" && (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                )}
                {link.name === "My Bookings" && (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                )}
                {link.name}
              </Link>
            ))}
          </div>

          {/* Drawer Divider */}
          <div className="mx-5 border-t border-gray-100" />

          {/* Drawer Auth Buttons */}
          <div className="px-5 py-5 space-y-3">
            <Link
              href="/login"
              onClick={closeMenu}
              className="block w-full text-center px-5 py-3 text-[0.95rem] font-semibold text-gray-700 rounded-xl border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={closeMenu}
              className="block w-full text-center px-5 py-3 text-[0.95rem] font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transition-all duration-200"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
